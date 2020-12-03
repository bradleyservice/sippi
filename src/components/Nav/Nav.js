import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {logoutUser, getUser} from '../../redux/reducer';
import {withRouter, useHistory} from 'react-router-dom';


const Nav = (props) => {

    const [search, setSearch] = useState('')
    const [showTitle, setShowTitle] = useState('')
    const [showImg, setShowImg] = useState('')
    const [showContent, setShowContent] = useState('')

    const history = useHistory();

    const {getUser} = props;
    useEffect(() => {
            getUser();
    }, [getUser])
    

    const searchShow = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.get(`/api/show/?search=${search}`)
            setShowTitle(res.data[0].title)
            setShowImg(res.data[0].img)
            setShowContent(res.data[0].content)
            setSearch('')
        } catch(err){
            console.log('err on searchshow nav comp', err)
        }
    }

    const logout = () => {
        axios.post('/api/logout');
        props.logoutUser();
        history.push('/');
    }
    return (
        <header>
            <form onSubmit={e => searchShow(e)}>
                <ul style={{listStyle: 'none'}}>
                    <li><h1>sippi</h1></li>
                    <li><input placeholder='search...' value={search} 
                    name='search' onChange={(e) => setSearch(e.target.value)} /></li>
                    <button>search for a show</button>
                </ul>
            </form>
            <div style={{border: '2px solid black', width: '75vw', margin: '0 auto'}}>
                {showTitle} <br/>
                {showImg === '' ?
                <i className="far fa-image fa-3x"></i>
                : <img src={showImg} alt='show' style={{width: '100px'}} /> } <p>{showContent}</p>
            </div>
            <ul style={{listStyle: 'none'}}>
                <li><Link to='/dashboard'>home</Link></li>
                <li><Link to='/profile'>profile</Link></li>
                <li><Link to='/forum'>forum</Link></li>
                <li><Link to='/addshow'>add a show</Link></li>
            </ul>
            {props.isLoggedIn ?
            <button onClick={logout}>logout</button>
            : null}
        </header>
    )
}
// cant pull showPosts off of state AND state (which includes props.isLoggedIn) so my logout button doesn't show up
const mapStateToProps = state => ({showPosts: state.showPosts, ...state});

export default connect(mapStateToProps, {logoutUser, getUser})(withRouter(Nav))