const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/postgresdb.js');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { connectToMongoDB } = require('./config/mongodb');
require('dotenv').config();

const startServer = async () => {
  await connectToMongoDB();

  const app = express();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await sequelize.sync();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT);
};

startServer().catch(err => {
  console.error('Error starting server:', err);
});
