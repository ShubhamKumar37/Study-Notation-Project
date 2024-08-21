import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white">
      <h1 className="text-6xl font-bold mb-4 text-gray-200">404</h1>
      <p className="text-2xl mb-8 text-gray-400">Oops! The page you’re looking for isn’t available.</p>
      <div className="flex gap-4">
        <Link to="/">
          <button className="px-6 py-3 rounded-md font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors duration-200">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
