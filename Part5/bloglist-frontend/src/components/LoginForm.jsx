//@ts-check
import React from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  setErrorMessage,
}) => {

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
      setUser(user);
      // Set username and password state to empty string
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
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

