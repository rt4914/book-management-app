const reviewTypes = `#graphql
  type Review {
    id: ID!
    book_id: ID!
    user: String!
    rating: Int!
    comment: String
    created_at: String!
  }
`;

module.exports = reviewTypes;
