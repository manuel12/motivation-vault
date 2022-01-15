import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { API } from "../api-service";

import "../css/Auth.css";

function Auth({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setLoginView] = useState(true);

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((resp) => setToken(resp.token))
      .catch((err) => console.log(err));
  };

  const registerClicked = () => {
    API.registerUser({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    isLoginView ? loginClicked() : registerClicked();
  };

  return (
    <div>
      <div className="header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </div>

      <div className="login-container">
        <form onSubmit={submitHandler}>
          <FontAwesomeIcon icon={faEnvelope} className="icon"/>
          <label htmlFor="username">Username</label>
          <br />
          <input
            ref={searchInput}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <br />
          <FontAwesomeIcon icon={faLock} className="icon"/>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          ></input>
          <br />

          <button id="submitButton" type="submit">
            {isLoginView ? "Login" : "Register"}
          </button>

          {isLoginView ? (
            <p onClick={() => setLoginView(false)}>
              You don't have an account? Register here!
            </p>
          ) : (
            <p onClick={() => setLoginView(true)}>
              You already have an account? Login here!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Auth;
