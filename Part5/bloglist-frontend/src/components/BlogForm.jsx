import Blog from "./Blog";
import CreateNote from "./CreateNote";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ user, blogs,setBlogs, setUser, setErrorMessage, newTitle, setNewTitle, newUrl, setNewUrl }) => {
  // State for new blog to be able to hide the form
  const [newBlog, setNewBlog] = useState("");

  // Remove local storage and set user state to null
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  // Create new blog and add it to the list of blogs in the database
  const addBlog = async (event) => {
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
      blogs = await blogService.getAll();
      setBlogs(blogs);
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

  return (
   <div> 
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setUser={setUser} setErrorMessage={setErrorMessage} blogs={blogs} setBlogs={setBlogs}/>
      ))}
      {newBlog ?
        <form onSubmit={addBlog}>
        <CreateNote
          user={user}
          setBlogs={setBlogs}
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
