// @ts-check
// React import's
import React from "react";

// Redux import's
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "../Reducers/userReducer";

// React router import's
import { useParams } from "react-router-dom";

// React component import's
import NavBar from "./NavBar";


const User = () => {
  // Get the paramters (username) from the URL
  const params = useParams();

  // Get the blogs of the user from parameters
  // @ts-ignore
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter(
    (/** @type {object} */ blog) => blog.author === params.username,
  );

  return (
    <>
      <NavBar />
      <br />
      <h3>Blogs created by {params.username}</h3>
      <ul>
        {userBlogs.map((/** @type {{ id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }} */ blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <div>

      </div>
    </>
  );
};

export default User;
