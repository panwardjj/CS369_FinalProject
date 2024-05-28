import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Modal = ({closeModal,onSuccess}) => {
    const [post, setPost] = useState({
        name:" ",
        price:" ",
        description:" "
    })

    const [responseMessage, setResponseMessage] = useState('')
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value}) 
    }

    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:8080/addProduct',{post})
        
        .then(response => {
            console.log(1)
            setResponseMessage('Successfully add product!')
            setTimeout(() => {
                console.log(2)
                closeModal()
                onSuccess()
            }, 1000)
            console.log(3)
            
            console.log(response)
        })
        .catch(err => {
            setResponseMessage('Failed add product!')
            console.log(err)

        }
        )
    }
    return (
        <div className="modal-container" 
        onClick={(e) => {
            if(e.target.className === "modal-container") closeModal();
        }}
        >
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  onChange={handleInput} name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input  onChange={handleInput} name="price"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea  onChange={handleInput} name="description"/>
                    </div>
                    <div style={{
                        color: responseMessage === 'Successfully add product!' ?  'green' :'red',
                        marginBottom: '10px'
                    }}>{responseMessage}</div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
};

