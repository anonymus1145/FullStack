import { GraphQLError } from "graphql";
import { v1 as uuid } from "uuid";
import jwt from "jsonwebtoken";


// We import the schemas
import Book from "./models/books.js";
import Author from "./models/authors.js";
import User from "./models/users.js";

import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub()


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // This resolver returns the books with the specified genre and author
    allBooks: async (root: any, args: { genre: string; author: string }) => {
      return Book.find(
        args.author
          ? { author: args.author }
          : args.genre
            ? { genres: args.genre }
            : {},
      );
    },
    allAuthors: async () => {
      return Author.find({});
    },
    findAuthor: async (root: any, args: { name: string }) => {
      return Author.findOne({ name: args.name });
    },
    me: (root: any, args: any, context: { currentUser: any }) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: (root: any) =>
      Book.collection.countDocuments({ author: root.name }),
  },
  Mutation: {
    addBook: async (root: any, args: any, context: { currentUser: any }) => {
      const book = new Book({ ...args, id: uuid() });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "BAD_USER_INPUT",
          }
        });
      }
      try {
        await book.save();
        currentUser.books = currentUser.books.concat(book);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },

    editAuthor: async (root: any, args: { name: string; born: number }) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new Error("Author not found");
      } else if (args.name.length < 3) {
        throw new Error("Name must be at least 3 characters long");
      }
      author.born = args.born;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing the author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    addAuthor: async (root: any, args: { name: string; born: number }) => {
      const author = new Author({ ...args, id: uuid() });
      if (args.name.length < 3) {
        throw new Error("Name must be at least 3 characters long");
      }
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving the author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    createUser: async (root: any, args: { username: string; favoriteGenre: string, books: [] }) => {
      const user = new User({ ...args, id: uuid() })
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Saving the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    login: async (root: any, args: { username: string; password: string }) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new Error("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};


export default resolvers;

