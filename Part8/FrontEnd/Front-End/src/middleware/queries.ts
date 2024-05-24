import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author
    published
    genres
    id
  }
`

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    favoriteGenre
    id
  }
`

// Query to create a new author
const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!, $born: Int!, $bookCount: Int!) {
    addAuthor(name: $name, born: $born, bookCount: $bookCount) {
     ...AuthorDetails 
    }
  }

  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  } # OR direct ${AUTHOR_DETAILS} 
`

// Query to register a users
const REGISTER_USER = gql`
  mutation createUser($username: String!, $favoriteGenre: String!, $books: [String]) {
    createUser(username: $username, favoriteGenre: $favoriteGenre, books: $books) {
      ...UserDetails 
    }
  }
  ${USER_DETAILS}
`;

// Query to find persons by name
const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      id
    }
  }
`;

// Query to find all authors
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

// Query to update the year of birth
const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

// Query to get all the books
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

// Query to add a newu book
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        ...AuthorDetails
      }
      published
      genres
      id
    }
  }
  ${AUTHOR_DETAILS}
`;

// Query to login
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

//  Subscriptions
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export default {
  CREATE_AUTHOR,
  FIND_AUTHOR,
  ALL_AUTHORS,
  UPDATE_BIRTHYEAR,
  ALL_BOOKS,
  ADD_BOOK,
  LOGIN,
  BOOK_ADDED,
  REGISTER_USER
}
