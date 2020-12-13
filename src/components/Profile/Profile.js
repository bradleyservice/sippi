import {useState} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../redux/reducer';
import axios from 'axios';
import Nav from '../Nav/Nav';
import BandInfo from '../BandInfo/BandInfo';
import Email from '../Email/Email';
import './Profile.scss';

const Profile = (props) => {

    const [edit, setEdit] = useState(false)
    const [profilePicInput, setProfilePicInput] = useState(props.user.profile_pic)
    const [usernameInput, setUsernameInput] = useState(props.user.username)

    const editUser = (img, username) => {
        try {
            axios.put('/api/bands', {img, username})
        } catch(err){
            console.log('err on editUser func, front end', err)
        }
    }

    return (
        <div>
            <Nav />
            <div className='profile-comp'>
                <div className='profile-img'>
                {props.user.profile_pic === null ? 
                <i className="far fa-image fa-10x"></i>
                : <img src={props.user.profile_pic} className='user-photo' alt='profile' />}
                    <div className='user-info'>
                        welcome, {props.user.username}
                        {edit ?
                        <div>
                            <input style={{marginTop: '8px'}}
                            value={profilePicInput}
                            placeholder='profile picture url'
                            onChange={e => setProfilePicInput(e.target.value)} />
                            <input
                            value={usernameInput}
                            placeholder='new username'
                            onChange={e => setUsernameInput(e.target.value)} />
                        </div>
                        : null}
                        {edit ? <div>
                            <button style={{marginTop: '8px', marginRight: '5px'}} onClick={() => {
                                setProfilePicInput(props.user.profile_pic)
                                setUsernameInput(props.user.username)
                                setEdit(!edit)
                            }}>cancel</button>
                            <button style={{marginTop: '8px'}} onClick={() => {
                                editUser(profilePicInput, usernameInput)
                                setProfilePicInput(profilePicInput)
                                setUsernameInput(usernameInput)
                                setEdit(!edit)
                            }}>save</button>
                        </div>
                        : 
                        <button style={{marginTop: '6px'}}onClick={() => {
                            setEdit(!edit)
                        }}>edit username & picture</button>}
                    </div>
                </div>
                <div className='bar'></div>
                
                <BandInfo />
                
            </div>
            <Email />
        </div>
    )
}
//should display all the users information that is stored on the database - the user should be able to edit their bandname, band description and profile image.
//remember username and bandname are different and stored on different db's

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps, {updateUser})(Profile)