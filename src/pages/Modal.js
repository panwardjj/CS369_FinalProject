import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Modal = ({closeModal,onSuccess}) => {
    const [post, setPost] = useState({
        name:" ",
        image: " ",
        price:" ",
        description:" "
    })

    //const [image, setImage] = useState([]);

    const [responseMessage, setResponseMessage] = useState('')
    
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value}) 
    }

    function handleSubmit(event){
        event.preventDefault()

        const formDataToSend = new FormData();
            Object.keys(post).forEach((key) => {
                formDataToSend.append(key, post[key]);
            });
        axios.post(process.env.REACT_APP_SERVER_URL + '/addProduct', formDataToSend)
        
        .then(response => {
            console.log("🚀 ~ Modal ~ post:", post)
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

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setPost({...post, image:file});
        } else {
            console.log('Please select an image file.');
            e.target.value = null;
        }
    };

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
                    <div>
                        <label htmlFor="image">Image</label>
                        <input type="file" accept="image/*" name="image" onChange={handleImageChange} required />
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

