const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/postgresdb.js');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { connectToMongoDB } = require('./config/mongodb');
require('dotenv').config();

const startServer = async () => {
  await connectToMongoDB();

  const app = express();

  const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await sequelize.sync();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Backend: ${process.env.BASE_URL || `http://localhost:${PORT}`}${apolloServer.graphqlPath}`);
  });
};

startServer().catch(err => {
  console.error('Error starting server:', err);
});
