import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { API } from "../api-service";

import HeaderTitle from "./HeaderTitle";
import classes from "../css/Auth.module.css";

const Auth = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setLoginView] = useState(true);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginClickedHandler = () => {
    if (username && password) {
      API.loginUser({ username, password })
        .then((resp) => {
          if ("errors" in resp) {
            const errors = resp["errors"]["non_field_errors"];
            setUsernameError(errors);
            setPasswordError(errors);
          }
          setToken(resp.token);
        })
        .catch((err) => console.error(err));
      return;
    }

    username === ""
      ? setUsernameError("You need to provide a username.")
      : setUsernameError("");
    password === ""
      ? setPasswordError("You need to provide a password.")
      : setPasswordError("");
  };

  const registerClickedHandler = () => {
    if (username && password) {
      API.registerUser({ username, password })
        .then((resp) => {
          console.log(resp);
          const userCreatedId = resp["id"];
          if (userCreatedId) {
            loginClickedHandler();
          } else {
            const usernameErrorMsg = resp["username"][0];
            setUsernameError(usernameErrorMsg);

            const passwordErrorMsg = resp["password"][0];
            setPasswordError(passwordErrorMsg);
          }
        })
        .catch((error) => console.error(error));
      return;
    }

    username === ""
      ? setUsernameError("You need to provide a username.")
      : setUsernameError("");
    password === ""
      ? setPasswordError("You need to provide a password.")
      : setPasswordError("");
  };

  const loginInput = useRef(null);

  useEffect(() => {
    loginInput.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    isLoginView ? loginClickedHandler() : registerClickedHandler();
  };

  const toggleViewClickedHandler = (bool) => {
    setLoginView(bool);
    setUsernameError("");
    setPasswordError("");
  };

  return (
    <div>
      <HeaderTitle />
      <div className={classes["login-container"]} data-test="login-container">
        <form onSubmit={submitHandler}>
          {usernameError && (
            <div className="username-error" data-test="username-error">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <label htmlFor="username">{usernameError}</label>
            </div>
          )}
          <input
            ref={loginInput}
            className={classes["username-input"]}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-test="username"
          />
          {passwordError && (
            <div div className="password-error" data-test="password-error">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <label htmlFor="password">{passwordError}</label>
            </div>
          )}
          <input
            className={classes["password-input"]}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-test="password"
          ></input>
          <br />
          <button
            className={classes["submit-button"]}
            id="submitButton"
            type="submit"
            data-test="submit-button"
          >
            {isLoginView ? "Login" : "Register"}
          </button>
          {isLoginView ? (
            <p onClick={() => toggleViewClickedHandler(false)}>
              You don't have an account?{" "}
              <span data-test="register-link">Register here!</span>
            </p>
          ) : (
            <p onClick={() => toggleViewClickedHandler(true)}>
              You already have an account?{" "}
              <span data-test="login-link">Login here!</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
