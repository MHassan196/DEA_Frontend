import React from 'react';
import './LoadingSkeleton.css'

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton-container">
      <div className="loading-skeleton-lines skeleton"></div>
      <div className="loading-skeleton-lines skeleton"></div>
      <div className="loading-skeleton-lines skeleton"></div>
      <div className="loading-skeleton-lines skeleton"></div>
      {/* Add more lines as needed */}
    </div>
  );
};

export default LoadingSkeleton;