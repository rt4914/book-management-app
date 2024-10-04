const bookTypes = `#graphql
  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String!
    author_id: String!
  }
`;

module.exports = bookTypes;
