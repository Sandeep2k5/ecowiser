import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useProductContext } from "../ProduceContext";
import '../styles/AddBrand.css'; // Importing the CSS file for styling the form
import Sidebar from './sidebar'; // Importing Sidebar component for layout

const AddBrand = () => {
  const { addBrand } = useProductContext(); // Accessing the addBrand function from context
  const navigate = useNavigate(); // Hook to navigate to dashboard after form submission

  // State to handle brand data input (name, description, and logo)
  const [brandData, setBrandData] = useState({
    name: "",
    description: "",
    logo: "",
  });

  // State to handle file upload (logo) and preview
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle changes to input fields for brand data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandData({ ...brandData, [name]: value });
  };

  // Handle file input change (for logo image)
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result); // Preview the file
      reader.readAsDataURL(file); // Convert file to data URL
    } else {
      setFile(null);
      setPreview(null); // Clear preview if no file selected
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!brandData.name || !brandData.description || !file) {
      return alert("All fields are required.");
    }

    // Create the new brand object
    const newBrand = {
      _id: Date.now().toString(), 
      name: brandData.name,
      description: brandData.description,
      logo: preview, 
      isDeletable: true,
    };

    addBrand(newBrand); // Add the brand using the context function

    alert("Brand added successfully!"); // Show success message
    navigate("/dashboard"); 

    // Reset form fields after submission
    setBrandData({
      name: "",
      description: "",
      logo: "",
    });
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="add-brand-container">
      <Sidebar /> {/* Render Sidebar component for layout */}
      <div className="add-brand-form">
        <h2 className="form-title">Add Brand</h2>
        <form onSubmit={handleSubmit} className="brand-form">
          {/* Input field for Brand Name */}
          <label className="label">Brand Name</label>
          <input
            type="text"
            name="name"
            placeholder="Brand Name"
            value={brandData.name}
            onChange={handleInputChange}
            className="input-field"
            required
          />

          {/* Textarea for Brand Description */}
          <label className="label">Description</label>
          <textarea
            name="description"
            placeholder="Brand Description"
            value={brandData.description}
            onChange={handleInputChange}
            className="input-field"
            required
          />

          {/* File input for Logo image */}
          <label className="label">Logo</label>
          <input type="file" onChange={handleFileChange} className="file-input" />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}

          
          <button type="submit" className="submit-button">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
