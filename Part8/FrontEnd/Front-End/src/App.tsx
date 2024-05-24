import { useState } from "react";
import { useQuery, useApolloClient, useSubscription, ApolloCache, DocumentNode } from "@apollo/client";
import Authors from "./components/Authors";
import query from "./middleware/queries";
import AuthorForm from "./components/AuthorForm";
import BornForm from "./components/ChangeYearBorn";
import AuthorList from "./components/AuthorList";
import BookList from "./components/BookList";
import LoginForm from "./components/LoginForm";



// function that takes care of manipulating cache
export const updateCache = (cache: ApolloCache<object>, query: { query: DocumentNode; }, addedBook: object) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a: any[]) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  // useQuery makes the query it receives as a parameter. It returns an object with multiple fields. The field loading is true if the query has not received a response yet
  const result = useQuery(query.ALL_AUTHORS);

  const [show, setShow] = useState(false);
  const [showAuthors, setAuthors] = useState(false);
  const [showBooks, setBooks] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const client = useApolloClient();

  useSubscription(query.BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(`${addedBook.title} added`)
      updateCache(client.cache, { query: query.ALL_BOOKS }, addedBook)
    }
  });

  if (!token) {
    return (
      <div>
        <div style={{ color: "red" }}>{error}</div>
        <LoginForm setToken={setToken} setError={setError} />
      </div>
    );
  }

  if (showAuthors && !showBooks) {
    return <AuthorList />;
  } else if (showBooks && !showAuthors) {
    return <BookList />;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken("");
    localStorage.clear();
    client.resetStore();
  }

  // When a response is received, the result of the allPersons query can be found in the data field
  return (
    <div>
      <div style={{ position: "absolute", top: 0, left: 0, margin: 40 }}>
        <button onClick={() => setAuthors(!showAuthors)}>Authors</button>
        <button onClick={() => setBooks(!showBooks)}>Books</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div style={{ margin: 20 }}>
        <Authors authors={result.data.allAuthors} />
        <button onClick={() => setShow(!show)}>Show</button>
        {show ? <AuthorForm /> : <BornForm />}
      </div>
    </div>
  );
};

export default App;
