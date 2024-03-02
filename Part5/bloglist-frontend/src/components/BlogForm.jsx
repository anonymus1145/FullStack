//@ts-check
import React from "react";
import Blog from "./Blog";
import CreateNote from "./CreateNote";
import { useState } from "react";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { addBlogToState } from "../Reducers/blogsReducer";

const BlogForm = ({ user,  setUser, setErrorMessage, newTitle, setNewTitle, newUrl, setNewUrl }) => {
  // State for new blog to be able to hide the form
  const [newBlog, setNewBlog] = useState("");

  // Get blogs from Redux store
  // @ts-ignore
  const blogs = useSelector((state) => state.blogs);

  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // Remove local storage and set user state to null
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
      setErrorMessage("New blog added");
      setNewBlog("");
      setTimeout(() => {
        setErrorMessage(null);
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
        window.localStorage.removeItem("loggedUser");
        setUser(null);
      }
      setErrorMessage("Cannot add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const setKey = ( /** @type {React.Key | null | undefined} */ keyId) => {
   if (keyId) {
     return keyId;
   } 
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
   <div> 
      {blogs.map((/** @type {{ id: React.Key | null | undefined; }} */ blog) => (
        <Blog key={setKey(blog.id)} blog={blog} setUser={setUser} setErrorMessage={setErrorMessage} />
      ))}
      {newBlog ?
        <form onSubmit={addBlog}>
        <CreateNote
          // @ts-ignore
          user={user}
          setErrorMessage={setErrorMessage}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
        />
        <button type="submit">create</button>
        <button onClick={() => setNewBlog("")}>Cancel</button>
        </form> : <button style={{ marginTop: "10px" }} onClick={() => setNewBlog("true")}>Create new blog</button>
      }
      <div>
        <h2>{user ? user.username : null} logged in</h2>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
};
export default BlogForm;
