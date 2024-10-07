import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, hasNextPage, handleNextPage, handlePreviousPage }) => {
  return (
    <div className="flex gap-8 mt-8">
      <button 
        onClick={handlePreviousPage} 
        disabled={currentPage === 1} 
        className={`p-2 text-white rounded ${currentPage > 1 ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <span className="self-center">Page {currentPage} of {totalPages}</span>
      <button 
        onClick={handleNextPage} 
        disabled={!hasNextPage} 
        className={`p-2 text-white rounded ${hasNextPage ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
};

export default Pagination;
