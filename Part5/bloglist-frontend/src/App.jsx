//@ts-check
import React from "react";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./Reducers/blogsReducer";


const App = () => {
  // State for error message
  const [errorMessage, setErrorMessage] = useState(null);

  // Username and password state for the login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // User state
  const [user, setUser] = useState(null);
  // State for new blog
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");


  // We call the useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // Get all blogs
  useEffect(() => {
    // We call dispatch and give the action creator as an argument to update the state
    // We call the initializeAnecdotes action from the reducer and pass it to the action 
    dispatch(initializeBlogs()); 
  }, []);

  // Check if user is in local storage and set user state and push token to blogs module
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blog App</h1>
      <h2>{errorMessage}</h2>
      {user ? (
        <BlogForm
          user={user}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          setNewTitle={setNewTitle}
          setNewUrl={setNewUrl}
          newTitle={newTitle}
          newUrl={newUrl}
        />
      ) : (
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
