import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Fade from "react-reveal/Fade";

import authService from "../../services/auth.service";

import fileService from "../../services/file.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(""); // used for image upload input

  const [isStore, setIsStore] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
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

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = {
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        postCode,
        image: imageUrl,
        isStore,
      };

      const authToken = localStorage.getItem("authToken");
      await axios.post("http://localhost:5005/auth/signup", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // or with a service
      // await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    // ! STILL NEED TO ADD THE OTHER SIGNUP SPACES
    isStore ? (
      <div className="signup-user">
        {/* <Fade right> */}
        <div className="signup-user-right-container"></div>
        <div className="signup-user-left-container col-md-6 r-store">
          <h2 className="r-store-h2">Register as a store!</h2>

          <form onSubmit={handleSignupSubmit} className="signup-user-form">
            <span className="signup-user-toggle">
              <label className="col-md-9 toggle switch">
                Do you want to sell your goods?
              </label>
              <input
                type="checkbox"
                checked={isStore}
                name="isStore"
                onChange={() => setIsStore(!isStore)}
                className="signup-user-input"
              />
              <span class="slider round"></span>
            </span>

            <span className="row">
              <span className="signup-user-box col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={handleFirstName}
                  name="firstName"
                  value={firstName}
                  className="signup-user-input"
                />
              </span>

              <span className="signup-user-box col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={handleLastName}
                  name="lastName"
                  value={lastName}
                  className="signup-user-input"
                />
              </span>
            </span>

            <span className="signup-user-box">
              <label>Email</label>
              <input
                type="text"
                onChange={handleEmail}
                name="email"
                value={email}
                className="signup-user-input"
              />
            </span>

            <span className="signup-user-box">
              <label>Password</label>
              <input
                type="text"
                onChange={handlePassword}
                name="password"
                value={password}
                className="signup-user-input"
              />
            </span>

            <span className="signup-user-box">
              <label>Address</label>
              <input
                type="text"
                onChange={handleAddress}
                name="address"
                value={address}
                className="signup-user-input"
              />
            </span>

            <span className="row">
              <span className="signup-user-box col-md-6">
                <label>PostCode</label>
                <input
                  type="text"
                  onChange={handlePostCode}
                  name="postCode"
                  value={postCode}
                  className="signup-user-input"
                />
              </span>
              <span className="signup-user-box col-md-6">
                <label>City</label>
                <input
                  type="text"
                  onChange={handleCity}
                  name="city"
                  value={city}
                  className="signup-user-input"
                />
              </span>
            </span>

            <span className="signup-user-box">
              <label>Phone Number</label>
              <input
                type="number"
                onChange={handlePhoneNumber}
                name="phoneNumber"
                value={phoneNumber}
                className="signup-user-input"
              />
            </span>

            <span className="signup-user-box">
              <input
                type="file"
                onChange={handleFileUpload}
                className="signup-user-picture"
              />
            </span>

            <span className="signup-user-buttons r-store-buttons">
              <button type="submit" size="lg">
                Sign up
              </button>{" "}
            </span>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
        {/* </Fade> */}
      </div>
    ) : (
      <div className="signup-user">
        {/* <Fade left> */}
        <div className="signup-user-right-container"></div>
        <div className="signup-user-left-container col-md-6 r-store">
          <h2 className="r-store-h2">Let's shop!</h2>

          <form onSubmit={handleSignupSubmit} className="signup-user-form">
            <span className="signup-user-toggle">
              <label className="col-md-9 toggle switch">
                Are you actually a seller?
              </label>
              <input
                type="checkbox"
                checked={isStore}
                name="isStore"
                onChange={() => setIsStore(!isStore)}
                className="signup-user-input"
              />
              <span class="slider round"></span>
            </span>

            <span className="row">
              <span className="signup-user-box col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={handleFirstName}
                  name="firstName"
                  value={firstName}
                  className="signup-user-input"
                />
              </span>

              <span className="signup-user-box col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={handleLastName}
                  name="lastName"
                  value={lastName}
                  className="signup-user-input"
                />
              </span>
            </span>

            <span className="signup-user-box">
              <label>Email</label>
              <input
                type="text"
                onChange={handleEmail}
                name="email"
                value={email}
                className="signup-user-input"
              />
            </span>

            <span className="signup-user-box">
              <label>Password</label>
              <input
                type="text"
                onChange={handlePassword}
                name="password"
                value={password}
                className="signup-user-input"
              />
            </span>

            <span className="signup-user-box">
              <label>Address</label>
              <input
                type="text"
                onChange={handleAddress}
                name="address"
                value={address}
                className="signup-user-input"
              />
            </span>

            <span className="row">
              <span className="signup-user-box col-md-6">
                <label>PostCode</label>
                <input
                  type="text"
                  onChange={handlePostCode}
                  name="postCode"
                  value={postCode}
                  className="signup-user-input"
                />
              </span>
              <span className="signup-user-box col-md-6">
                <label>City</label>
                <input
                  type="text"
                  onChange={handleCity}
                  name="city"
                  value={city}
                  className="signup-user-input"
                />
              </span>
            </span>

            <span className="signup-user-box">
              <label>Phone Number</label>
              <input
                type="number"
                onChange={handlePhoneNumber}
                name="phoneNumber"
                value={phoneNumber}
                className="signup-user-input"
              />
            </span>
            <span className="signup-user-box">
              <input
                type="file"
                onChange={handleFileUpload}
                className="signup-user-picture"
              />
            </span>
            <span className="signup-user-buttons r-store-buttons">
              <button type="submit" size="lg">
                Sign up
              </button>{" "}
            </span>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
        {/* </Fade> */}
      </div>
    )
  );
}

export default SignupPage;
