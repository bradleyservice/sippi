import {connect} from 'react-redux';
import {getForums} from '../../redux/reducer';
import {useState, useEffect} from 'react';
import Nav from '../Nav/Nav';
import ForumPost from '../ForumPost/ForumPost';
import axios from 'axios';


const Forum = (props) => {

    const [post, setPost] = useState({
        title: props.forumPosts.title,
        img: props.forumPosts.img,
        content: props.forumPosts.content
    })
    
    const [edit, setEdit] = useState(false);

    const {getForums} = props;
    const {title, img, content} = post;

    useEffect(() => {
        getForums();
    }, [getForums])

    const inputArr = [
        {name: 'title', value: title},
        {name: 'img', value: img},
        {name: 'content', value: content}
    ]

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const editPost = () => {
        try {
            axios.put(`/api/forums/${props.forumPosts[0].id}`, {title, img, content})
        } catch(err){
            console.log('err on editpost func, forum', err)
        }
        getForums();
    }

    const mappedForums = props.forumPosts.map((elem, index) => {
        return <form><ul key={`${elem.id}-${index}`} style={{listStyle: 'none'}}>
            <li><h4>{elem.title}</h4></li>
            <li><img src={elem.img} alt='forum post' style={{width: '200px'}}/></li>
            <li><p>{elem.content}</p></li>
            {edit ?
            <div>{inputArr.map(input => (
                    <input key={`${input.name}-${input.value}`} name={input.name} value={input.value} onChange={e => handleChange(e)} />
                ))}
                <button onClick={() => {
                    setPost(post)
                    setEdit(!edit)
                }}>Cancel</button>
                <button onClick={() => {
                    editPost(elem.id, post)
                    setEdit(!edit)
                }}>Save</button>
                </div>
            : props.user.id === elem.band_id ?
            <div>
                <button onClick={() => {
                    setEdit(!edit)
                }}>edit post</button>
                <button>delete post</button>
            </div>
            : null}
        </ul>
        </form>
    })

    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <ForumPost />
            </div>
            <div>
                {mappedForums}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({forumPosts: state.forumPosts, user: state.user, ...state})

export default connect(mapStateToProps, {getForums})(Forum)