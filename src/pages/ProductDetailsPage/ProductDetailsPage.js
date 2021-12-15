import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import { BsBoxSeam } from "react-icons/bs";
import { IconContext } from "react-icons";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function ProductDetailsPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  //console.log("productId", id);

  const [item, setItem] = useState({});

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await axios.get(`${serverUrl}/products/${id}`);
      const itemInfo = response.data;
      //console.log("itemInfo", itemInfo);
      setItem(itemInfo);
    };
    getProductDetails();
  }, []);

  const handleAddToCart = async () => {
    const product = {
      itemId: item._id,
      quantity: quantity,
      purchasePrice: `${item.price * quantity}`,
      userId: user._id,
    };
    console.log("product", product);
    if (user) {
      const response = await axios.post(
        `${serverUrl}/cart/${user._id}`,
        product
      );
      console.log("response", response.data);
    } else {
      navigate("/login");
    }

    console.log("Added to cart");
    navigate("/products");
  };

  return (
    <div className="product-details-container">
      <div className="product-details-left col-md-6">
        <img
          src={item.productImage}
          alt="product"
          className="store-image-products"
        />
      </div>
      <div className="product-details-right col-md-6">
        <h2>{item.name}</h2>
        <h4>{item.category}</h4>
        <span>
          <h5>Stock: {item.quantity_available}</h5>
        </span>
        <h1>{item.price}€</h1>
        {/* <button onClick={handleAddtoCart} variant="success"> */}
        <button onClick={handleAddToCart}>Add to cart</button>{" "}
        <div className="product-description"></div>
        <p>{item.description}</p>
      </div>{" "}
    </div>
  );
}

export default ProductDetailsPage;
