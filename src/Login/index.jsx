import { useState} from 'react';
import cookie from 'js-cookie';
import {useNavigate} from 'react-router-dom'

import './index.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
       const [errorMessage, setErrorMessage] = useState('');
       const changeUsername = (event) => {
        setUsername(event.target.value);
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
    }
   const submitsuccess = jwtToken => {
  cookie.set('jwt_token', jwtToken, {expires: 30})
  navigate('/', {replace: true})
}
    
    const submitfailure = (errorMessage) => {
        setErrorMessage(errorMessage);
        setError(true);
    }
    const submitForm = async (event) => {
        event.preventDefault();
        const userDetails = { username, password };
        const url = 'https://apis.ccbp.in/login';
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        };
        const data = await fetch(url, options);
        const response = await data.json();
        if (data.ok === true) {
            submitsuccess(response.jwt_token);
            
        } else {
            submitfailure(response.error_msg);
            setErrorMessage('Invalid username or password')
        }
        
    }
    return (
        <div className="login-container">
            <div className="image-container">
                <img src="https://res.cloudinary.com/dyo49bced/image/upload/v1788269414/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d.jpg" alt="user icon"/>

            </div>
            <div className="form-container">
               <img src="https://res.cloudinary.com/dyo49bced/image/upload/v1788327853/Group_7731.png" alt="logo"/>
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={changeUsername} />
                    </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={changePassword} />
                    {error && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        </div>
        )
    
}
export default Login;