import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => onSearchChange('')}>✕</button>
        )}
      </div>
    </div>
  );
}
