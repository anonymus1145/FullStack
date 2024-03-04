//@ts-check
// React import's
import React from "react";

// Redux import's
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "../Reducers/userReducer";
import { blogLike } from "../Reducers/blogsReducer";
import { initializeNotification } from "../Reducers/notificationReducer";

//  React Routing import's
import { useParams } from "react-router-dom";

// Services import's
import blogService from "../services/blogs";

// React component import's
import NavBar from "./NavBar";


const BlogView = () => {
  // Get and blogs from Redux store
  // @ts-ignore
  const blogs = useSelector((state) => state.blogs);

  // Get the paramters (id) from the URL
  const params = useParams();

  // Get useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();


  // Find the blog in the list of blogs
  const blog = blogs.find(
    (/** @type {object} */ likedBlog) => likedBlog.id === params.blogId,
  );

  // If blog is not found is necessary to return null to avoid an error in the UI
  if (!blog) {
    return null;
  }

  const likes = blog.likes;

  // Function to like a blog
  const like = async () => {
    // Create new blog object equal with old blog and add 1 to likes
    const updatedBlog = { ...blog, likes: likes + 1 };

    // Update blog in database
    try {
      const response = await blogService.update(blog.id, updatedBlog);
      // Update blogs state
      if (response) {
        // Update the likes in the store
        dispatch(blogLike(blog.id));
      }
      // Set error message
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        window.localStorage.removeItem("loggedUser");
        dispatch(initializeUser(null));
      }
      // Set error message
      dispatch(initializeNotification("Cannot like the blog"));
      setTimeout(() => {
        dispatch(initializeNotification(""));
      }, 5000);
    }
  };

  return (
    <>
      <NavBar />
      <br />
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          likes: {likes}
          <button onClick={like} style={{ marginLeft: "10px" }}>
            like
          </button>
        </p>
        <p>{blog.author}</p>
      </div>
    </>
  );
};

export default BlogView;
