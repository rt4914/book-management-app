const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const next = require('next');
const resolvers = require('./backend/graphql/resolvers');
const sequelize = require('./backend/config/postgresdb');
const typeDefs = require('./backend/graphql/typedefs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const startServer = async () => {
  await app.prepare();
  const server = express();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log('🚀 Combined server ready at http://localhost:3000');
  });

  await sequelize.sync();
};

startServer();
