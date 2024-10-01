import React from 'react'
import { useRouter } from 'next/router';

const AuthorCard = ({ author }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/author?id=${author.id}`);
  };

  return (
    <div key={author.id} className="p-4 rounded border border-primary hover:cursor-pointer hover:bg-background" onClick={handleClick}>
      <h3 className="font-bold text-lg">{author.name}</h3>
      <p className="text-sm text-gray-500">ID: {author.id}</p>
    </div>
  );
};

export default AuthorCard;
