// src/pages/LoginPage.js

import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

//import authService from "../../services/auth.service";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the function for saving and verifying the token
  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${serverUrl}/auth/login`,
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // or with a service
      // const response = await authService.login(requestBody);

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="login-user-right-container">
      <div className="login-user-left-container col-md-6">
        <h2 className="r-store-h2">Login</h2>

        <form onSubmit={handleLoginSubmit}>
          <span className="login-user-box col-md-6">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
              className="login-user-input"
            />
          </span>

          <span className="login-user-box col-md-6">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="login-user-input"
            />
          </span>

          <button type="submit">Login</button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
