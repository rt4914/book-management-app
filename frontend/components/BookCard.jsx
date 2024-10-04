import React from 'react';
import Link from 'next/link';
import StarRating from './StarRating';

const BookCard = ({ book }) => {
  return (
    <div className="p-4 rounded border border-primary hover:bg-background">
      <h3 className="font-bold text-lg">{book.node.title}</h3>
      <p>{book.node.description}</p>
      <p>
        Author: 
        <Link href={`/author?id=${book.node.author.id}`} passHref>
          <span className='font-medium underline' onClick={e => e.stopPropagation()}>{book.node.author.name}</span>
        </Link>
      </p>
      <p>Published Date: {book.node.published_date}</p>
      {book.node.average_rating !== null && <StarRating rating={book.node.average_rating} /> }
      <Link href={`/book?id=${book.node.id}`} passHref>
      <span className='font-medium underline' onClick={e => e.stopPropagation()}>View Details</span>
      </Link>
    </div>
  );
}

export default BookCard;
