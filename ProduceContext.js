import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext); // Correctly use the context in the hook
};

export const ProductProvider = ({ children }) => {
  // State for both products and brands
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([
    { _id: "1", name: "Casio" },
    { _id: "2", name: "Addidas" },
    { _id: "3", name: "Souled_Store"}
  ]);
  

  // Add a product to the state
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Add a brand to the state
  const addBrand = (brand) => {
    setBrands((prevBrands) => [...prevBrands, brand]);
  };

  // Delete a product from the state
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
  };

  // Delete a brand from the state
  const deleteBrand = (id) => {
    setBrands((prevBrands) => prevBrands.filter((brand) => brand._id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        addBrand,
        deleteProduct,
        deleteBrand,
        brands,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
