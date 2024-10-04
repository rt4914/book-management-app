const { Op } = require('sequelize');
const Book = require('../models/Book');
const Author = require('../models/Author');

const bookQuery = {
  books: async (_, { limit = 10, afterPage = 0, filter }) => {
    const where = {};

    if (filter) {
      if (filter.title) {
        where.title = { [Op.like]: `%${filter.title}%` };
      }
      if (filter.published_date) {
        where.published_date = filter.published_date;
      }
      if (filter.author_id) {
        where.author_id = filter.author_id;
      }
    }

    const totalCount = await Book.count({ where });
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = afterPage + 1;

    const books = await Book.findAll({
      where,
      limit,
      offset: afterPage * limit,
    });

    const edges = books.map(book => ({
      cursor: book.id,
      node: book,
    }));

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      edges,
      pageInfo: {
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage
      },
    };
  },
  
  book: (_, { id }) => Book.findByPk(id),
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
