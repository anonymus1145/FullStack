// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
   bookCount: Int!
   authorCount: Int!
   allBooks(genre: String, author: String): [Book!]!
   allAuthors: [Author!]!
   findAuthor(name: String): Author
   me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(name: String!, born: Int!): Author
    addAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!, books: [String]): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

export default typeDefs;
