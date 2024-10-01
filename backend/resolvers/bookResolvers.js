const { Op } = require('sequelize');
const Book = require('../models/Book');
const Author = require('../models/Author');

const bookQuery = {
  books: async (_, { first = 10, after, filter }) => {
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

    const books = await Book.findAll({
      where,
      limit: first,
      ...(after ? {
        where: { id: { [Op.gt]: after }, ...where },
      } : {}),
    });

    const edges = books.map(book => ({
      cursor: book.id,
      node: book,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: books.length === first,
        hasPreviousPage: !!after,
        startCursor: edges.length ? edges[0].cursor : null,
        endCursor: edges.length ? edges[edges.length - 1].cursor : null,
      },
    };
  },
  book: (_, { id }) => Book.findByPk(id, { include: Author }),
}

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
}

const bookResolvers = {
  Query: bookQuery,
  Mutation: bookMutation
};

module.exports = bookResolvers;
