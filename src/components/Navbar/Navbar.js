import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import cartPic from "./—Pngtree—flat shopping cart png download_4441398.png";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  let storeAuth;
  if (user) {
    storeAuth = user.isStore;
    //console.log(" isStore confirmation ", storeAuth);
  }

  return (
    <ul className="nav-bar-project">
      <nav>
        <div className="text-in-nav">
          <li>
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>

          <li>
            {" "}
            <Link to="/products">All Products</Link>
          </li>

          {storeAuth && isLoggedIn ? (
            <li>
              {" "}
              <Link to="/products/add">Add Products</Link>{" "}
            </li>
          ) : null}

          {isLoggedIn && (
            <li>
              {" "}
              <Link onClick={logOutUser} to="/">
                Logout
              </Link>{" "}
            </li>
          )}

          {!isLoggedIn && (
            <>
              <li>
                {" "}
                <Link to="/signup">Sign Up</Link>{" "}
              </li>

              <li>
                {" "}
                <Link to="/login">Login</Link>{" "}
              </li>
            </>
          )}
        </div>

        <div className="image-in-nav">
          {user && (
            <div>
              <li>
                {" "}
                <Link to={`/cart/${user._id}`}>
                  <img
                    className="cart-img"
                    src={cartPic}
                    alt="cart"
                    className="cart-icon"
                  />
                </Link>{" "}
              </li>

              <li>
                {" "}
                <Link to="/profile">
                  <img className="profile-img" src={user.image} alt="profile" />
                </Link>{" "}
              </li>
            </div>
          )}
        </div>
      </nav>
    </ul>
  );
}

export default Navbar;
