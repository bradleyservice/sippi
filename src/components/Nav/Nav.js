import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {logoutUser, getUser} from '../../redux/reducer';
import {withRouter, useHistory} from 'react-router-dom';
import './Nav.scss';


const Nav = (props) => {

    const [search, setSearch] = useState('');
    const [menu, setMenu] = useState(false);

    const history = useHistory();

    const {getUser} = props;
    useEffect(() => {
            getUser();
    }, [getUser])
    
    const searchBar = () => {
        if(props.location.pathname === "/forum"){
            props.searchForum(search)
        } else if(props.location.pathname === "/dashboard"){
            props.searchShow(search)
        } else {
            history.push('/dashboard')
        }
    }

    const logout = () => {
        axios.post('/api/logout');
        props.logoutUser();
        history.push('/');
    }

    return (
        <header className='nav-bar'>
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    searchBar();
                    setSearch('')
                }}>
                    <div className='logo-and-search' style={{listStyle: 'none'}}>
                        <div className='logo'><h1>sippi</h1></div>
                        <div className='input-search'><input className='search-bar' placeholder='search...' value={search} 
                        name='search' onChange={(e) => setSearch(e.target.value)} />
                        <button className='nav-button'>search</button></div>
                    </div>
                </form>
            </div>
            <div className='right-nav'>
                <div className='dropdown'>
                    <button className='dropbtn'>menu &nbsp;&nbsp; {<i onClick={() => setMenu(!menu)} className="fas fa-caret-down fa-2x"></i>}</button>
                    <ul className='nav-links' style={{listStyle: 'none'}}>
                        <li className='link'><Link to='/dashboard'>home</Link></li>
                        <li className='link'><Link to='/profile'>profile</Link></li>
                        <li className='link'><Link to='/forum'>forum</Link></li>
                        <li className='link'><Link to='/addshow'>add a show</Link></li>
                        {/* <i onClick={() => setMenu(!menu)} className="fas fa-caret-down fa-2x"></i> */}
                    </ul>
                </div>
                {/* // <i onClick={() => setMenu(!menu)} className="fas fa-caret-down fa-2x" style={{marginLeft: '317px', border: '2px solid #fca311', color: '#fca311'}}></i>} */}
                <div>
                    {props.isLoggedIn ?
                    <button className='logout-nav-button' onClick={logout}>logout</button>
                    : null}
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({showPosts: state.showPosts, ...state});

export default connect(mapStateToProps, {logoutUser, getUser})(withRouter(Nav))