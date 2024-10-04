const bookTypes = `#graphql
  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String!
    author: Author
    reviews: [Review!]
    average_rating: Float
  }
`;

module.exports = bookTypes;
