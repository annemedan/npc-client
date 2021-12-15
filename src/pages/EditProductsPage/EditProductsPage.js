import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import fileService from "../../services/file.service";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function EditProductsPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  //console.log("productId", id);

  const [item, setItem] = useState(undefined);

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await axios.get(`${serverUrl}/products/${id}/`);
      const itemInfo = response.data;
      console.log("itemInfo", itemInfo);

      setItem(itemInfo);

      setName(itemInfo.name);
      setDescription(itemInfo.description);
      setPrice(itemInfo.price);
      setQuantity(itemInfo.quantity_available);
      setCategory(itemInfo.category);
      setImageUrl(itemInfo.productImage);
    };
    getProductDetails();
  }, []);

  const selectCategory = [
    "Food",
    "Homeware",
    "Handicraft",
    "Beverages",
    "Desserts",
    "Vintage",
    "Other",
  ];

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

  console.log("image", imageUrl);

  const handleCategory = (e) => setCategory(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      //   user: user._id,
      name,
      category,
      productImage: imageUrl,
      quantity_available: quantity,
      price,
      description,
    };

    await axios.put(`${serverUrl}/products/${id}/edit`, updatedProduct);
    console.log("product created", updatedProduct);
    navigate("/products");
  };

  const deleteProject = async () => {
    try {
      axios.delete(`${serverUrl}/products/${id}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return item ? (
    <div className="regular-bg">
      {" "}
      <h1 className="h1-edit">Edit the product </h1>
      <div className="edit-user">
        <div className="container">
          <div className="col-md-6 r-store r-edit">
            <h2>-</h2>

            <form onSubmit={handleFormSubmit} className="signup-user-form">
              <span className="row">
                <span className="edit-user-box col-md-6">
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
                </span>

                <span className="edit-user-box">
                  <input
                    type="file"
                    placeholder={item.productImage}
                    onChange={handleFileUpload}
                    className="edit-user-picture"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Description</label>
                  <input
                    type="text"
                    onChange={handleDescription}
                    name="description"
                    value={description}
                    placeholder={item.description}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={handleName}
                    name="name"
                    value={name}
                    placeholder={item.name}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Price</label>
                  <input
                    type="number"
                    onChange={handlePrice}
                    name="price"
                    value={price}
                    placeholder={item.price}
                    className="edit-user-input"
                  />
                </span>
              </span>

              <span className="edit-user-box">
                <label>Quantity Available</label>
                <input
                  type="text"
                  onChange={handleQuantity}
                  name="quantity"
                  value={quantity}
                  placeholder={item.quantity_available}
                  className="edit-user-input"
                />
              </span>

              <span className="edit-user-buttons r-store-buttons">
                <button type="submit" size="lg">
                  Update Product Details
                </button>{" "}
              </span>

              {/* <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span> */}
            </form>

            <button onClick={deleteProject}>Delete Product</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div> Can't render this page</div>
  );
}

export default EditProductsPage;
