import {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';
import './Auth.scss';

class Auth extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            username: '',
            password: '',
            newUser: false
        }
    }

    toggleNewUser = () => {
        this.setState({newUser: !this.state.newUser})
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        try {
            let user = await axios.post('/api/login', {email, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log('problem with login func front end', err)
            alert('Incorrect Login Information, try again')
        }
    }

    register = async (e) => {
        e.preventDefault();
        const {email, username, password} = this.state;
        try {
            let user = await axios.post('/api/register', {email, username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log('err in register func front end', err)
            alert('Incorrect information, try again')
        }
    }

    render(){
        const {email, username, password} = this.state;
        return (
            <div className='container'>
                <div>
                    <p className='auth-brand'>sippi</p>
                </div>
                <div className='auth'>
                    {this.state.newUser ?
                    <div className='auth-box'>
                        <h2>register</h2>
                        <form onSubmit={e => this.register(e)} className='form-box'>
                            <input name='email' value={email} placeholder='email' onChange={(e) => this.changeHandler(e)} /> <br/>
                            <input name='username' value={username} placeholder='username' onChange={(e) => this.changeHandler(e)} /> <br/>
                            <input name='password' value={password} placeholder='password' type='password' onChange={(e) => this.changeHandler(e)} /> <br/>
                            <button>submit</button>
                        <button onClick={this.toggleNewUser}>already a user?</button>
                        </form>
                    </div>
                    :
                    <div className='auth-box'>
                        <h2>login</h2>
                        <form onSubmit={e => this.login(e)} className='form-box'>
                            <input name='email' value={email} placeholder='email' onChange={(e) => this.changeHandler(e)} /> <br/>
                            <input name='password' value={password} placeholder='password' type='password' onChange={(e) => this.changeHandler(e)} /> <br/>
                            <button>submit</button>
                        <button onClick={this.toggleNewUser}>need an account?</button>
                        </form>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser})(Auth)