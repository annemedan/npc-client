import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import fileService from "../../services/file.service";

function EditProfilePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [bio, setBio] = useState("");
  const [storeName, setStoreName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(""); // used for image upload input

  const navigate = useNavigate();

  const { user, isLoggedIn } = useContext(AuthContext);

  let storeAuth;
  if (user) {
    storeAuth = user.isStore;
    console.log(" isStore confirmation ", storeAuth);
  }
  //console.log("user in edit", user);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:5005/api/users/profile"
  //         );
  //         const theProfile = response.data;
  //         console.log("theProfile", theProfile);
  //         // setTitle(oneProject.title);
  //         // setDescription(oneProject.description);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  //    const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlePostCode = (e) => setPostCode(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const handleFileUpload = async (event) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", event.target.files[0]);

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
    } catch (error) {
      setErrorMessage("Failed to upload file");
      console.log("Error uploading the image", error);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Create an object representing the request body
      const updatedProfile = {
        email,
        firstName,
        lastName,
        address,
        city,
        postCode,
        image: imageUrl,
      };

      const authToken = localStorage.getItem("authToken");
      await axios.put(
        "http://localhost:5005/api/users/profile",
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      // If the request is successful navigate to login page
      navigate("/profile");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  const deleteProfile = async (event) => {
    try {
      axios.delete("http://localhost:5005/api/users/profile/delete");
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  return storeAuth ? (
    <div className="regular-bg">
      <h1 className="h1-edit">Edit your profile </h1>
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
                    name="lastName"
                    value={lastName}
                    placeholder={user.lastName}
                    className="edit-user-input"
                  />
                </span>
              </span>

              <span className="edit-user-box">
                <label>Email</label>
                <input
                  type="text"
                  onChange={() => {}}
                  name="email"
                  value={email}
                  placeholder={user.email}
                  className="edit-user-input"
                />
              </span>

              <span className="edit-user-box">
                <label>Address</label>
                <input
                  type="text"
                  onChange={() => {}}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                  onChange={() => {}}
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
              </span>

              <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="regular-bg">
      <h1 className="h1-edit">Edit your profile </h1>
      <div className="edit-user">
        <div className="container">
          <div className="col-md-6 r-store r-edit">
            <h2>-</h2>

            <form onSubmit={handleSubmit} className="signup-user-form">
              <span className="row">
                <span className="edit-user-box col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    onChange={() => {}}
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
                    onChange={() => {}}
                    name="lastName"
                    value={lastName}
                    placeholder={user.lastName}
                    className="edit-user-input"
                  />
                </span>
              </span>

              <span className="edit-user-box">
                <label>Email</label>
                <input
                  type="text"
                  onChange={() => {}}
                  name="email"
                  value={email}
                  placeholder={user.email}
                  className="edit-user-input"
                />
              </span>

              <span className="edit-user-box">
                <label>Address</label>
                <input
                  type="text"
                  onChange={() => {}}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                  onChange={() => {}}
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
              </span>

              <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
