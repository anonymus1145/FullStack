import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setUser, setErrorMessage, blogs, setBlogs }) => {
  // State for View
  const [view, setView] = useState("");
  // State for number of likes
  const [likes, setLikes] = useState(blog.likes);

  // Function to update the state of blogs
  const click = async () => {
    blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  // Function to like a blog
  const like = async () => {
    // Create new blog object equal with old blog and add 1 to likes
    const updatedBlog = { ...blog, likes: likes + 1 };
    // Update like state
    setLikes(likes + 1);
    // Update blog in database
    try {
      const response = await blogService.update(blog.id, updatedBlog);
      // Update blogs state
      if (response) {
        click();
      }
      // Set error message
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        window.localStorage.removeItem("loggedUser");
        setUser(null);
      }
      // Set error message
      setErrorMessage("Cannot like blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Function to delete a blog
  const remove = async () => {
    // try to delete the blog from the database
    try {
      // Ask the user if he really wants to delete the blog
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
      if (!window.confirm) {
        return;
      }
      await blogService.remove(blog.id);
      // Update blogs state
      click();
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        window.localStorage.removeItem("loggedUser");
        setUser(null);
      }
      // Set error message
      setErrorMessage("Cannot delete blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
// We give to the component a ClassName so that we can access it in the tests
  return (
    <div className="blog">
      <div style={{ marginTop: "10px" }}>
        {blog.title}
        <button style={{ marginLeft: "10px" }} onClick={() => setView("true")}>
          View
        </button>
      </div>
      <div>
        {view ? (
          <div>
            <p>{blog.url}</p>
            <p>
              likes: {likes}
              <button onClick={like} style={{ marginLeft: "10px" }}>
                Like
              </button>
            </p>
            <p> added by {blog.author}</p>
            <button onClick={remove}>Delete Blog</button>
            <button onClick={() => setView("")}>Hide</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
