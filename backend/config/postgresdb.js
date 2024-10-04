const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/postgresdb.js');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { connectToMongoDB }= require('./config/mongodb');

const startServer = async () => {
  try {
    await connectToMongoDB();

    const app = express();

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () => {
      console.log(`Backend running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });

    // Sync Postgres DB
    await sequelize.sync();
    console.log('Postgres connected and synchronized');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);  // Exit the process on error
  }
};

startServer();
