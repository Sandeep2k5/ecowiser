import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom"; 
import { useProductContext } from "../ProduceContext";

const BrandDetail = () => {
  const { brandId } = useParams(); // Extracting the brandId from URL parameters using useParams
  const { brands } = useProductContext(); // Accessing brands from the context
  const [brand, setBrand] = useState(null); // State to store the selected brand's details
  const navigate = useNavigate(); // useNavigate hook for redirecting

  useEffect(() => {
    
    const selectedBrand = brands.find((b) => b._id === brandId);
    if (selectedBrand) {
      setBrand(selectedBrand); // If brand is found, set it in the state
    } else {
      navigate("/brands");
    }
  }, [brands, brandId, navigate]); // Re-run effect whenever brands, brandId or navigate changes

  if (!brand) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="brand-detail-container">
      <h2>{brand.name}</h2>
      <img
        src={brand.logo}
        alt={brand.name}
        style={{ width: "250px", height: "250px" }} 
      />
      <p>{brand.description}</p> 
      <button onClick={() => navigate("/brands")}>Back to Brands</button> {/* Button to navigate back to brands list */}
    </div>
  );
};

export default BrandDetail;
