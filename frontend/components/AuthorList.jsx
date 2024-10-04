import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../utils/graphql';
import AuthorCard from './AuthorCard';
import Pagination from './Pagination';

const AuthorList = () => {
  const [page, setPage] = useState(0);
  const [authorData, setAuthorData] = useState(null);
  const pageSize = 2;

  const { data, loading, error, fetchMore } = useQuery(GET_AUTHORS, {
    variables: {
      first: pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      setAuthorData(data);
    }
  }, [data]);

  const handleNextPage = () => {
    if (authorData?.authors?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          first: pageSize,
          after: authorData.authors.pageInfo.endCursor,
        },
      }).then((fetchMoreResult) => {
        setAuthorData(fetchMoreResult.data);
        setPage((prevPage) => prevPage + 1);
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      fetchMore({
        variables: {
          first: pageSize,
          after: authorData.authors.pageInfo.startCursor,
        },
      }).then((fetchMoreResult) => {
        setAuthorData(fetchMoreResult.data);
        setPage((prevPage) => prevPage - 1);
      });
    }
  };

  if (loading && !authorData) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalAuthors = authorData?.authors?.edges.length || 0;
  const showPagination = totalAuthors > 0 && (page > 0 || authorData.authors.pageInfo.hasNextPage);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Authors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authorData?.authors.edges.map((author) => (
          <AuthorCard key={author.node.id} author={author.node} />
        ))}
      </div>
      {showPagination && (
        <Pagination 
          page={page} 
          hasNextPage={authorData.authors.pageInfo.hasNextPage} 
          handleNextPage={handleNextPage} 
          handlePreviousPage={handlePreviousPage} 
        />
      )}
    </div>
  );
};

export default AuthorList;
