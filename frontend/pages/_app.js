import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css'; // Only import once
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import React from 'react';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Book Store</title>
      </Head>
      <ApolloProvider client={client}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
