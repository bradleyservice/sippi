import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getShows, deleteShow} from '../../redux/reducer';
import Nav from '../Nav/Nav';
import Email from '../Email/Email';

const Dashboard = (props) => {

    const [search, setSearch] = useState({
        title: '',
        img: '',
        content:''
    })
    const [shows, setShows] = useState([])

    const {title, img, content} = search;
    const {getShows} = props;
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get('/api/shows')
                if(res.data[0].profile_pic && res.data[0].username){
                    setShows(res.data)
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
    
    const deleteShow = async (id) => {
        try {
            axios.delete(`/api/shows/${id}`)
            props.deleteShow(id)
            let res = await axios.get('/api/shows')
            setShows(res.data)
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
            {shows.map((show, index) => {
                return <ul key={`${show.id}-${index}`} style={{listStyle: 'none',
                border: '3px solid black',
                width: '75vw',
                margin: '0 auto',
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center', alignContent: 'center'}} >
                    <li><h5>{show.username}</h5></li>
                    <li><img src={show.profile_pic} style={{width: '100px', height: '100px', borderRadius: '50%'}} alt='profile' /></li>
                    <li><h4>{show.title}</h4></li>
                    <li><img src={show.img} style={{width: "200px"}} alt='show' /></li>
                    <li>{show.content}</li>
                    {props.user.id === show.band_id ?
                                <button onClick={() => {
                                    deleteShow(show.id)
                                }}>Delete This Show</button>
                                : null}
                </ul>
            })}
            <Email />
        </div>
    )
}

const mapStateToProps = state => ({showPosts: state.showPosts, user: state.user, ...state})

export default connect(mapStateToProps, {getShows, deleteShow})(Dashboard)