import React from 'react'
import { useRouter } from 'next/router';

const BookCard = ({book}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/book?id=${book.node.id}`);
  };

  return (
    <div key={book.node.id} className="p-4 rounded border border-primary hover:cursor-pointer hover:bg-background" onClick={handleClick}>
      <h3 className="font-bold text-lg">{book.node.title}</h3>
      <p>{book.node.description}</p>
      <p>Author ID: {book.node.author_id}</p>
      <p>Published Date: {book.node.published_date}</p>
    </div>
  )
}

export default BookCard
