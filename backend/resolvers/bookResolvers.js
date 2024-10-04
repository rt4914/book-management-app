const { Op } = require('sequelize');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Review = require('../models/Review');

const bookQuery = {
  books: async (_, { limit = 10, afterPage = 0, filter }) => {
    const where = {};
    const authorWhere = {};

    if (filter) {
      if (filter.title) {
        where.title = { [Op.iLike]: `%${filter.title}%` };
      }
      if (filter.author_name) {
        authorWhere.name = { [Op.iLike]: `%${filter.author_name}%` };
      }
    }

    const totalCount = await Book.count({
      where,
      include: [{
        model: Author,
        where: authorWhere,
        required: false,
      }],
    });

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = afterPage + 1;

    const books = await Book.findAll({
      where,
      limit,
      offset: afterPage * limit,
      include: [{
        model: Author,
        attributes: ['id', 'name'],
        where: authorWhere,
        required: false,
      }],
    });

    const booksWithReviews = await Promise.all(books.map(async (book) => {
      const reviews = await Review.find({ book_id: book.id });

      const average_rating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : null;

      return {
        cursor: book.id,
        node: {
          ...book.toJSON(),
          author: {
            id: book.Author.id,
            name: book.Author.name,
          },
          reviews,
          average_rating,
        },
      };
    }));

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      edges: booksWithReviews,
      pageInfo: {
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      },
    };
  },

  book: async (_, { id }) => {
    const book = await Book.findByPk(id, {
      include: [{
        model: Author,
        attributes: ['id', 'name'],
      }],
    });
  
    if (!book) {
      throw new Error('Book not found');
    }
  
    const reviews = await Review.find({ book_id: book.id });

    const average_rating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : null;

    return {
      ...book.toJSON(),
      author: {
        id: book.Author.id,
        name: book.Author.name,
      },
      reviews,
      average_rating,
    };
  },
};

const bookMutation = {
  createBook: async (_, { title, description, published_date, author_id }) => {
    return await Book.create({ title, description, published_date, author_id });
  },

  updateBook: async (_, { id, title, description, published_date, author_id }) => {
    const book = await Book.findByPk(id);
    if (book) {
      await book.update({ title, description, published_date, author_id });
      return book;
    } else {
      throw new Error('Book not found');
    }
  },

  deleteBook: async (_, { id }) => {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      return "Book deleted.";
    }
    return "Book not found.";
  },
};

const bookResolvers = {
  Query: bookQuery,
  Mutation: bookMutation,
};

module.exports = bookResolvers;
