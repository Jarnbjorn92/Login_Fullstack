import {useEffect , useState} from 'react';
import './LoginPage.css';
import Login from '../components/Login';
import api from '../api/Users';

const LoginPage = () => {

    // STATE
    const [users, setUsers] = useState([]);

    // USEEFFECT TO FETCH APIs WHEN COMPONENT MOUNTS
    useEffect(() => {
        fetchUsers();
    }, []);


    // API GET REQUEST FOR ALL USERS USING AXIOS
    const fetchUsers = async () => {
        try {
            const response = await api.get('/user');
            console.log(response.data)
            setUsers(response.data);
        } catch (err) {
            // IF NOT IN THE 200 RESPONSE RANGE
            console.log(err.response.status)
        };
    };

    
    return (
        <div className='loginContainer'>
            <h2>Welcome! Please Log In:</h2>
            <Login users={users}/>
        </div>
    );

};

export default LoginPage;