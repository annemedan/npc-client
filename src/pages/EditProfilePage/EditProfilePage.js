import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import fileService from "../../services/file.service";

function EditProfilePage() {
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
  }

  console.log(
    "user in the edit profile page - before axios fetch the data",
    user
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:5005/api/users/profile",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        const theProfile = response.data;
        console.log("theProfile", theProfile);

        setStoreName(theProfile.storeName);
        setBio(theProfile.bio);
        setFirstName(theProfile.firstName);
        setLastName(theProfile.lastName);
        setAddress(theProfile.address);
        setPostCode(theProfile.postCode);
        setCity(theProfile.city);
        setPhoneNumber(theProfile.phoneNumber);
        setImageUrl(theProfile.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlePostCode = (e) => setPostCode(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleStoreName = (e) => setStoreName(e.target.value);
  const handleBio = (e) => setBio(e.target.value);

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
        firstName,
        lastName,
        storeName,
        bio,
        address,
        city,
        postCode,
        image: imageUrl,
        phoneNumber,
      };

      const authToken = localStorage.getItem("authToken");
      await axios.put(
        "http://localhost:5005/api/users/profile",
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
        { new: true } //! not sure if this should be here
      );

      // If the request is successful navigate to login page
      navigate("/profile");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  //   const deleteProfile = async (event) => {
  //     try {
  //       axios.delete("http://localhost:5005/api/users/profile/delete");
  //       navigate("/signup");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
              </span>

              {/* <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span> */}
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
              </span>

              {/* <span className="edit-user-buttons r-store-buttons">
                <button onClick={deleteProfile} size="lg">
                  Delete Profile
                </button>{" "}
              </span> */}
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
