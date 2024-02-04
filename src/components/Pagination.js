import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
      >
        Previous Page
      </button>
      <span className="text-xl">
        Page {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md"
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
