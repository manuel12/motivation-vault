import '../css/Auth.css';

import React, { useState, useEffect, useRef } from 'react';
import { API } from '../api-service';

function Auth({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setLoginView] = useState(true);

  const loginClicked = () => {
    API.loginUser({username, password})
    .then(resp => setToken(resp.token))
    .catch(err => console.log(err))
  }

  const registerClicked = () => {
    API.registerUser({username, password})
    .then(() => loginClicked())
    .catch(error => console.log(error))
  }

  const searchInput = useRef(null);

  useEffect(()=>{
    searchInput.current.focus();
  },[])

  const keyDown = event => {
    if(event.code == "Enter") {
      isLoginView ? loginClicked() : registerClicked()
    }
  }

  return (
    <div>
      <div className="header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </div>
      
      <div className="login-container">
        <label htmlFor="username">Username</label><br/>
        <input ref={searchInput} id="username" type="text" placeholder="username" value={username}
          onChange={ evt => setUsername(evt.target.value) }/><br/>

        <label htmlFor="password">Password</label><br/>
        <input onKeyDown={keyDown} id="password" type="password" placeholder="password" value={password}
          onChange={ evt => setPassword(evt.target.value)}>
        </input><br/>

      
          {isLoginView ?  
            <button id="submitButton" onClick={loginClicked}>Login</button> : 
            <button id="submitButton" onClick={registerClicked}>Register</button>}
        

        {isLoginView ? 
          <p onClick={()=> setLoginView(false)}>You don't have an account? Register here!</p> :
          <p onClick={()=> setLoginView(true)}>You already have an account? Login here!</p>
        }
      </div>

    </div>
  ) 
}

export default Auth;