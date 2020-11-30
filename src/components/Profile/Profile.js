import {useState} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import axios from 'axios';

const Profile = (props) => {

    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState('')

    const editUser = async (img) => {
        try {
            const res = await axios.put('/api/bands', {img})
            props.updateUser(res.data)
        } catch(err){
            console.log('err on editUser func, front end', err)
        }
    }

    return (
        <div>
            <header><Nav /></header>
            <div>
                {props.user.profile_pic === null ? 
                <i class="far fa-image fa-10x"></i>
                : <img src={props.user.profile_pic} style={{width: '150px', height: '150px', borderRadius: '50%'}} alt='profile' />}
                {edit ?
                    <input
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                : null}
                {edit ? <div>
                    <button onClick={() => {
                        setInput('')
                        setEdit(!edit)
                    }}>Cancel</button>
                    <button onClick={() => {
                        editUser(input)
                        setEdit(!edit)
                    }}>Save</button>
                </div>
                : 
                <button onClick={() => {
                    setEdit(!edit)
                }}>Edit Profile Picture</button>}
            </div>
            <span>
                hello, {props.user.username}
            </span>
        </div>
    )
}
//should display all the users information that is stored on the database - the user should be able to edit their bandname, band description and profile image.
//remember username and bandname are different and stored on different db's

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps)(Profile)