import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import fileService from "../../services/file.service";

const serverUrl = process.env.REACT_APP_SERVER_URL;

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

  //console.log("image in the new product", imageUrl);

  const handleCategory = (e) => setCategory(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      user: user._id,
      name,
      category,
      productImage: imageUrl,
      quantity_available: quantity,
      price,
      description,
    };

    await axios.post(`${serverUrl}/products/add`, body);
    // console.log("product created", body);
    navigate("/products");
  };

  return (
    <div className="regular-bg">
      <h1 className="h1-edit">Add a product to your store </h1>
      <div className="edit-user">
        <div className="container">
          <div className="col-md-6 r-store-add r-edit">
            <h2>-</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <span className="row">
                <span className="edit-user-box col-md-6">
                  <label>Category</label>
                  <select
                    name="type"
                    value={category}
                    onChange={handleCategory}
                    required
                    className="edit-user-input"
                  >
                    {selectCategory.map((singleCategory, index) => {
                      return (
                        <option key={index} value={singleCategory}>
                          {singleCategory}
                        </option>
                      );
                    })}
                  </select>
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={handleName}
                    value={name}
                    required
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Quantity in Stock</label>
                  <input
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Price</label>
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Description</label>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-buttons r-store-buttons">
                  <button type="submit" size="lg">
                    Create
                  </button>{" "}
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductsPage;
