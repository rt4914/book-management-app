import React from 'react'
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const AuthorCard = ({ author }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/author?id=${author.id}`);
  };

  const totalBooks = author.books?.length || 0

  return (
    <div key={author.id} className="p-4 rounded border border-primary hover:cursor-pointer hover:bg-background" onClick={handleClick}>
      <h3 className="font-bold text-lg">{author.name}</h3>
      <p className="text-sm text-gray-500">Total Books: {totalBooks}</p>
    </div>
  );
};

AuthorCard.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    biography: PropTypes.string,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        published_date: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default AuthorCard;
