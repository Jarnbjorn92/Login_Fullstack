import {useEffect , useState} from 'react';
import './LoginPage.css';
import Login from '../components/Login';

const LoginPage = () => {

    // STATE
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

      // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
    useEffect(() => {
        fetch("http://127.0.0.1:8000/users/")
        .then(res => res.json())
        .then((result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )}, [])

    // // USEEFFECT TO FETCH APIs WHEN COMPONENT MOUNTS
    // useEffect(() => {
    //     getUsers()
    // },[])

    // API GET REQUEST FOR ALL USERS
    // const getUsers = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/users/', {
    //             mode: 'no-cors',
    //         });
    //     if (response.ok) {
    //         // Handle the response
    //         const data = await response.json();
    //         setUsers(data);
    //         console.log(data)
    //     } else {
    //         // Handle the error
    //         console.error('Request failed with status:', response.status);
    //     }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // };

    
    // return (
    //     <div className='loginContainer'>
    //         <h2>Welcome! Please Log In:</h2>
    //         <Login/>
    //     </div>
    // );
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        );
      }
    }


export default LoginPage;