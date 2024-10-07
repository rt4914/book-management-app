import { ApolloClient, InMemoryCache } from '@apollo/client';

if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL environment variable is not set');
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
  cache: new InMemoryCache(),
});

export default client;
