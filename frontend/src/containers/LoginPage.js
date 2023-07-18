import React from 'react';
import './LoginPage.css';
import Login from '../components/Login';

const LoginPage = () => {

    return (
        <div className='loginContainer'>
            <h2>Welcome! Please Log In:</h2>
            <Login/>
        </div>
    );
}

export default LoginPage;