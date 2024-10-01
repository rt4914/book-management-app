const Review = require('../models/Review');

const reviewQuery = {
  reviews: async (_, { book_id }) => {
    try {
      return await Review.find({ book_id });
    } catch (error) {
      return [];
    }
  },
};

const reviewMutation = {
  createReview: async (_, { book_id, user, rating, comment }) => {
    try {
      const newReview = new Review({ book_id, user, rating, comment });
      return await newReview.save();
    } catch (error) {
      throw new Error('Error creating review');
    }
  },

  updateReview: async (_, { id, rating, comment }) => {
    try {
      const review = await Review.findById(id);
      if (!review) {
        throw new Error('Review not found');
      }
      review.rating = rating;
      review.comment = comment;
      return await review.save();
    } catch (error) {
      throw new Error('Error updating review');
    }
  },

  deleteReview: async (_, { id }) => {
    try {
      const review = await Review.findById(id);
      if (!review) {
        throw new Error('Review not found');
      }
      await review.remove();
      return "Review deleted.";
    } catch (error) {
      throw new Error('Error deleting review');
    }
  },
};

const reviewResolvers = {
  Query: reviewQuery,
  Mutation: reviewMutation,
};

module.exports = reviewResolvers;
