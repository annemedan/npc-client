import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [thisProfile, setThisProfile] = useState(undefined);

  useEffect(() => {
    const getProfileUser = async () => {
      const response = await axios.get(`${serverUrl}/users`);
      const allUsers = response.data;

      const findingProfileUser = (eachUser) => {
        if (user && eachUser._id === user._id) {
          return true;
        } else {
          return false;
        }
      };

      const profileUser = allUsers.filter(findingProfileUser);
      console.log("profileUser");

      setThisProfile(profileUser);
    };

    getProfileUser();
  }, []);

  console.log("thisprofile", thisProfile);

  return (
    user && (
      <div className="regular-bg">
        <div className="row1">
          <div className="col-md-6 row1-flex">
            <div className="top-profile">
              <img
                className="row1-image"
                src={user.image}
                alt="user profile pic"
              />
            </div>
            <div className="row1-text">
              {user.isStore ? (
                <>
                  <h1>{user.storeName}</h1>
                  <h3>Store</h3>
                  <p>Bio: {user.bio}</p>

                  <Link to={"/profile/edit"}>
                    <button>Edit Profile</button>
                  </Link>

                  <Link to={"/products/add"}>
                    <button>Add New Product</button>
                  </Link>

                  {thisProfile && (
                    <div className="profile-products collection">
                      {thisProfile[0].productItems.length !== 0 ? (
                        thisProfile[0].productItems.map((item, index) => {
                          return (
                            <div
                              key={item._id}
                              className="product-card product"
                            >
                              <Link to={`/products/${item._id}`}>
                                <img
                                  src={item.productImage}
                                  width="50px"
                                  height="50px"
                                  className="product__image"
                                  alt={item.name}
                                />
                              </Link>
                              <div>
                                <span>
                                  <h5 className="product__name">{item.name}</h5>
                                  <Link to={`/products/${item._id}`}>
                                    View details
                                  </Link>
                                </span>
                                <p className="product__price">{item.price}€</p>

                                <button className="button-profile">
                                  {" "}
                                  <Link to={`/products/${item._id}/edit`}>
                                    {" "}
                                    Edit/Delete Item{" "}
                                  </Link>{" "}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div> There are no products for this store! </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1>{`${user.firstName} ${user.lastName}`}</h1>
                  <h3>Client</h3>

                  <Link to={"/profile/edit"}>
                    <button>Edit</button>{" "}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
