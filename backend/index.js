const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/postgresdb.js');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { connectToMongoDB }= require('./config/mongodb');

const startServer = async () => {
  await connectToMongoDB();
  
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Backend: http://localhost:4000${apolloServer.graphqlPath}`);
  });

  await sequelize.sync();
};

startServer();
