const bookTypes = require('./bookTypes');
const authorTypes = require('./authorTypes');
const reviewTypes = require('./reviewTypes');
const connectionTypes = require('./connectionTypes');
const inputTypes = require('./inputTypes');

const typeDefs = `#graphql
  type Query {
    books(limit: Int, afterPage: Int, filter: BookFilterInput): BookConnection
    authors(limit: Int, afterPage: Int, filter: AuthorFilterInput): AuthorConnection
    book(id: ID!): Book
    author(id: ID!): Author
    reviews(book_id: ID!): [Review]
  }

  type Mutation {
    createBook(title: String!, description: String, published_date: String!, author_id: ID!): Book
    updateBook(id: ID!, title: String, description: String, published_date: String, author_id: ID): Book
    deleteBook(id: ID!): String
    createAuthor(name: String!, biography: String, born_date: String!): Author
    updateAuthor(id: ID!, name: String, biography: String, born_date: String): Author
    deleteAuthor(id: ID!): String
    createReview(book_id: ID!, user: String!, rating: Int!, comment: String): Review
    updateReview(id: ID!, rating: Int!, comment: String): Review
    deleteReview(id: ID!): String
  }
`;

module.exports = [
  typeDefs,
  bookTypes,
  authorTypes,
  reviewTypes,
  connectionTypes,
  inputTypes,
];
