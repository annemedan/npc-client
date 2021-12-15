import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function CartPage() {
  const { userId } = useParams();

  //console.log("userId", userId);

  const [thisUser, setThisUser] = useState(undefined);
  const [productsList, setProductsList] = useState(undefined);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get(`${serverUrl}/user/${userId}`);
      const userInfo = response.data;
      console.log("userInfo", userInfo);
      setThisUser(userInfo);
    };

    getCurrentUser();
  }, []);

  //if (thisUser) {
  //   thisUser.cart.products.forEach((element) => {
  //     const getItems = async () => {
  //       const response = await axios.get(`${serverUrl}/products/${element.item}`);
  //       const eachProduct = response.data;
  //       console.log("productsList:", eachProduct);
  //       setProductsList(eachProduct);
  //     };
  //     getItems();
  //   });
  //}

  //i think we can use this

  //console.log("userInfo", userInfo);
  // setThisUser(userInfo);

  //i think i can populate the items with router.get("/products/:id"

  return (
    <div className="cart-page">
      <h2>Your current cart:</h2>
      <div className="cart-box">
        {thisUser && (
          <>
            <p>Delivery Fee: {thisUser.cart.deliveryFee}€ </p>
            <p> Total: {thisUser.cart.totalPrice} </p>

            <p> {thisUser.status} </p>
          </>
        )}

        <button>
          <Link className="cart-checkout-button" to="/cart/checkout">
            {" "}
            Check out
          </Link>
        </button>
      </div>
    </div>
  );
}

export default CartPage;
