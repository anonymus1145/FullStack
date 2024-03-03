//@ts-check
import React from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "../Reducers/userReducer";
import { initializeNotification } from "../Reducers/notificationReducer";
import { initializeLogin } from "../Reducers/loginReducer";

const LoginForm = () => {
  // State for username and password from Redux store
  // @ts-ignore
  const login = useSelector((state) => state.login);
  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // Login logic
  // Makes a POST request to the server using login module and returns the user object
  const handleLogin = async (
    /** @type {{ preventDefault: () => void; }} */ event,
  ) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: login.username,
        password: login.password,
      });
      // Save user to local storage so that they can stay logged in
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // Push token to blogs module to chnage the variable token
      blogService.setToken(user.token);
      // Set user state to the user object with token returned from server
      dispatch(initializeUser(user));
      // Set username and password state to empty string
      dispatch(
        initializeLogin({
          username: "",
          password: "",
        }),
      );
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
          value={login.username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => dispatch(initializeLogin({ ...login, username: target.value }))}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={login.password}
          name="Password"
          autoComplete="off"
          onChange={({ target }) => dispatch(initializeLogin({ ...login, password: target.value }))}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
