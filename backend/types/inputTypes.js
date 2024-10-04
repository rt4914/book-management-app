const inputTypes = `#graphql
  input BookFilterInput {
    title: String
    author_name: String
  }

  input AuthorFilterInput {
    name: String
  }
`;

module.exports = inputTypes;
