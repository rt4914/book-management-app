const bookResolvers = require('./bookResolvers');
const authorResolvers = require('./authorResolvers');
const reviewResolvers = require('./reviewResolvers');

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    ...authorResolvers.Query,
    ...reviewResolvers.Query,

  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...authorResolvers.Mutation,
    ...reviewResolvers.Mutation,
  },
};

module.exports = resolvers;
