import {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
// import axios from 'axios';
import {addNewShow, getShows} from '../../redux/reducer';
import Email from '../Email/Email';

class AddShow extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    makeShow = async () => {
        const {title, img, content} = this.state;
        const {id} = this.props.user;
        try {
            this.props.addNewShow(title, img, content, id)
            this.props.history.push('/dashboard')
            this.props.getShows();
        } catch(err){
            console.log('err on addnewshow func front end', err)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.makeShow();
    }

    render(){
        const {title, img, content} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input name='title' placeholder='Show Title' value={title} onChange={e => this.changeHandler(e)} />
                        <input name='img' placeholder='Show Image' value={img} onChange={e => this.changeHandler(e)} />
                        <input name='content' placeholder='Show Description' value={content} onChange={e => this.changeHandler(e)} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <h2>show preview:</h2>
                <h4>title: </h4><div>{title}</div>
                <h4>show poster: </h4>{img === '' ? null : <img src={img} alt='show' style={{width: '200px'}}/>}
                <h4>description: </h4><div>{content}</div>
                <Email />
            </div>
        )
    }
}

const mapStateToProps = state => ({user: state.user});
//addShow function goes in here from reducer
export default connect(mapStateToProps, {addNewShow, getShows})(AddShow)