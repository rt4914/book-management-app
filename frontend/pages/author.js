import { CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR, GET_AUTHOR } from '../utils/graphql';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Button, { ButtonTypes } from '@/components/Button';
import Header from '../components/Header';
import Input from '@/components/Input';
import Link from 'next/link';
import Title from '@/components/Title';

const Author = () => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [bornDate, setBornDate] = useState('');

  const router = useRouter();
  const { id } = router.query;

  const { data, loading: authorLoading } = useQuery(GET_AUTHOR, {
    variables: { id },
    skip: !id,
  });

  const [createAuthor, { loading: createLoading, error: createError }] = useMutation(CREATE_AUTHOR, {
    onCompleted: () => {
      toast.success("Author Created!");
      router.push('/');
    },
  });

  const [updateAuthor, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_AUTHOR, {
    onCompleted: () => {
      toast.success("Author Updated!");
      router.push('/');
    },
  });

  const [deleteAuthor, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_AUTHOR, {
    onCompleted: () => {
      toast.success("Author Deleted!");
      router.push('/');
    },
  });

  useEffect(() => {
    if (data?.author) {
      setName(data.author.name || '');
      setBiography(data.author.biography || '');
      setBornDate(data.author.born_date || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAuthor({
          variables: {
            id,
            name,
            biography,
            born_date: bornDate,
          },
        });
      } else {
        await createAuthor({
          variables: {
            name,
            biography,
            born_date: bornDate,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthor({ variables: { id } });
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (authorLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-16">
        <div>
          <Title>{id ? 'Edit Author' : 'Add Author'}</Title>

          <form onSubmit={handleSubmit}>
            <Input 
              id="name"
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input 
              id="biography" 
              label="Biography" 
              placeholder="Author Biography" 
              value={biography} 
              onChange={(e) => setBiography(e.target.value)} 
              isTextArea={true} 
            />

            <Input 
              id="bornDate" 
              label="Born Date" 
              value={bornDate} 
              onChange={(e) => setBornDate(e.target.value)} 
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />

            <div className="flex items-center justify-between">
              <Button
                type="submit"
                disabled={createLoading || updateLoading}
              >
                {id ? (updateLoading ? 'Updating Author...' : 'Update Author') : (createLoading ? 'Adding Author...' : 'Add Author')}
              </Button>

              {id && (
                <Button
                  type="button"
                  onClick={handleDelete}
                  buttonType={ButtonTypes.DELETE}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting Author...' : 'Delete Author'}
                </Button>
              )}
            </div>

            {(createError || updateError || deleteError) && <p className="text-red-500 mt-4">{createError?.message || updateError?.message || deleteError?.message}</p>}
          </form>

          {data?.author?.books && data.author.books.length > 0 && (
            <div className="mt-8 border-t pt-8">
              <Title>Books by {data.author.name}</Title>
              <ul className="list-disc ml-5 mt-2">
                {data.author.books.map(book => (
                  <Link key={book.id} href={`/book?id=${book.id}`}>
                    <li className='underline'>
                      {book.title} (Published on: {book.published_date})
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;
