import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $afterPage: Int, $filter: BookFilterInput) {
    books(limit: $limit, afterPage: $afterPage, filter: $filter) {
      edges {
        cursor
        node {
          id
          title
          description
          published_date
          author_id
        }
      }
      pageInfo {
        totalPages
        currentPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $afterPage: Int, $filter: AuthorFilterInput) {
    authors(limit: $limit, afterPage: $afterPage, filter: $filter) {
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        totalPages
        currentPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($book_id: ID!) {
    reviews(book_id: $book_id) {
      id
      book_id
      user
      rating
      comment
      created_at
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author_id 
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      biography
      born_date
      books {
        id
        title
      }
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $description: String, $published_date: String!, $author_id: ID!) {
    createBook(title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
      description
      published_date
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $description: String, $published_date: String, $author_id: ID) {
    updateBook(id: $id, title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
      description
      published_date
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $biography: String, $born_date: String!) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String, $biography: String, $born_date: String) {
    updateAuthor(id: $id, name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($book_id: ID!, $user: String!, $rating: Int!, $comment: String) {
    createReview(book_id: $book_id, user: $user, rating: $rating, comment: $comment) {
      id
      book_id
      user
      rating
      comment
      created_at
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $rating: Int!, $comment: String) {
    updateReview(id: $id, rating: $rating, comment: $comment) {
      id
      book_id
      user
      rating
      comment
      created_at
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
