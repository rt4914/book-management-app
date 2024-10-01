const connectionTypes = `#graphql
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type BookConnection {
    edges: [BookEdge]
    pageInfo: PageInfo
  }

  type BookEdge {
    cursor: String!
    node: Book!
  }

  type AuthorConnection {
    edges: [AuthorEdge]
    pageInfo: PageInfo
  }
  
  type AuthorEdge {
    cursor: String!
    node: Author!
  }
`;

module.exports = connectionTypes;
