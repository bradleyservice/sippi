import axios from 'axios';
import {Component} from 'react';

class ShowPost extends Component {
    constructor(){
        super()

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    addShow = () => {
        // might not need this component at all??
    }

    render(){
        return (
            <div>
                <form>

                </form>
            </div>
        )
    }
}

export default ShowPost