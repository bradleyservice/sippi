import {useState} from 'react'
import { addForum, getForums} from '../../redux/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const ForumPost = (props) => {

    const [forum, setForum] = useState({
        title: '',
        img: '',
        content: ''
    })

    const history = useHistory();
    const {title, img, content} = forum;
    const {getForums} = props;

    const addForumPost = () => {
        const {id} = props.user;
        try {
            axios.post('/api/forums', {title, img, content, id})
        } catch(err){
            console.log('err on addforumpost forumpost', err)
        }
    }

    const handleChange = (e) => {
        setForum({...forum, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addForum(forum);
        addForumPost(forum);
        getForums();
        history.push('/forum');
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)} style={{marginTop: '15px'}}>
                <input style={{margin: '7px'}} name='title' placeholder='Post Title' value={title} onChange={e => handleChange(e)}/>
                <input name='img' placeholder='Image URL' value={img} onChange={e => handleChange(e)}/>
                <input style={{margin: '7px'}} name='content' placeholder='Content' value={content} onChange={e => handleChange(e)}/>
                <button type='submit' >submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {getForums})(ForumPost)