import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import fileService from "../../services/file.service";

function AddProductsPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(AuthContext);

  const selectCategory = [
    "Food",
    "Homeware",
    "Handicraft",
    "Beverages",
    "Desserts",
    "Vintage",
    "Other",
  ];

  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", event.target.files[0]);

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
    } catch (error) {
      //setErrorMessage("Failed to upload file");
      console.log("Error uploading the image", error);
    }
  };

  const handleCategory = (e) => setCategory(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      user: user._id,
      name,
      category,
      image: imageUrl,
      quantity_available: quantity,
      price,
      description,
    };

    //console.log(body);

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/add`, body);
    console.log("product created");
    navigate("/products");
  };

  return (
    <div className="add-product-container">
      <div class="add-product-row col-md-6">
        <h2>Add Product</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div>
            <label>Category</label>
            <select
              name="type"
              value={category}
              onChange={handleCategory}
              required
            >
              {selectCategory.map((singleCategory, index) => {
                return (
                  <option key={index} value={singleCategory}>
                    {singleCategory}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Name</label>
            <input type="text" onChange={handleName} value={name} required />
          </div>

          <div>
            <label>Quantity in Stock</label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <span>
            <div className="no-padding">
              <label>Image</label>
              <input type="file" onChange={handleFileUpload} />
            </div>
            <button type="submit">Create</button>{" "}
          </span>
        </form>
      </div>
    </div>
  );
}

export default AddProductsPage;
