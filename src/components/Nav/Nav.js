import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {logoutUser, getUser} from '../../redux/reducer';
import {withRouter, useHistory} from 'react-router-dom';


const Nav = (props) => {

    const [search, setSearch] = useState('')

    const history = useHistory();

    const {getUser} = props;
    useEffect(() => {
            getUser();
    }, [getUser])
    


    const logout = () => {
        axios.post('/api/logout');
        props.logoutUser();
        history.push('/');
    }

    return (
        <header>
            <form onSubmit={e => {
                e.preventDefault();
                props.searchShow(search)}
            }>
                <ul style={{listStyle: 'none'}}>
                    <li><h1>sippi</h1></li>
                    <li><input placeholder='search...' value={search} 
                    name='search' onChange={(e) => setSearch(e.target.value)} /></li>
                    <button>search for a show</button>
                </ul>
            </form>
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

const mapStateToProps = state => ({showPosts: state.showPosts, ...state});

export default connect(mapStateToProps, {logoutUser, getUser})(withRouter(Nav))