import { useState, useEffect } from "react";
import Search from "./Search.js";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("search-bar");
  const [searchInput, searchUserFilter] = useState(query || "");
  const [users, setUsers] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users`
      );
      const allUsers = response.data;

      //console.log("allUsers", allUsers);

      const getStores = (obj) => {
        if (obj.isStore === true) {
          return true;
        } else {
          return false;
        }
      };

      const storeUsers = allUsers.filter(getStores);
      console.log(storeUsers);

      setUsers(storeUsers);
    };

    getAllUsers();
  }, []);

  return (
    <div1 className="products-list">
      <div2 className="products-list-filters">
        <Search searchInput={searchInput} searchUserFilter={searchUserFilter} />

        <h4>All products available</h4>
      </div2>

      <div3 className="products-list-container"></div3>

      <div4>
        {users.length !== 0 ? (
          users.map((eachUser) => {
            return eachUser.productItems ? (
              <div5 className="products-store">
                <img
                  src={eachUser.image}
                  alt="profile img"
                  className="store-image-products"
                />
                <h2>{eachUser.storeName}</h2>
                <div className="each-item">
                  {eachUser.productItems.map((item) => {
                    return item.quantity_available;
                  })}
                </div>
              </div5>
            ) : (
              <>
                <p>Nothing to Show</p>
              </>
            );
          })
        ) : (
          <p> Nothing here - false </p>
        )}
      </div4>
    </div1>
  );
}

export default ProductsPage;
