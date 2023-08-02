import { useState } from 'react';
import './Login.css'

const Login = ({ users }) => {

    // SETTING STATE FOR USER
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    // EVENT HANDLER FOR USER AND PASSWORD
    const handleUsernameChange = (event) => {
        setUsernameInput(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPasswordInput(event.target.value);
    };


    // HANDLE LOGGING ON THE FRONTEND WITH USER CHECK
    const handleLogin = () => {

        // CHECK IF THE USERNAME AND PASSWORD MATCHES USER THE ARRAY
        const user = users.find((user) =>
            user.name === usernameInput && user.password === passwordInput
        );
        if (user) {
          // SUCCESSFUL LOGIN
            setLoggedIn(true);
        } else {
          // INCORRECT LOGIN
            setLoggedIn(false);
        }
    };

    return (
        <div className='inputDivs'>
            <input 
                className='inputField' 
                type="text" 
                id="username" 
                placeholder="Username" 
                value={usernameInput} 
                onChange={handleUsernameChange}
            />
            <input 
                className='inputField' 
                type="text" 
                id="password" 
                placeholder="Password" 
                value={passwordInput} 
                onChange={handlePasswordChange}
            />
            <button onClick={handleLogin} className="loginButton">Login</button>
            <>
            {loggedIn ? (
                usernameInput && passwordInput && (
                <div>Logged In Successfully!</div>
                )
            ) : (
                users.length > 0 && (
                <div>Invalid username or password</div>
                )
            )}
            </>
        </div>
    );

};

export default Login;
