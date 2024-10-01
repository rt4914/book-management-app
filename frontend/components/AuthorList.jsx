import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../utils/graphql';
import AuthorCard from './AuthorCard';
import Pagination from './Pagination';

const AuthorList = () => {
  const [page, setPage] = useState(0);
  const [authorEdges, setAuthorEdges] = useState([]);
  const pageSize = 3;

  const { data, loading, error, fetchMore } = useQuery(GET_AUTHORS, {
    variables: {
      first: pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      setAuthorEdges(data.authors.edges);
    }
  }, [data]);

  const handleNextPage = () => {
    if (data?.authors?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          first: pageSize,
          after: data?.authors?.pageInfo?.endCursor,
        },
      }).then((fetchMoreResult) => {
        setAuthorEdges(fetchMoreResult?.data?.authors?.edges);
        setPage((prevPage) => prevPage + 1);
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      fetchMore({
        variables: {
          first: pageSize,
          after: data?.authors?.pageInfo?.startCursor, 
        },
      }).then((fetchMoreResult) => {
        setAuthorEdges(fetchMoreResult?.data?.authors?.edges);
        setPage((prevPage) => prevPage - 1);
      });
    }
  };

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Authors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authorEdges.map((author) => (
          <AuthorCard key={author.node.id} author={author.node} />
        ))}
      </div>
      { authorEdges && authorEdges.length >= pageSize  && 
        <Pagination 
          page={page} 
          hasNextPage={data.authors.pageInfo.hasNextPage} 
          handleNextPage={handleNextPage} 
          handlePreviousPage={handlePreviousPage} 
        />
      }
    </div>
  );
};

export default AuthorList;
