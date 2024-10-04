import React from 'react';
import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <Link href={`/book?id=${book.node.id}`} passHref>
      <div className="p-4 rounded border border-primary hover:cursor-pointer hover:bg-background">
        <h3 className="font-bold text-lg">{book.node.title}</h3>
        <p>{book.node.description}</p>
        <p>
          Author: 
          {/* <Link href={`/author?id=${book.node.author.id}`} passHref>
            <span className='font-medium underline' onClick={e => e.stopPropagation()}>{book.node.author.name}</span>
          </Link> */}
        </p>
        <p>Published Date: {book.node.published_date}</p>
      </div>
    </Link>
  );
}

export default BookCard;
