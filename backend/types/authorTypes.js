const authorTypes = `#graphql
  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String!
    books: [Book]
  }
`;

module.exports = authorTypes;
