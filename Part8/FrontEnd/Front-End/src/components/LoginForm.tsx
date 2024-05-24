import query from "../middleware/queries";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import RegisterUser from "./RegisterUser";

const LoginForm = ({
  setToken,
  setError,
}: {
  setToken: (token: string) => void;
  setError: (error: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  // We uste the useMutation hook to login
  const [login, result] = useMutation(query.LOGIN, {
    onError: (error) => {
     setError(error.graphQLErrors[0].message) 
    },
  });

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    login({ variables: { username, password } }); 
  };


  return (
    <div>
      {register ? <RegisterUser setRegister={setRegister} /> :
      <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <button onClick={() => setRegister(true)}>register</button>
      </div>}
    </div>
  );
};

export default LoginForm;
