import axios from 'axios';
import {Component} from 'react';

class Email extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
            email: '',
            title: '',
            message: '',
            image: '',
            toggle: false
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }

    handleSend = () => {
        const {name, email, title, message, image} = this.state;
        axios.post('/api/email', {name, email, title, message, image}).then(res => {
            this.setState({
                name: '',
                email: '',
                title: '',
                message: '',
                image: '',
                toggle: false
            })
        })
    }

    render(){
        const {name, email, title, message, image, toggle} = this.state;
        return(
            <div style={styles.body}>
                {toggle ?
                <form style={styles.form}>
                    <h1 style={styles.header}>email us</h1>
                    <input style={styles.input} name='name' placeholder='Your Name' value={name} onChange={this.handleInput} />
                    <input style={styles.input} name='email' placeholder='Your Email' value={email} onChange={this.handleInput} />
                    <input style={styles.input} name='title' placeholder='Subject' value={title} onChange={this.handleInput} />
                    <input style={styles.input} name='message' placeholder='Email Body' value={message} onChange={this.handleInput} />
                    <input style={styles.input} name='image' placeholder='Image' value={image} onChange={this.handleInput} />
                    <button style={styles.button} onClick={this.handleSend}>send</button>
                    <i className="fas fa-bars fa-2x" onClick={this.handleToggle}></i>
                </form>
                : 
                <div>
                    <h5>click here to email us:</h5>
                    <i className="fas fa-bars fa-2x" onClick={this.handleToggle}></i>
                </div>}
            </div>
        )
    }
}

export default Email;

const styles = {
    body:{
      background:'lightgrey',
      height:'27vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop:75
    },
    form:{
      display:'flex',
      flexDirection:'column',
      background:'#3973A8',
      width:'90vw',
      alignItems:'center',
      height:'27vh',
      justifyContent:'space-evenly',
      borderRadius:10
    },
    header:{
      fontSize:24,
      margin:0,
      color:'white',
      letterSpacing:'0.07em',
      fontWeight:'bold'
    },
    input:{
      width:300,
      height:18,
      fontSize:14,
      outline:'none'
    },
    button:{
      width:100,
      height:26,
      borderRadius:10,
      background:'black',
      color: 'white',
      fontSize:18,
      fontWeight:'bold',
      letterSpacing:'0.07em'
    }
  }