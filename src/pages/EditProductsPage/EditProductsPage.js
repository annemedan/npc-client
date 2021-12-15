import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import fileService from "../../services/file.service";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function EditProductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  //console.log("productId", id);

  const [item, setItem] = useState({});

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await axios.get(`${serverUrl}/products/${id}/`);
      const itemInfo = response.data;
      //console.log("itemInfo", itemInfo);
      setItem(itemInfo);
    };
    getProductDetails();
  }, []);

  return (
    <div className="regular-bg">
      {" "}
      This is a test
      {/* <h1 className="h1-edit">Edit the product </h1>
      <div className="edit-user">
        <div className="container">
          <div className="col-md-6 r-store r-edit">
            <h2>-</h2>

            <form onSubmit={handleSubmit} className="signup-user-form">
              <span className="row">
                <span className="edit-user-box col-md-6">
                  <label>Store Name</label>
                  <input
                    type="text"
                    onChange={handleStoreName}
                    name="storeName"
                    value={storeName}
                    placeholder={user.storeName}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Bio</label>
                  <input
                    type="text"
                    onChange={handleBio}
                    name="bio"
                    value={bio}
                    placeholder={user.bio}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    onChange={handleFirstName}
                    name="firstName"
                    value={firstName}
                    placeholder={user.firstName}
                    className="edit-user-input"
                  />
                </span>

                <span className="edit-user-box col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    onChange={handleLastName}
                    name="lastName"
                    value={lastName}
                    placeholder={user.lastName}
                    className="edit-user-input"
                  />
                </span>
              </span>

              <span className="edit-user-box">
                <label>Address</label>
                <input
                  type="text"
                  onChange={handleAddress}
                  name="address"
                  value={address}
                  placeholder={user.address}
                  className="edit-user-input"
                />
              </span>

              <span className="row">
                <span className="edit-user-box col-md-6">
                  <label>PostCode</label>
                  <input
                    type="text"
                    onChange={handlePostCode}
                    name="postCode"
                    value={postCode}
                    placeholder={user.postCode}
                    className="edit-user-input"
                  />
                </span>
                <span className="edit-user-box col-md-6">
                  <label>City</label>
                  <input
                    type="text"
                    onChange={handleCity}
                    name="city"
                    value={city}
                    placeholder={user.city}
                    className="edit-user-input"
                  />
                </span>
              </span>

              <span className="edit-user-box">
                <label>Phone Number</label>
                <input
                  type="number"
                  onChange={handlePhoneNumber}
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder={user.phoneNumber}
                  className="edit-user-input"
                />
              </span>

              <span className="edit-user-box">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="edit-user-picture"
                />
              </span>

              <span className="edit-user-buttons r-store-buttons">
                <button type="submit" size="lg">
                  Update Profile
                </button>{" "}
              </span> */}
      {/* <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span> */}
      {/* </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default EditProductsPage;
