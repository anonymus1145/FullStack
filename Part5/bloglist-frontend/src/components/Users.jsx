// @ts-check

// React import's
import { useEffect } from "react";
import React from "react";

// Redux import's
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../Reducers/usersReducer";

//React router import's
import { Link } from "react-router-dom";

// React component import's
import NavBar from "./NavBar";


const Users = () => {

  // Get  users from Redux store
  // @ts-ignore
  const users = useSelector((state) => state.users);

  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  useEffect(() => {
    // Get users
    dispatch(initializeUsers());
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <br />
        <table>
          <thead>
            <tr>
              <th scope="col">Users</th>
              <th scope="col">Blogs created</th>
            </tr>
          </thead>
          
          <tbody>
            {users.map(
              (
                /** @type {{ id: React.Key | null | undefined; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; blogs: string | any[]; }} */ client,
              ) => (
                <tr key={client.id}>
                  <th scope="row"><Link to={`/users/${client.username}`}>
                    <b>{client.username}</b>
                  </Link></th>
                  <td style={{ textAlign: "center" }}>{client.blogs.length}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
