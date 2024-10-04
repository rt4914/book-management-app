const connectionTypes = `#graphql
  type PageInfo {
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
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
