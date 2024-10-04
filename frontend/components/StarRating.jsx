import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={`filled-${i}`} className="text-yellow-500">★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half" className="text-yellow-500">☆</span>);
  }

  for (let i = filledStars + (halfStar ? 1 : 0); i < totalStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-400">☆</span>);
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2">{rating.toFixed(2)}/5</span>
    </div>
  );
};

export default StarRating;
