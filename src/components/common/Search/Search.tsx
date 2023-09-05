import React from 'react';

import './Search.css';

const Search: React.FC = () => {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search..." />
    </div>
  );
};

export default Search;
