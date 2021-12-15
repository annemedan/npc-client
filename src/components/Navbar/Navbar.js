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
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/products">
        <button>All Products</button>
      </Link>

      {storeAuth && isLoggedIn ? (
        <Link to="/products/add">
          <button>Add Products</button>
        </Link>
      ) : null}

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <div className="profile-img-wrapper">
        {user && (
          <>
            <div>
              <Link to={`/cart/${user._id}`}>
                <img className="cart-img" src={cartPic} alt="cart" />
              </Link>
            </div>
            <div>
              <Link to="/profile">
                <img className="profile-img" src={user.image} alt="profile" />
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
