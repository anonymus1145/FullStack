//@ts-check
// React import's
import React from "react";
import { useState } from "react";

// React component import's
import Blog from "./Blog";
import CreateNote from "./CreateNote";
import NavBar from "./NavBar";

// Services import's
import blogService from "../services/blogs";

// Redux import's
import { useSelector, useDispatch } from "react-redux";
import { addBlogToState } from "../Reducers/blogsReducer";
import { initializeUser } from "../Reducers/userReducer";
import { initializeNotification } from "../Reducers/notificationReducer";


const BlogForm = () => {
  // State for new blog to be able to hide the form
  const [newBlog, setNewBlog] = useState("");
  // State for new blog
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  // Get blogs from Redux store
  // @ts-ignore
  const blogs = useSelector((state) => state.blogs);

  // Get user from Redux store
  // @ts-ignore
  const user = useSelector((state) => state.user);

  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // Remove local storage and set user state to null
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(initializeUser(null));
  };

  // Create new blog and add it to the list of blogs in the database
  const addBlog = async (/** @type {{ preventDefault: () => void; }} */ event) => {
    event.preventDefault();
    // Create blog object
    try {
      await blogService.create({
        title: newTitle,
        author: user.username,
        url: newUrl,
      });
      setNewTitle("");
      setNewUrl("");
     // Change state of notification to show that blog was added
      dispatch(initializeNotification("Blog added"));
      setNewBlog("");
      setTimeout(() => {
        dispatch(initializeNotification("")); 
      }, 5000);

      // Add blog to state, so we can see it in the list without refreshing the page and without makeing
      // a new request to the server
      dispatch(addBlogToState({
        title: newTitle,
        author: user.username,
        url: newUrl,
      }));
    } catch (exception) {
      if (exception.response.status === 401) {
       handleLogout(); 
      }
      // Set error message
      dispatch(initializeNotification("Cannot add blog"));
      setTimeout(() => {
        dispatch(initializeNotification(""));
      }, 5000);
    }
  };

  // Set key for blog if it dosen't exist
  const setKey = ( /** @type {React.Key | null | undefined} */ keyId) => {
   if (keyId) {
     return keyId;
   } 
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
   <div>
      <NavBar />
      {blogs.map((/** @type {{ id: React.Key | null | undefined; }} */ blog) => (
        <Blog key={setKey(blog.id)} blog={blog}  />
      ))}
      {newBlog ?
        <form onSubmit={addBlog}>
        <CreateNote
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
        />
        <button type="submit">create</button>
        <button onClick={() => setNewBlog("")}>Cancel</button>
        </form> : <button style={{ marginTop: "10px", marginBottom: "10px" }} onClick={() => setNewBlog("true")}>Create new blog</button>
      }
    </div>
  )
};
export default BlogForm;
