import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";


const App = () => {
  // State for error message
  const [errorMessage, setErrorMessage] = useState(null);
  // Update the blogs state
  const [blogs, setBlogs] = useState([]);
  // Username and password state for the login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // User state
  const [user, setUser] = useState(null);
  // State for new blog
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // Get all blogs
  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      // Sort the blogs by likes
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
      if (!blogs) {
        // Set error message
        setErrorMessage("Cannot get blogs");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };
    getBlogs();
  }, []);

  // Check if user is in local storage and set user state and push token to blogs module
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    console.log(loggedUserJSON);
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
          blogs={blogs}
          setBlogs={setBlogs}
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
