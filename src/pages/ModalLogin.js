import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaUser, FaLock } from "react-icons/fa";


export const ModalLogin = ({closeModal,onSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/login', {
                username,
                password
            }, { withCredentials: true });
            localStorage.setItem('user', response.data.login_username);
            alert('login success')
            closeModal()
            onSuccess()
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div className="modal-container" 
        onClick={(e) => {
            if(e.target.className === "modal-container") closeModal();
        }}
        >
            <div className="modal-login">
            <div className="wrapper">
            <div className="form-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className='icon'/>
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
            </div>
        </div>
    )
};

