import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function CartPage() {
  const { userId } = useParams();

  //console.log("userId", userId);

  const [thisUser, setThisUser] = useState(undefined);

  const [cart, setCart] = useState(undefined);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get(`${serverUrl}/user/${userId}`);
      const cartInfo = response.data.cart;
      console.log("cart", cartInfo);
      setCart(cartInfo);
    };

    getCurrentUser();
  }, []);

  const getTotal = (eachPrice) => {
    for (let i = 0; i < eachPrice.length; i++) {
      let sum = 0;
      sum += eachPrice[i];
    }
  };

  return (
    <div className="cart-page">
      <h2>Your current cart:</h2>
      <div className="cart-box">
        {cart && (
          <div>
            {/* {cart.products[0].item.name} */}
            <div>
              <div>
                <table className="cart-table">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Product Preview</th>
                    <th>Quantity</th>
                  </tr>

                  {cart.products.map((eachProduct) => {
                    return (
                      <tr>
                        <td> {eachProduct.item.name} </td>
                        <td> {eachProduct.item.price} </td>
                        <td>
                          {" "}
                          <img
                            src={eachProduct.item.productImage}
                            alt="product pic"
                            className="product-img-cart"
                          />{" "}
                        </td>
                        <td>{eachProduct.quantity}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>

            <div>
              <p>Delivery Fee: {cart.deliveryFee}€ </p>

              {/* <p> Total: ? </p> */}

              <p>Status: {cart.status}</p>
            </div>
          </div>
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
