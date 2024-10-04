const { Op } = require('sequelize');
const Author = require('../models/Author');

const authorQuery = {
  authors: async (_, { limit = 10, afterPage = 0, filter }) => {
    console.log("limit:", limit)
    console.log("afterPage:", afterPage)
    const where = {};
  
    if (filter) {
      if (filter.name) {
        where.name = { [Op.like]: `%${filter.name}%` };
      }
      if (filter.born_date) {
        where.born_date = filter.born_date;
      }
    }
  
    const totalCount = await Author.count({ where });
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = afterPage + 1;
  
    const authors = await Author.findAll({
      where,
      limit,
      offset: afterPage * limit,
    });
  
    const edges = authors.map(author => ({
      cursor: author.id,
      node: author,
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
  author: (_, { id }) => Author.findByPk(id),
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
