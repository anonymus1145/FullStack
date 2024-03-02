//@ts-check
import React from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { initializeUser } from "../Reducers/userReducer";
import { initializeNotification } from "../Reducers/notificationReducer";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
}) => {

  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

 // Login logic
  // Makes a POST request to the server using login module and returns the user object
  const handleLogin = async (/** @type {{ preventDefault: () => void; }} */ event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      // Save user to local storage so that they can stay logged in
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // Push token to blogs module to chnage the variable token
      blogService.setToken(user.token);
      // Set user state to the user object with token returned from server
      dispatch(initializeUser(user));
      // Set username and password state to empty string
      setUsername("");
      setPassword("");
    } catch (exception) {
      // Set error message
      dispatch(initializeNotification("Wrong credentials"));
      setTimeout(() => {
        dispatch(initializeNotification("")); 
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

