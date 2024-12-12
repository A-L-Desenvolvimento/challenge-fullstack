import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/products/" element={<ProductList />} />
        <Route path="api/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;