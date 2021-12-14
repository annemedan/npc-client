import { Input } from "antd";
import React from "react";

function Search({ searchInput, searchUserFilter }) {
  const handleSearch = (e) => searchUserFilter(e.target.value);

  return (
    <div className="search-div">
      <Input
        type="text"
        placeholder="Search for a product"
        value={searchInput}
        onInput={handleSearch}
      />
    </div>
  );
}

export default Search;
