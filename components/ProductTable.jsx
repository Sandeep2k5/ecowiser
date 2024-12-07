import React, { useEffect, useState } from "react";
import { useProductContext } from "../ProduceContext"; 
import "../styles/ProoductTable.css";
import as from "../Assets/110.png"
import dr1 from"../Assets/1727790202_5829992.png";
import sl1 from"../Assets/soul1.png";
import sh1 from"../Assets/shoe4.png";
import sh2 from"../Assets/shoe2.png";
import wat1 from"../Assets/5600.png";

const ProductTable = () => {
  const { products, deleteProduct, addProduct, brands } = useProductContext();

  const defaultProducts = [
    {
      _id: "1",
      name: "Ocean Dress",
      description: "A stylish dress for all occasions.",
      category: "Clothing",
      price: 1099,
      image: dr1,
      brandId: "3", 
      isDeletable: false,
    },
    {
      _id: "2",
      name: "Casio-A1-Rm500",
      description: "A modern wristwatch.",
      category: "Watch",
      price: 2099,
      image: as,
      brandId: "1", // Added brandId
      isDeletable: false,
    },
    {
      _id: "3",
      name: "Addidas - R1 - Shoes",
      description: "Comfortable running shoes.",
      category: "Footwear",
      price: 3099,
      image: sh1,
      brandId: "2", 
      isDeletable: false, 
    },
    {
      _id: "4",
      name: "Addidas - R2 -Shoes ",
      image: sh2,
      description: "Comfortable running shoes.",
      category: "Sports",
      brandId: "2",
      price: 5599,
      isDeletable: false
    },
    {
      _id: "5",
      name: "Spiderman -Oversized",
      description: "A Spiderman Oversized T-Shirt",
      image: sl1,
      category: "Sports",
      brandId: "3", 
      price: 3900,
      isDeletable: false
    },
    {
      _id: "6",
      name: "Casio-R1_MR202",
      image: wat1,
      category: "Watch",
      brandId: "1", 
      price: 15500,
      isDeletable: false
    },
  ];

  // Combine default products with dynamic products from the context
  const [productList, setProductList] = useState([...defaultProducts, ...products]);

  // Track the selected product for displaying details
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Effect to add products to the context if there are none
  useEffect(() => {
    const uniqueProducts = products.filter(
      (product) =>
        !defaultProducts.some((defaultProduct) => defaultProduct._id === product._id)
    );
    setProductList([...defaultProducts, ...uniqueProducts]);
  }, [products]);

  const handleProductClick = (product) => {
    setSelectedProduct((prev) => (prev && prev._id === product._id ? null : product));
  };

  const handleDeleteProduct = (productId) => {
    setProductList((prev) => prev.filter((product) => product._id !== productId));
    deleteProduct(productId); // Remove the product using context
  };

  // Function to get the brand name from the brandId
  const getBrandName = (brandId) => {
    const brand = brands.find((brand) => brand._id === brandId); // Assuming brands is an array of brand objects
    return brand ? brand.name : "Unknown Brand";
  };

  return (
    <div className="table-container">
      <h2>Products</h2>
      {productList.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Brand</th> {/* Added Brand column */}
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td>
                  <button
                    onClick={() => handleProductClick(product)} 
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {product.name}
                  </button>
                </td>
                <td>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handleProductClick(product)} 
                    />
                  )}
                </td>
                <td>{product.category}</td>
                <td>{getBrandName(product.brandId)}</td> {/* Displaying Brand */}
                <td>{`₹${product.price.toFixed(2)}`}</td> {/* Using ₹ symbol */}
                <td>
                  {product.isDeletable && (
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete Product
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      {selectedProduct && (
        <div className="product-details">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Brand:</strong> {getBrandName(selectedProduct.brandId)}</p> {/* Brand in details */}
          <p><strong>Price:</strong> ₹{selectedProduct.price.toFixed(2)}</p>
          {selectedProduct.image && (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
