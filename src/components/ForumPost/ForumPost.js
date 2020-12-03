import {useState} from 'react'

const ForumPost = () => {


    const useInput = ({type}) => {
        const [value, setValue] = useState('');
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

    const [title, titleInput] = useInput({type: 'text'})
    const [content, contentInput] = useInput({type: 'text'})

    return (
        <div>
            <>
            Forum Title: {titleInput} {title} <br/>
            Forum Content: {contentInput}  {content}
            </>
        </div>
    )
}



export default ForumPost