import {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';
import './Auth.css';

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
        }
    }

    render(){
        const {email, username, password} = this.state;
        return (
            <div >
                <h1 className='auth-brand'>sippi</h1>
                {this.state.newUser ?
                <div className='auth-box'>
                    <h2>Register</h2>
                    <form onSubmit={e => this.register(e)}>
                        <input name='email' value={email} placeholder='Email' onChange={(e) => this.changeHandler(e)} /> <br/>
                        <input name='username' value={username} placeholder='Username' onChange={(e) => this.changeHandler(e)} /> <br/>
                        <input name='password' value={password} placeholder='Password' type='password' onChange={(e) => this.changeHandler(e)} /> <br/>
                        <button>Submit</button>
                    </form>
                    <button onClick={this.toggleNewUser}>Already a user?</button>
                </div>
                :
                <div className='auth-box'>
                    <h2>Login</h2>
                    <form onSubmit={e => this.login(e)}>
                        <input name='email' value={email} placeholder='Email' onChange={(e) => this.changeHandler(e)} /> <br/>
                        <input name='password' value={password} placeholder='Password' type='password' onChange={(e) => this.changeHandler(e)} /> <br/>
                        <button>Submit</button>
                    </form>
                    <button onClick={this.toggleNewUser}>Need an account?</button>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Auth)