import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { API } from "../api-service";

import "../css/Auth.css";

function Auth({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setLoginView] = useState(true);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginClicked = () => {
    if (username === "") setUsernameError(true);
    if (password === "") setPasswordError(true);

    API.loginUser({ username, password })
      .then((resp) => setToken(resp.token))
      .catch((err) => console.log(err));
  };

  const registerClicked = () => {
    if (username === "") setUsernameError(true);
    if (password === "") setPasswordError(true);

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
        {isLoginView ? <h1 data-test="heading">Login</h1> : <h1>Register</h1>}
      </div>

      <div className="login-container">
        <form onSubmit={submitHandler}>
          {usernameError && (
            <div class="username-error" data-test="username-error">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <label htmlFor="username">You need to provide a username.</label>
            </div>
          )}
          <input
            ref={searchInput}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-test="username"
          />
          {passwordError && (
            <div div class="password-error" data-test="password-error">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <label htmlFor="password">You need to provide a password.</label>
            </div>
          )}
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-test="password"
          ></input>
          <br />
          <button id="submitButton" type="submit" data-test="submit-button">
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
