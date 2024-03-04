//@ts-check
// React import's
import React from "react";

// React router import's
import { Link } from "react-router-dom";

// Redux import's
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../Reducers/userReducer";

const NavBar = () => {
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
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid black",
          padding: "5px",
          margin: "5px",
          backgroundColor: "lightblue",
        }}
      >
        <div>
          <Link to="/">blogs</Link>
        </div>
        <div>
          <Link to="/users">users</Link>
        </div>
        <h4>{user ? user.username : null} logged in</h4>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <h1>Blog App</h1>
      </div>
    </>
  );
};

export default NavBar;
