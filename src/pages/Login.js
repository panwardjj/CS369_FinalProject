import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            navigate('/catalogue')
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/login', {
                username,
                password
            }, { withCredentials: true });
            localStorage.setItem('user', response.data.login_username);
alert('login success')
            navigate('/catalogue');
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div className='login'>
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
    );
};

export default Login;