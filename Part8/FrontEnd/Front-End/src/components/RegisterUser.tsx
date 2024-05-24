import { useMutation } from "@apollo/client";
import query from "../middleware/queries";
import { useState } from "react";

const RegisterUser = ({setRegister}: {setRegister: (register: boolean) => void}) => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [books, setBooks] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [createUser] = useMutation(query.REGISTER_USER, {
    onError: (error) => {
      const errorMessage = error.graphQLErrors
        .map(({ message }) => message)
        .join("\n");
      setError(errorMessage);
      setTimeout(() => setError(""), 10000);
    },
  });

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await createUser({ variables: { username, favoriteGenre, books } });
    setUsername("");
    setFavoriteGenre("");
    setBooks([]);
    setRegister(false)
  };

  return (
    <div>
      <h2>Register</h2>
      <div style={{ color: "red" }}>{error}</div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite genre
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <div>
          books
          <input
            value={books}
            onChange={({ target }) => setBooks(target.value.split(","))}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default RegisterUser;
