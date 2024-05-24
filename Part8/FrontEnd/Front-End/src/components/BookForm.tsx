import query from "../middleware/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genres, setGenres] = useState("");
  // Error state
  const [error, setError] = useState("");

  // We uste the useMutation hook to create a new book
  const [addBook] = useMutation(query.ADD_BOOK, {
    onError: (error) => {
      const errorMessage = error.graphQLErrors
        .map(({ message }) => message)
        .join("\n");
      setError(errorMessage);
      setTimeout(() => setError(""), 20000);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: query.ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
    },
  });


  // We create a new book function
  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await addBook({ variables: { title, author, published, genres } })
    setTitle("");
    setAuthor("");
    setPublished(0);
    setGenres("");
  };

  return (
    <div>
      <div style={{ color: "red" }}>{error}</div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          genres
          <input
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default BookForm;
