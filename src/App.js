import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import AddProductsPage from "./pages/AddProductsPage/AddProductsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import EditProductsPage from "./pages/EditProductsPage/EditProductsPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/products/:id/edit"
          element={
            <IsPrivate>
              {" "}
              <EditProductsPage />{" "}
            </IsPrivate>
          }
        />

        <Route path="/cart/:userId" element={<CartPage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <ProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              {" "}
              <EditProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/products/add"
          element={
            <IsPrivate>
              {" "}
              <AddProductsPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
