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
        try {
        axios.post('/api/email', {name, email, title, message, image})
        this.setState({
            name: '',
            email: '',
            title: '',
            message: '',
            image: '',
            toggle: false
            })
        } catch(err){
            console.log('err in handlesend', err)
        }
    }

    render(){
        const {name, email, title, message, image, toggle} = this.state;
        return(
            <div>
                <footer>
                    {toggle ?
                    <div style={styles.body}>
                        <form style={styles.form}>
                            <h1 style={styles.header}>email us</h1>
                            <input style={styles.input} name='name' placeholder='your name' value={name} onChange={this.handleInput} />
                            <input style={styles.input} name='email' placeholder='your email' value={email} onChange={this.handleInput} />
                            <input style={styles.input} name='title' placeholder='subject' value={title} onChange={this.handleInput} />
                            <input style={styles.input} name='message' placeholder='email body' value={message} onChange={this.handleInput} />
                            <input style={styles.input} name='image' placeholder='image' value={image} onChange={this.handleInput} />
                            <div style={{display: 'inline', alignItems: 'center', width: '160px', marginBottom: '10px'}}>
                                <button style={styles.button} onClick={this.handleSend}>send &nbsp;&nbsp;&nbsp;&nbsp;</button>
                                <i style={styles.logo} className="fas fa-bars fa-2x" onClick={this.handleToggle}></i>
                            </div>
                        </form>
                    </div>
                    : 
                    <div style={styling.body} className='email-us'>
                        <h5>click here to email us: &nbsp;&nbsp;&nbsp;&nbsp;</h5>
                        <i className="fas fa-bars fa-2x" onClick={this.handleToggle}></i>
                    </div>}
                </footer>
            </div>
        )
    }
}

export default Email;

const styles = {
    body:{
      background:'#e2e2e2',
      height:'27vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop:'75px',
    },
    form:{
      display:'flex',
      flexDirection:'column',
      background:'#1b2c4e',
      width:'80vw',
      alignItems:'center',
      height:'27vh',
      justifyContent:'space-evenly',
      borderRadius:7
    },
    header:{
      fontSize:20,
      margin:0,
      color:'white',
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
      border:'2px solid #fca311',
      background:'#1b2c4e',
      color: 'white',
      fontSize:20,
      marginTop: '7px'
    },
    logo:{
        color: 'white',
        marginTop: '7px',
        marginLeft: '10px'
    }
  }

  const styling = {
      body:{
        background:'lightgrey',
        height:'16vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:75
      }
  }