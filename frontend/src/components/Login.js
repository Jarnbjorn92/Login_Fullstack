import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <div className='inputDivs'>
            <input type="text" placeholder="Username" className="inputField" />
            <input type="password" placeholder="Password" className="inputField" />
            <button className="loginButton">Login</button>
        </div>
    );
};

export default Login;
