const { Op } = require('sequelize');
const Author = require('../models/Author');
const Book = require('../models/Book');

const authorQuery = {
  authors: async (_, { limit = 10, afterPage = 0, filter }) => {
    const where = {};

    if (filter) {
      if (filter.name) {
        where.name = { [Op.iLike]: `%${filter.name}%` };
      }
    }

    const totalCount = await Author.count({ where });
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = afterPage + 1;

    const authors = await Author.findAll({
      where,
      limit,
      offset: afterPage * limit,
      include: [{
        model: Book,
        attributes: ['id', 'title', 'published_date'],
      }],
    });

    const edges = authors.map(author => ({
      cursor: author.id,
      node: {
        ...author.toJSON(),
        books: author.Books.map(book => ({
          id: book.id,
          title: book.title,
          published_date: book.published_date,
        })),
      },
    }));

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      edges,
      pageInfo: {
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      },
    };
  },

  author: async (_, { id }) => {
    const author = await Author.findByPk(id, {
      include: [{
        model: Book,
        attributes: ['id', 'title', 'published_date'],
      }],
    });
  
    if (!author) {
      throw new Error('Author not found');
    }
  
    return {
      ...author.toJSON(),
      books: author.Books,
    };
  },
};

const authorMutation = {
  createAuthor: async (_, { name, biography, born_date }) => {
    return await Author.create({ name, biography, born_date });
  },

  updateAuthor: async (_, { id, name, biography, born_date }) => {
    const author = await Author.findByPk(id);
    if (author) {
      await author.update({ name, biography, born_date });
      return author;
    } else {
      throw new Error('Author not found');
    }
  },

  deleteAuthor: async (_, { id }) => {
    const author = await Author.findByPk(id);
    if (author) {
      await author.destroy();
      return "Author deleted.";
    }
    return "Author not found."; 
  },
};

const authorResolvers = {
  Query: authorQuery,
  Mutation: authorMutation,
};

module.exports = authorResolvers;
