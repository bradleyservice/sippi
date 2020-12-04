import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getShows, deleteShow} from '../../redux/reducer';
import Nav from '../Nav/Nav';
// import {Date} from 'prismic-reactjs';
// import Moment from 'moment';

const Dashboard = (props) => {

    const [profile, setProfile] = useState('')
    const [search, setSearch] = useState({
        title: '',
        img: '',
        content:''
    })

    const {title, img, content} = search;
    const {getShows} = props;
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get('/api/band/info')
                if(res.data[0].profile_pic){
                    setProfile(res.data[0].profile_pic)
                }
            } catch(err){
                console.log('err in getinfo on dashboard for profpic', err)
            }
        }
        getInfo();
        getShows();
    }, [getShows])

    const searchShow = async (search) => {
        try {
            let res = await axios.get(`/api/show/?search=${search}`)
            setSearch(search => ({
                ...search,
                title: res.data[0].title,
                img: res.data[0].img,
                content: res.data[0].content
            }))
        } catch(err){
            console.log('err on searchshow nav comp', err)
        }
    }

    // const date = Date(document.data.date);
    // const formattedDate = Moment(date).startOf('day').fromNow()
    
    const deleteShow = (id) => {
        try {
            axios.delete(`/api/shows/${id}`)
            props.deleteShow(id)
        } catch(err){
            console.log('err on deleteshow func front end, dashboard', err)
        }
        getShows();
    }

    return (
        <div>
            <header><Nav searchShow={searchShow}/></header>
            <div style={{border: '2px solid black', width: '75vw', margin: '0 auto'}}>
                {title} <br/>
                {img === '' ?
                null
                : <img src={img} alt='show' style={{width: '100px'}} /> } <p>{content}</p>
            </div>
            {props.showPosts.map((elem, index) => {
                return <ul key={`${elem.band_id}-${index}`}
                style={{
                listStyle: 'none',
                border: '3px solid black',
                width: '75vw',
                margin: '0 auto',
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center', alignContent: 'center'
                }}>
                    <div>
                        <span><img src={profile} alt='user profile' 
                        style={{width: '100px', height: '100px', borderRadius: '50%'}}/></span>
                        <div>
                                <span><p>Show Title: </p>{elem.title} </span>
                                <span><p>Image: </p><img src={elem.img} alt='show poster' style={{width: "200px"}}/> </span>
                                <span><p>Show Description: </p>{elem.content}</span>
                                {props.user.id === elem.band_id ?
                                <button onClick={() => {
                                    deleteShow(elem.id)
                                }}>Delete This Show</button>
                                : null}
                        </div>
                    </div>
                </ul>
            })}
        </div>
    )
}

const mapStateToProps = state => ({showPosts: state.showPosts, user: state.user, ...state})

export default connect(mapStateToProps, {getShows, deleteShow})(Dashboard)