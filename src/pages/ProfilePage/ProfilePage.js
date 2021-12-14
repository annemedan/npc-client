import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { useContext } from "react";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  console.log("user in profile page", user);

  return (
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
                  <button>Edit</button>
                </Link>

                <Link to={"/products/add"}>
                  <button>Add New Product</button>
                </Link>
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
      <div className="row2"></div>
    </div>
  );
}

export default ProfilePage;
