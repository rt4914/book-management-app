const bookTypes = `#graphql
  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String!
    author: Author
  }
`;

module.exports = bookTypes;
