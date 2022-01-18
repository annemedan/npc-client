import { useState } from "react";

function SearchBar({ searchFilter }) {
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };

  return (
    <div class="input-group">
      <form id="form" action="/products/search" method="GET">
        <input
          class="form-control rounded"
          placeholder="Search item"
          name="q"
          type="search"
          aria-label="Search"
          size="70%"
        />
        <button
          onChange={handleSearchInput}
          type="submit"
          class="btn btn-outline-primary btn-search"
        >
          Search
        </button>
      </form>
    </div>

    // <input
    //   className="form-control w-50 me-4"
    //   type="text"
    //   placeholder="Search for a product"
    //   onChange={handleSearchInput}
    // />
  );
}

export default SearchBar;
