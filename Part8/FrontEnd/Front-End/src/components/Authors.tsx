import { useState } from "react";
import {  useQuery } from "@apollo/client";
import Author from "./Author";
import query from "../middleware/queries";


const Authors = ({ authors }: { authors: Author[] }) => {
  const [nameToSearch, setNameToSearch] = useState("");
  // The query is executed on rerender only if nameToSearch is not empty
  const result = useQuery(query.FIND_AUTHOR, {
    variables: { nameToSearch },
    skip: nameToSearch === "",
  });

  if (nameToSearch && result.data) {
    return (
      <Author
        author={result.data.findAuthor}
        onClose={() => setNameToSearch("")}
      />
    );
  }

  return (
    <div>
      <h2>Authors</h2>
      {authors.map((p: Author) => (
        <div key={p.name}>
          {p.name}
          <button onClick={() => setNameToSearch(p.name)}>show details</button>
        </div>
      ))}
    </div>
  );
};

export default Authors;
