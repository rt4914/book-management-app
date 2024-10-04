import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../utils/graphql';
import BookCard from './BookCard';
import Pagination from './Pagination';

const BookList = () => {
  const [page, setPage] = useState(0);
  const [bookData, setBookData] = useState(null);
  const pageSize = 2;
  const [filters, setFilters] = useState({ title: '', author_name: '' }); // New filters

  const { data, loading, error, fetchMore } = useQuery(GET_BOOKS, {
    variables: {
      limit: pageSize,
      afterPage: page,
      filter: filters,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      setBookData(data);
    }
  }, [data]);

  const handleNextPage = () => {
    if (bookData?.books?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          first: pageSize,
          after: page + 1,
          filter: filters,
        },
      }).then((fetchMoreResult) => {
        setBookData(fetchMoreResult.data);
        setPage((prevPage) => prevPage + 1);
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      fetchMore({
        variables: {
          first: pageSize,
          after: page - 1,
          filter: filters,
        },
      }).then((fetchMoreResult) => {
        setBookData(fetchMoreResult.data);
        setPage((prevPage) => prevPage - 1);
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading && !bookData) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalBooks = bookData?.books?.edges.length || 0;
  const showPagination = totalBooks > 0 && (page > 0 || bookData.books.pageInfo.hasNextPage);
  
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Books</h2>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="author_name"
          placeholder="Filter by Author Name"
          value={filters.author_name}
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookData?.books.edges.map((book) => (
          <BookCard key={book.node.id} book={book} />
        ))}
      </div>
      {showPagination && (
        <Pagination
          page={page}
          totalPages={bookData.books.pageInfo.totalPages}
          currentPage={bookData.books.pageInfo.currentPage}
          hasNextPage={bookData.books.pageInfo.hasNextPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
    </div>
  );
};

export default BookList;
