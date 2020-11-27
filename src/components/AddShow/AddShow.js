import {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';

class AddShow extends Component {
    constructor(){
        super();

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

    render(){
        const {title, img, content} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <form>
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

const mapStateToProps = state => state;
//addShow function goes in here from reducer
export default connect(mapStateToProps)(AddShow)