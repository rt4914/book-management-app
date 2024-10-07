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

    const authors = await Author.findAll({
      where: authorWhere,
      attributes: ['id'],
    });

    const authorIds = authors.map(author => author.id);

    if (filter && filter.author_name && authorIds.length === 0) {
      return {
        edges: [],
        pageInfo: {
          totalPages: 0,
          currentPage: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    const totalCount = await Book.count({
      where,
      include: [{
        model: Author,
        where: {
          ...(authorIds.length > 0 && { id: { [Op.in]: authorIds } }),
        },
        required: true,
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
        where: {
          ...(authorIds.length > 0 && { id: { [Op.in]: authorIds } }),
        },
        required: true,
      }],
    });

    const booksWithReviews = await Promise.all(books.map(async (book) => {
      const reviews = await Review.find({ book_id: book.id });

      const average_rating = reviews.length > 0 
        ? parseFloat((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(2)) 
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
      ? parseFloat((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(2)) 
      : null;

    return {
      ...book.toJSON(),
      author: book.Author ? {
        id: book.Author.id,
        name: book.Author.name,
      } : null,
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
