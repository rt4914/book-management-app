import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../utils/graphql';
import AuthorCard from './AuthorCard';
import Pagination from './Pagination';

const AuthorList = () => {
  const [page, setPage] = useState(0);
  const [authorData, setAuthorData] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const pageSize = 6;

  const { data, loading, error, fetchMore } = useQuery(GET_AUTHORS, {
    variables: {
      limit: pageSize,
      afterPage: page,
      filter: {
        name: nameFilter,
      },
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
          limit: pageSize,
          afterPage: page + 1,
          filter: {
            name: nameFilter,
          },
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
          limit: pageSize,
          afterPage: page - 1,
          filter: {
            name: nameFilter
          },
        },
      }).then((fetchMoreResult) => {
        setAuthorData(fetchMoreResult.data);
        setPage((prevPage) => prevPage - 1);
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNameFilter(value);
    }
    setPage(0);
  };

  if (loading && !authorData) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalAuthors = authorData?.authors?.edges.length || 0;
  const showPagination = totalAuthors > 0 && (page > 0 || authorData.authors.pageInfo.hasNextPage);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Authors</h2>
      
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded p-2 mr-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authorData?.authors.edges.map((author) => (
          <AuthorCard key={author.node.id} author={author.node} />
        ))}
      </div>

      {showPagination && (
        <Pagination 
          page={page} 
          totalPages={authorData.authors.pageInfo.totalPages} 
          currentPage={authorData.authors.pageInfo.currentPage}
          hasNextPage={authorData.authors.pageInfo.hasNextPage} 
          handleNextPage={handleNextPage} 
          handlePreviousPage={handlePreviousPage} 
        />
      )}
    </div>
  );
};

export default AuthorList;
