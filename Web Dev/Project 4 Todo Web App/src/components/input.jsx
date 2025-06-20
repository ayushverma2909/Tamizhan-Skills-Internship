import react, { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import Zoom from '@mui/material/Zoom';

const Input = (props) => {

    const[note, setNote] = useState({
        "title": "",
        "content": ""
    });

    const[show, setShow] = useState(false)

    function showContent(){
        setShow(true)
    }

    function handleChange(event)  {

        const {name, value} = event.target

        setNote(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })


    }

    function submitNote(event){
        props.onAdd({
            ...note,
            time: new Date(),
            edited: false
        })

        setNote({
            "title": "",
            "content": ""
        })
        
    }


    return(
        <>
            <div className='inputText'>
                <textarea name="content" id="description"onChange={handleChange} onClick={showContent} value={note.content} placeholder='Something in mind?' rows={show?3:1}></textarea>
                <Zoom in={show}>
                    <IoIosAddCircle onClick={submitNote} className='SubmitText' />
                </Zoom>
                
                
               
            </div>
                
        </>
    )
}

export default Input