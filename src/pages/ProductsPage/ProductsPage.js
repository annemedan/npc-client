import { useState, useEffect } from "react";
import Search from "./Search.js";
import axios from "axios";

function ProductsPage() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("search-bar");
  const [searchInput, searchUserFilter] = useState(query || "");
  const [usersSellers, setUsersSellers] = useState("");

  async function getAllUsers() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users`
    );
    const allUsers = response.data;

    console.log("allUsers", allUsers);

    function getStores(obj) {
      if (obj.isStore === true) {
        return true;
      } else {
        return false;
      }
    }

    const storeUsers = allUsers.filter(getStores);
    console.log(storeUsers);

    // setUsers(storeUsers);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="products-list">
      <div className="products-list-filters">
        <Search searchInput={searchInput} searchUserFilter={searchUserFilter} />

        <h4>All products available</h4>
      </div>

      <div className="products-list-container">Add products here</div>
    </div>
  );
}

export default ProductsPage;
