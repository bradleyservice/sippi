import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const BandInfo = (props) => {

    const [state, setState] = useState({
        band_pic: '',
        band_name: '',
        band_description: '',
        band_genre: ''
    })
    
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get('/api/band/info')
                if(res.data[0]){
                setState(state => ({
                    ...state,
                    band_pic: res.data[0].band_picture,
                    band_name: res.data[0].band_name,
                    band_description: res.data[0].band_description,
                    band_genre: res.data[0].genre
                }))}
            } catch(err){
                console.log('err on getinfo func front end', err)
            }
        }
        getInfo();
    }, [])

    const {band_pic, band_name, band_description, band_genre} = state;

    const addInfo = () => {
        const {id} = props.user;
        try {
            axios.post('/api/bands', {band_pic, band_name, band_description, band_genre, id})
        } catch(err){
            console.log('err on addinfo func, front end', err)
        }
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addInfo(state);
    }

    return (
        <div className='band-info-page'>
            <div className='band-info'>
                <div><h3>band photo: </h3><img src={band_pic} className='band-photo' alt='band'/></div>
                <div className='info'><h3>band name:</h3> <h4>{band_name}</h4>
                <h3>band description:</h3> <span>{band_description}</span>
                <h3>band genre:</h3> <span>{band_genre}</span></div>
            </div>
            {edit ? 
            <form onSubmit={e => handleSubmit(e)}>
                <input name='band_pic' placeholder='band photo' value={band_pic} onChange={e => handleChange(e)} />
                <input name='band_name' placeholder='band name' value={band_name} onChange={e => handleChange(e)} />
                <input name='band_description' placeholder='description' value={band_description} onChange={e => handleChange(e)} />
                <input name='band_genre' placeholder='genre' value={band_genre} onChange={e => handleChange(e)} />
                <button type='submit'>Submit</button>
            </form>
            : null}
            {edit ? 
            <button style={{marginBottom: '80px', marginTop: '20px'}} onClick={() => {
                setState(state => ({
                    ...state
                }))
                setEdit(!edit)
            }}>close</button>
            : 
            <button style={{marginBottom: '80px', marginTop: '20px'}} onClick={() => {
                setEdit(!edit)
            }}>edit band info</button>}
        </div>
    )
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps)(BandInfo)