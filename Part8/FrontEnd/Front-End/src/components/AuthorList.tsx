import query from "../middleware/queries";
import { useQuery } from "@apollo/client";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export type Author = {
  name: string
  id: string
  bookCount: number
  born: number
}

const AuthorList = () => {
  // We get all authors from the cache
  const result = useQuery(query.ALL_AUTHORS);

  return (
    <div>
      <h1>Authors</h1>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Born</TableCell>
            <TableCell align="right">Books</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.data?.allAuthors.map((author: Author) => (
            <TableRow
              key={author.name}
            >
              <TableCell > {author.name} </TableCell>
              <TableCell >{author.born}</TableCell>
              <TableCell>{author.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>        
    </div>
  )
}

export default AuthorList;
