import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {logoutUser, getUser} from '../../redux/reducer';
import {withRouter, useHistory} from 'react-router-dom';
import Fuse from 'fuse.js';

const Nav = (props) => {

    const [search, setSearch] = useState('')

    const history = useHistory();

    const {getUser} = props;
    useEffect(() => {
            getUser();
    }, [])
    
    const fuse = new Fuse(props.showPosts, {
        keys: [
            'title',
            'img',
            'content'
        ],
        includeScore: true
    });

    // const result = fuse.search(search)
    // const showResults = result.map(show => show.item)
    // console.log(result[0].item)

    const logout = () => {
        axios.post('/api/logout');
        props.logoutUser();
        history.push('/');
    }
    return (
        <header>
            <ul style={{listStyle: 'none'}}>
                <li><h1>sippi</h1></li>
                <li><input placeholder='search...' value={search} 
                name='search' onChange={(e) => setSearch(e.target.value)} /></li>
            </ul>
            <ul style={{listStyle: 'none'}}>
                <li><Link to='/dashboard'>home</Link></li>
                <li><Link to='/profile'>profile</Link></li>
                <li><Link to='/forum'>forum</Link></li>
                <li><Link to='/addshow'>add a show</Link></li>
            </ul>
            {props.isLoggedIn ?
            <button onClick={logout}>logout</button>
            : null}
            {/* <div>
                {showResults.map(shows => {
                    const {title, img, content} = shows
                    return <ul key={title} style={{listStyle: 'none'}}>
                        <li>{title}</li>
                        <li><img src={img} alt='show poster'style={{width: '200px'}}/></li>
                        <li>{content}</li>
                    </ul>
                })}
            </div> */}
        </header>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUser})(withRouter(Nav))