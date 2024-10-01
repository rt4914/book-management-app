import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../utils/graphql';
import BookCard from './BookCard';

const BookList = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.books.edges.map((book) => (
          <BookCard key={book.node.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
