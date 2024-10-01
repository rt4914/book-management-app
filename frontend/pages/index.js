import { useState } from 'react';
import Header from '../components/Header';
import BookList from '../components/BookList';
import AuthorList from '@/components/AuthorList';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('books');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => handleTabChange('books')}
                className={`w-1/2 border-b-2 px-1 py-4 text-center text-sm font-medium ${
                  activeTab === 'books' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Books
              </button>
              <button
                onClick={() => handleTabChange('authors')}
                className={`w-1/2 border-b-2 px-1 py-4 text-center text-sm font-medium ${
                  activeTab === 'authors' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Authors
              </button>
            </nav>
          </div>
        </div>
      </div>      
      <div className="mt-4">
        {activeTab === 'books' ? <BookList /> : <AuthorList />}
      </div>
    </div>
  );
};

export default HomePage;
