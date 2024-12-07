import React, { useEffect, useState } from "react"; // Import React, useState, and useEffect hooks
import { useProductContext } from "../ProduceContext"; // Import useProductContext to access brands and deleteBrand from context
import "../styles/BrandTable.css";
import l1 from "../Assets/12.jpg";
import l2 from "../Assets/13.png"; 
import l3 from "../Assets/15.jpg"; 

const BrandTable = () => {
  const { brands, deleteBrand } = useProductContext(); 


  const defaultBrands = [
    {
      _id: "1",
      name: "Souled-Store",
      description: "A Dress-Store which takes inspiration from movies and makes their iconic clothes",
      logo: l3,
      isDeletable: false, 
    },
    {
      _id: "2",
      name: "Addidas",
      description: "A Legendary sports Brand which produces sports-related products.",
      logo: l1,
      isDeletable: false, 
    },
    {
      _id: "3",
      name: "Casio",
      description: "An iconic watch brand which produces beautiful watches.",
      logo: l2,
      isDeletable: false, 
    },
  ];

  const [brandList, setBrandList] = useState([...defaultBrands, ...brands]);
  const [selectedBrand, setSelectedBrand] = useState(null); 

  
  useEffect(() => {
    const uniqueBrands = brands.filter(
      (brand) => !defaultBrands.some((defaultBrand) => defaultBrand._id === brand._id)
    );
    setBrandList([...defaultBrands, ...uniqueBrands]);
  }, [brands]); // Re-run when brands in context change

  const handleBrandClick = (brand) => {
    // Toggle the details view for the selected brand
    setSelectedBrand((prev) => (prev && prev._id === brand._id ? null : brand));
  };

  const handleDeleteBrand = (brandId) => {
 
    setBrandList((prev) => prev.filter((brand) => brand._id !== brandId));
    deleteBrand(brandId); 
  };

  return (
    <div className="brand-table-container">
      <h2 className="table-title">Brands</h2>
      {brandList.length > 0 ? (
        <table className="brand-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brandList.map((brand) => (
              <tr key={brand._id}>
                <td>
                  <button
                    onClick={() => handleBrandClick(brand)} // Handle brand click to show details
                    className="brand-name-button"
                  >
                    {brand.name}
                  </button>
                </td>
                <td>
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="brand-logo"
                      onClick={() => handleBrandClick(brand)} // Handle logo click to show details
                    />
                  )}
                </td>
                <td>{brand.description}</td>
                <td>
                  {brand.isDeletable && ( // Only show delete button for deletable brands
                    <button
                      onClick={() => handleDeleteBrand(brand._id)}
                      className="delete-button"
                    >
                      Delete Brand
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No brands found.</p> 
      )}

      {/*  render the selected brand details below the table */}
      {selectedBrand && (
        <div className="brand-details">
          <h3>Brand Details</h3>
          <p>
            <strong>Name:</strong> {selectedBrand.name}
          </p>
          <p>
            <strong>Description:</strong> {selectedBrand.description}
          </p>
          {selectedBrand.logo && (
            <img
              src={selectedBrand.logo}
              alt={selectedBrand.name}
              className="brand-details-logo"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BrandTable;
