// SingleDataLoadingSkeleton.js
import React from 'react';
import './SingleDataLoadingSkeleton.css';

const SingleDataLoadingSkeleton = () => {
  return (
    <div className="single-data-loading-skeleton">
      <div className="loading-skeleton-header"></div>
      <div className="loading-skeleton-table"></div>
      <div className='pagination-skeleton'>
        <div className="loading-skeleton-pagination"></div>
      </div>
    </div>
  );
};

export default SingleDataLoadingSkeleton;
