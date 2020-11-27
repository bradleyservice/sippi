// import axios from 'axios';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {getShows} from '../../redux/reducer';
import Nav from '../Nav/Nav';

const Dashboard = (props) => {


    //try to get a request sent to redux state and return the list of show posts 
    const {getShows} = props;
    useEffect(() => {
        getShows()
    }, [])

    return (
        <div>
            <Nav />
            {props.showPosts.map((elem, index) => {
                return <ul key={`${elem.band_id}-${index}`} style={{listStyle: 'none', border: "3px, black"}}>
                    <li><h3>Show Title: </h3>{elem.title} </li>
                    <li><h3>Image: </h3>{elem.img} </li>
                    <li><h3>Show Description: </h3>{elem.content}</li>
                </ul>
            })}
        </div>
    )
}

const mapStateToProps = state => ({showPosts: state.showPosts})

export default connect(mapStateToProps, {getShows})(Dashboard)