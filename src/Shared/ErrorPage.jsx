import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-red-500 mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
