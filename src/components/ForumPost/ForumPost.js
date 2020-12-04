import {useState} from 'react'
import { addForum } from '../../redux/reducer';
import {connect} from 'react-redux';
import axios from 'axios';

const ForumPost = (props) => {

    const [forum, setForum] = useState({
        title: '',
        img: '',
        content: ''
    })


    const {title, img, content} = forum;
    

    const addForumPost = () => {
        const {id} = props.user;
        try {
            axios.post('/api/forums', {title, img, content, id})
        } catch(err){
            console.log('err on addforumpost forumpost', err)
        }
    }

    const inputsArr = [
        {name: 'title', placeholder: 'Post Title', value: title},
        {name: 'img', placeholder: 'Image URL', value: img},
        {name: 'content', placeholder: 'Content', value: content}
    ]

    const handleChange = (e) => {
        setForum({...forum, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addForum(forum);
        addForumPost(forum);
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                {inputsArr.map(input => (
                    <input key={input.name} name={input.name} placeholder={input.placeholder} value={input.value} onChange={e => handleChange(e)} />
                ))}
                <button type='submit' >submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps)(ForumPost)