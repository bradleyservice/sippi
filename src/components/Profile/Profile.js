import {useState} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import axios from 'axios';
import BandInfo from '../BandInfo/BandInfo';
import {updateUser} from '../../redux/reducer';
import Email from '../Email/Email';

const Profile = (props) => {

    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState('')

    const editUser = (img) => {
        try {
            axios.put('/api/bands', {img})
        } catch(err){
            console.log('err on editUser func, front end', err)
        }
    }

    return (
        <div>
            <header><Nav /></header>
            <div>
                {props.user.profile_pic === null ? 
                <i className="far fa-image fa-10x"></i>
                : <img src={props.user.profile_pic} style={{width: '200px', height: '200px', borderRadius: '50%'}} alt='profile' />}
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
            <div>
                <span>
                    hello, {props.user.username}
                </span>
            </div>
            <BandInfo />
            <Email />
        </div>
    )
}
//should display all the users information that is stored on the database - the user should be able to edit their bandname, band description and profile image.
//remember username and bandname are different and stored on different db's

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {updateUser})(Profile)