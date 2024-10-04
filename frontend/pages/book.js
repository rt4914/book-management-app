import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK, GET_BOOK, GET_AUTHORS, GET_REVIEWS, CREATE_REVIEW } from '../utils/graphql';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Title from '@/components/Title';
import Button, { ButtonTypes } from '@/components/Button';
import Input from '@/components/Input';
import { toast } from 'react-toastify';

const Book = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [description, setDescription] = useState('');
  const [averageRating, setAverageRating] = useState(0.0);
  const [publishedDate, setPublishedDate] = useState('');
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const { data: authorsData, loading: authorsLoading } = useQuery(GET_AUTHORS);
  const { data: bookData, loading: bookLoading } = useQuery(GET_BOOK, {
    variables: { id },
    skip: !id,
  });

  const { data: reviewsData } = useQuery(GET_REVIEWS, {
    variables: { book_id: id },
    skip: !id,
  });

  const [createBook, { loading: createLoading, error: createError }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      toast.success("Book added successfully!");
      router.push('/');
    },
    onError: (error) => {
      toast.error(`Error adding book: ${error.message}`);
    }
  });

  const [updateBook, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      toast.success("Book updated successfully!");
      router.push('/');
    },
    onError: (error) => {
      toast.error(`Error updating book: ${error.message}`);
    }
  });

  const [deleteBook, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      toast.success("Book deleted successfully!");
      router.push('/');
    },
    onError: (error) => {
      toast.error(`Error deleting book: ${error.message}`);
    }
  });

  const [createReview, { loading: reviewLoading, error: reviewError }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      toast.success("Review added successfully!");
      setUser('');
      setRating(1);
      setComment('');
    },
    onError: (error) => {
      toast.error(`Error adding review: ${error.message}`);
    }
  });

  useEffect(() => {
    if (bookData?.book) {
      setTitle(bookData.book.title || '');
      setAverageRating(bookData.book.average_rating || 0.0);
      setAuthorId(bookData.book.author.id || '');
      setDescription(bookData.book.description || '');
      setPublishedDate(bookData.book.published_date || '');
    }

    if (reviewsData) {
      setReviews(reviewsData.reviews);
    }
  }, [bookData, reviewsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook({
          variables: {
            id,
            title,
            author_id: authorId,
            description,
            published_date: publishedDate,
          },
        });
      } else {
        await createBook({
          variables: {
            title,
            author_id: authorId,
            description,
            published_date: publishedDate,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook({
          variables: { id },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        variables: {
          book_id: id,
          user,
          rating,
          comment,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (bookLoading || authorsLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-16">
        <div>
          <Title>{id ? 'Edit Book' : 'Add a New Book'}</Title>

          <form onSubmit={handleSubmit}>
            <Input 
              id="title" 
              label="Title" 
              placeholder="Book Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorId">
                Author
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="authorId"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                required
              >
                <option value="">Select Author</option>
                {authorsData?.authors?.edges?.map((author) => (
                  <option key={author.node.id} value={author.node.id}>
                    {author.node.name}
                  </option>
                ))}
              </select>
            </div>

            <Input 
              id="description" 
              label="Description" 
              placeholder="Book Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              isTextArea={true} 
            />

            <Input 
              id="publishedDate" 
              label="Published Date" 
              value={publishedDate} 
              onChange={(e) => setPublishedDate(e.target.value)} 
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />

            <div className="flex items-center justify-between">
              <Button
                type="submit"
                disabled={createLoading || updateLoading}
              >
                {id ? (updateLoading ? 'Updating Book...' : 'Update Book') : (createLoading ? 'Adding Book...' : 'Add Book')}
              </Button>

              {id && (
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  buttonType={ButtonTypes.DELETE}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Book'}
                </Button>
              )}
            </div>

            {(createError || updateError || deleteError) && (
              <p className="text-red-500 mt-4">{createError?.message || updateError?.message || deleteError?.message}</p>
            )}
          </form>
          {id &&
            <div className="mt-8 pt-8 border-t-2">
              <Title>Reviews ({averageRating}/5)</Title>
              {reviews.length > 0 ? (
                <ul>
                  {reviews.map(review => (
                    <li key={review.id} className="border p-4 mb-2 rounded">
                      <p><strong>{review.user}</strong> ({review.rating} stars)</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
              <div className='mt-8 pt-8 border-t-2'>
                <Title>Add a review</Title>
                <form onSubmit={handleReviewSubmit}>
                  <Input 
                    id="user" 
                    label="Your Name" 
                    placeholder="Your Name" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                  />
                  <Input 
                    id="rating" 
                    label="Rating" 
                    type="number" 
                    min="1" 
                    max="5" 
                    value={rating} 
                    onChange={(e) => setRating(parseInt(e.target.value))} 
                  />
                  <Input 
                    id="comment" 
                    label="Comment" 
                    placeholder="Your Review" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    isTextArea={true} 
                  />
                  <Button type="submit" disabled={reviewLoading}>
                    {reviewLoading ? 'Adding Review...' : 'Add Review'}
                  </Button>
                  {reviewError && <p className="text-red-500 mt-4">{reviewError.message}</p>}
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Book;
