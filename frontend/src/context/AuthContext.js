import { createContext, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    // STATE TO STORE USER INFO AND TOKEN LOCALLY
    let [user, setUser] = useState(() => 
        localStorage.getItem("authTokens") ? 
        jwt_decode(localStorage.getItem("authTokens")) : null 
    );

    let [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens") ?
        JSON.parse(localStorage.getItem("authTokens")) : null
    );
    
    // 
    let [loading, setLoading] = useState(true);
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory();

    // 
    let loginUser = async (event) => {
        event.preventDefault();
        let response = await fetch("http://127.0.0.1:8000/api/token/", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
            }),
        });

        let data = await response.json();
        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));

            checkFirstLogin(
                jwt_decode(data.access).user_id,
                jwt_decode(data.access).first_name
            );
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            enqueueSnackbar(`Please check your details`, { variant: "error"});
        }
    };

    const checkFirstLogin = async (userId, firstName) => {
        await axios.get(`http://127.0.0.1:8000/user/${userId}`)
        .then((res) => {
            console.log(res.data[0])

            if (res.data[0].first_login === true){
                checkUserDetails(userId, firstName, res.data.id)
            } else {
                enqueueSnackbar(`Welcome ${firstName}`, { variant: "success" })
                // history.push('add route here'); //Add routing to landing page
            }
        })
    }
};

export default { AuthContext, AuthProvider };