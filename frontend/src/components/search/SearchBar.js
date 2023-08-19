import React from 'react';

const SearchBar = () => {
  return (
  
<form className='px-10 pt-3'>
  <div className="flex">
    <div className="relative w-full">
      <input
        type="search"
        id=""
        className="block p-5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg border-gray-300 border border-l-2 border-tl-rounded focus:ring-blue-500 focus:border-black dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search"
        required
        style={{ borderColor: 'gray' }}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-3 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-20 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>

  );
};

export default SearchBar;
