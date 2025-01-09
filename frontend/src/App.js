import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductCreate from "./pages/ProductCreate";
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/autentication/Login";
import Register from "./components/autentication/Register";
import { AuthProvider } from "./hooks/AuthProvider";

const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
                <Home />
            }
          />
          <Route
            path="/ProductCreate"
            element={
                <ProductCreate />
            }
          />
          <Route
            path="/products/:id"
            element={
                <ProductDetails />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
