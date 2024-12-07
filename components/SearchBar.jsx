import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    try {
      e.preventDefault(); // Prevent default form behavior
      const sanitizedQuery = query.trim().toLowerCase();
      
      console.log("Search Query:", sanitizedQuery);

      if (sanitizedQuery) {
        // Trigger the parent handleSearch function
        onSearch(sanitizedQuery);
      } else {
        console.log("Please enter a valid search query.");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products or brands"
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
