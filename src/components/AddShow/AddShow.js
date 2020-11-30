import {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
// import axios from 'axios';
import {addNewShow} from '../../redux/reducer';

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
    
    makeShow = async (e) => {
        e.preventDefault();
        const {title, img, content} = this.state;
        const {id} = this.props.user;
        try {
            this.props.addNewShow(title, img, content, id)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log('err on addnewshow func front end', err)
        }
    }

    render(){
        const {title, img, content} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <form onSubmit={(e) => this.makeShow(e)}>
                        <input name='title' placeholder='Show Title' value={title} onChange={e => this.changeHandler(e)} />
                        <input name='img' placeholder='Show Image' value={img} onChange={e => this.changeHandler(e)} />
                        <input name='content' placeholder='Show Description' value={content} onChange={e => this.changeHandler(e)} />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({user: state.user});
//addShow function goes in here from reducer
export default connect(mapStateToProps, {addNewShow})(AddShow)