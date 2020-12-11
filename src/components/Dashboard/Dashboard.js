import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getShows, deleteShow} from '../../redux/reducer';
import Nav from '../Nav/Nav';
import Email from '../Email/Email';
import './Dashboard.scss';

const Dashboard = (props) => {

    const [search, setSearch] = useState({
        title: '',
        img: '',
        content:''
    })
    const [shows, setShows] = useState([])
    const [searchResult, setSearchResult] = useState(false);

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
            setSearchResult(true)
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
            {searchResult ?
            <div style={{border: '2px solid black', width: '75vw', margin: '0 auto'}}>
                {title} <br/>
                {img === '' ?
                null
                : <img src={img} alt='show' style={{width: '100px'}} /> } 
                <p>{content}</p>
            </div>
            : null}
            {shows.map((show, index) => {
                return <ul className='shows' key={`${show.id}-${index}`} style={{listStyle: 'none',
                border: '3px solid black',
                width: '75vw',
                margin: '0 auto',
                marginTop: '15px',
                marginBottom: '15px',
                display: 'flex', justifyContent: 'space-between', backgroundColor: '#e2e2e2'}} >
                    <div>
                        <img src={show.profile_pic} className='profile-pic' style={{width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px'}} alt='profile' />
                        <h5 className='username'>{show.username}</h5>
                    </div>
                    <div style={{width: '40vw'}}>
                        <h4 className='show-title'>{show.title}</h4><br/>
                        <p className='content'>{show.content}</p>
                        <div>
                            {props.user.id === show.band_id ?
                                <button style={{marginTop: '40px'}} onClick={() => {
                                    deleteShow(show.id)
                                }}>Delete This Show</button>
                                : null}
                        </div>
                    </div>
                    <div className='dropdown-img'>
                        <img src={show.img} style={{width: "15vw"}} className='show-poster' alt='show' />
                        <div className='dropdown-img-content'>
                            <img src={show.img} style={{width: '30vw'}} alt='show' />
                        </div>
                    </div>
                    
                </ul>
            })}
            <Email />
        </div>
    )
}

const mapStateToProps = state => ({showPosts: state.showPosts, user: state.user, ...state})

export default connect(mapStateToProps, {getShows, deleteShow})(Dashboard)