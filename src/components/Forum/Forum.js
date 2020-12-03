import {connect} from 'react-redux';
import {getForums} from '../../redux/reducer';
import {useEffect} from 'react';
import Nav from '../Nav/Nav';
import ForumPost from '../ForumPost/ForumPost';

const Forum = (props) => {



    const {getForums} = props;
    useEffect(() => {
        getForums();
    }, [getForums])

    const mappedForums = props.forumPosts.map((elem, index) => {
        return <ul key={`${elem.id}-${index}`} style={{listStyle: 'none'}}>
            <li><h4>{elem.title}</h4></li>
            <li><p>{elem.content}</p></li>
        </ul>
    })

    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>{mappedForums}</div>
            <ForumPost />
        </div>
    )
}

const mapStateToProps = state => ({ForumPosts: state.ForumPosts, ...state})

export default connect(mapStateToProps, {getForums})(Forum)