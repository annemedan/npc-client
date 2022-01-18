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

  const { user } = useContext(AuthContext);

  // const [userCart, setUserCart] = useState({});

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get(`${serverUrl}/user/${userId}`);
      const cartInfo = response.data.cart;
      console.log("cart", cartInfo);
      setCart(cartInfo);
    };

    getCurrentUser();
  }, []);

  //this is now working:

  const handleDeleteButton = async (item) => {
    const product = {
      itemId: item.item._id,
      quantity: item.quantity,
      purchasePrice: item.item.price * item.quantity,
      userId: userId,
    };
    const response = await axios.put(
      `${serverUrl}/cart/${cart._id}/remove`,
      product,
      { withCredentials: true }
    );
    setCart(response.data);
  };

  const handleQuantityButton = async (statement, item) => {
    const product = {
      itemId: item.item._id,
      quantity: item.quantity,
      purchasePrice: item.item.price * item.quantity,
      userId: userId,
    };
    if (statement === "decrease") {
      const response = await axios.put(
        `${serverUrl}/cart/${cart._id}/decrease`,
        product,
        { withCredentials: true }
      );
      setCart(response.data);
    } else if (statement === "increase") {
      const response = await axios.put(
        `${serverUrl}/cart/${cart._id}/increase`,
        product,
        { withCredentials: true }
      );
      setCart(response.data);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your current cart:</h2>
      <div className="cart-box">
        {cart && (
          <div>
            <div>
              <div>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Product Preview</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  {cart.products.map((eachProduct) => {
                    return (
                      <tbody key={eachProduct._id}>
                        <tr>
                          <td> {eachProduct.item.name} </td>
                          <td> {eachProduct.item.price}€ </td>
                          <td>
                            {" "}
                            <img
                              src={eachProduct.item.productImage}
                              alt="product pic"
                              className="product-img-cart"
                            />{" "}
                          </td>
                          <td>
                            <div className="cart-buttons-box">
                              <div className="cart-quantity-buttons">
                                <button
                                  className="cart-quantity-button"
                                  onClick={() =>
                                    handleQuantityButton(
                                      "decrease",
                                      eachProduct
                                    )
                                  }
                                >
                                  -
                                </button>{" "}
                                <p> {eachProduct.quantity} </p>{" "}
                                <button
                                  className="cart-quantity-button"
                                  onClick={() =>
                                    handleQuantityButton(
                                      "increase",
                                      eachProduct
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="cart-remove-button"
                                onClick={() => handleDeleteButton(eachProduct)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>

            <div>
              <p>Expected Delivery Fee: {cart.deliveryFee}€ </p>
              <p>Purchase Status: {cart.status}</p>
            </div>
          </div>
        )}

        <button>
          <Link className="cart-checkout-button" to="/cart/checkout">
            {" "}
            Checkout
          </Link>
        </button>
      </div>
    </div>
  );
}

export default CartPage;
