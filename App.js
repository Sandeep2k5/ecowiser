import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddBrand from "./components/AddBrand";
import AddProduct from "./components/AddProduct";
import { ProductProvider } from "./ProduceContext";
const App = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} /> 
        <Route path="/add-brand" element={<AddBrand />} />
      </Routes>
    </ProductProvider>
    
  );
};

export default App;
