const inputTypes = `#graphql
  input BookFilterInput {
    title: String
    published_date: String
    author_id: ID
  }

  input AuthorFilterInput {
    name: String
    born_date: String
  }
`;

module.exports = inputTypes;
