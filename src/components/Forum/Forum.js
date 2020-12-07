import {connect} from 'react-redux';
import {getForums, deletePost} from '../../redux/reducer';
import {useState, useEffect} from 'react';
import Nav from '../Nav/Nav';
import ForumPost from '../ForumPost/ForumPost';
import axios from 'axios';
import Email from '../Email/Email';


const Forum = (props) => {

    const [post, setPost] = useState({
        title: props.forumPosts.title,
        img: props.forumPosts.img,
        content: props.forumPosts.content
    })

    const [newPost, setNewPost] = useState({
        newTitle: '',
        newImg: '',
        newContent: ''
    })

    const [forum, setForum] = useState([])
    
    const [edit, setEdit] = useState(false);

    const {getForums} = props;
    const {title, img, content} = post;
    const {newTitle, newImg, newContent} = newPost;
    
    useEffect(() => {
        const getForumPosts = async () => {
            try {
                let res = await axios.get('/api/forums')
                if(res.data[0].profile_pic && res.data[0].username){
                    setForum(res.data)
                }
            } catch(err){
                console.log('err on getforumposts', err)
            }
        }
        getForumPosts();
        getForums();
    }, [getForums])

    const getPosts = async () => {
        try {
            const res = await axios.get('/api/forums')
            setForum(res.data)
        } catch(err){
            console.log('err in getposts in forum', err)
        }
    }
    const editPost = (postid) => {
        const {id} = props.user;
        try {
            axios.put(`/api/forums/${postid}`, {newTitle, newImg, newContent, id})
        } catch(err){
            console.log('err on editpost func, forum', err)
        }
        getPosts();
        getForums();
    }
    
    const searchForum = async (search) => {
        try {
            let res = await axios.get(`/api/forum/?search=${search}`)
            setNewPost(newPost => ({
                ...newPost,
                newTitle: res.data[0].title,
                newImg: res.data[0].img,
                newContent: res.data[0].content
            }))
        } catch(err){
            console.log('err on searchforum func frontside', err)
        }
    }

    const deletePost = (id) => {
        try {
            axios.delete(`/api/forums/${id}`)
            props.deletePost(id)
        } catch(err){
            console.log('err on deletepost func in forum', err)
        }
        getPosts();
        getForums();
    }
    
    const inputArr = [
        {name: 'newTitle', placeholder: 'Post Title', value: title, ...newTitle},
        {name: 'newImg', placeholder: 'Image URL', value: img, ...newImg},
        {name: 'newContent', placeholder: 'Content', value: content, ...newContent}
    ]

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value})
    }
    const inputs = inputArr.map((input, index) => {
        return <input key={`${input.name}-${input.value}-${index}`} name={input.name} placeholder={input.placeholder} value={input.value} onChange={e => handleChange(e)} />
    })
    const mappedForum = forum.map((elem, index) => {
        return <ul key={`${elem.id}-${index}`} style={{listStyle: 'none'}}>
            <li><h5>{elem.username}</h5></li>
            <li><img src={elem.profile_pic} alt='profile' style={{width: '100px', height: '100px', borderRadius: '50%'}}/></li>
            <li><h4>{elem.title}</h4></li>
            <li><img src={elem.img} alt='forum post' style={{width: '200px'}}/></li>
            <li><p>{elem.content}</p></li>
            {edit && props.user.id === elem.band_id ?
            <form><div>
                {inputs}
                <button onClick={() => {
                    setPost(post)
                    setEdit(!edit)
                }}>Cancel</button>
                <button onClick={() => {
                    editPost(elem.id)
                    setEdit(!edit)
                }}>Save</button>
                </div></form>
            : props.user.id === elem.band_id ?
            <div>
                <button onClick={() => {
                    setEdit(!edit)
                }}>edit post</button>
                <button onClick={() => {
                    deletePost(elem.id)
                }}>delete post</button>
            </div>
            : null}
        </ul>
    })

    return (
        <div>
            <div>
                <Nav searchForum={searchForum} />
            </div>
            <div style={{border: '2px solid black', width: '75vw', margin: '0 auto'}}>
                {newTitle} <br/>
                {newImg === '' ?
                null: <img src={newImg} alt='forum' style={{width: '100px'}} />} <p>{newContent}</p>
            </div>
            <div>
                <ForumPost />
            </div>
            <div>
            {mappedForum}
            </div>
            <Email />
        </div>
    )
}

const mapStateToProps = state => ({forumPosts: state.forumPosts, user: state.user, ...state})

export default connect(mapStateToProps, {getForums, deletePost})(Forum)