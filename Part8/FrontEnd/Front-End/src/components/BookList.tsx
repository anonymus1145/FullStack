import query from "../middleware/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import BookForm from "./BookForm";


export type Book = {
  title: string;
  author: { name: string };
  published: number;
  genre: string;
  id: string;
};

const BookList = () => {
  // We get all authors from the cache
  const result = useQuery(query.ALL_BOOKS);

  // Form state
  const [fomVisible, setFormVisible] = useState(false);

  if (fomVisible) {
    return <BookForm />;
  }

  return (
    <div>
     <h1>Books</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.data?.allBooks.map((book: Book) => (
              <TableRow key={book.title}>
                <TableCell> {book.title} </TableCell>
                <TableCell>{book.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={() => setFormVisible(true) }>Add a book</button>
    </div>
  );
};
export default BookList;
