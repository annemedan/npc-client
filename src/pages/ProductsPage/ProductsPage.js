import { useState, useEffect } from "react";
import SearchBar from "../../components/Search/Search.js";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [users, setUsers] = useState("");
  const [products, setProducts] = useState("");

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
      //console.log(storeUsers);

      setUsers(storeUsers);
    };

    getAllUsers();
  }, []);

  //   const searchFilter = (chars) => {
  //     const filteredProducts = users.filter((product) => {
  //       const items = product.productItems.name
  //         .toLowercase()
  //         .includes(chars.toLowerCase());

  //       console.log(
  //         "items",
  //         items
  //         // .includes(chars.toLowerCase())
  //       );
  //     });

  //     setProducts(filteredProducts);
  //   };

  return (
    <div className="products-list">
      <div className="products-list-filters">
        {/* <SearchBar searchFilter={searchFilter} /> */}
        <h4>All products available</h4>
      </div>

      <div className="products-list-container"></div>

      <div>
        {users.length !== 0 ? (
          users.map((eachUser) => {
            return eachUser.productItems ? (
              <div className="products-store">
                <img
                  src={eachUser.image}
                  alt="profile img"
                  className="store-image-products"
                />
                <h2>{eachUser.storeName}</h2>
                <div className="each-item">
                  {eachUser.productItems.map((item, index) => {
                    return (
                      <div key={item._id} className="product-card">
                        <Link to={`/products/${item._id}`}>
                          <img
                            src={item.productImage}
                            width="50px"
                            height="50px"
                            className="product-card-img"
                            alt={item.name}
                          />
                        </Link>
                        <div className="product-card-text">
                          <span>
                            <h5>{item.name}</h5>
                            <Link to={`/products/${item._id}`}>
                              View details
                            </Link>
                          </span>
                          <p>{item.price}€</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <p>No products to display</p>
              </div>
            );
          })
        ) : (
          <p> Nothing here - false </p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
