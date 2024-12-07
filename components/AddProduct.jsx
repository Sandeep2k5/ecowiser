import React, { useState, useEffect } from "react"; // Import React hooks to manage state and side effects
import { useNavigate } from "react-router-dom"; // Use for navigation to different routes
import { useProductContext } from "../ProduceContext"; // Import context to access product and brand data
import '../styles/AddProducts.css'; // Import custom CSS for styling
import Sidebar from './sidebar'; // Import Sidebar component

const AddProduct = () => {
  const { addProduct, brands, setBrands } = useProductContext(); // Get methods and data (brands) from the product context
  const navigate = useNavigate(); // Hook to navigate to other routes like dashboard

  // States to manage form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [image, setImage] = useState(null);

  // useEffect to set default brands if there are no brands already in the context
  useEffect(() => {
    if (brands.length === 0) {
      const defaultBrands = [
        { _id: "1", name: "Default Brand 1" },
        { _id: "2", name: "Default Brand 2" },
        { _id: "3", name: "Default Brand 3" },
      ];
      setBrands(defaultBrands); // Set default brands
    }
  }, [brands, setBrands]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Check if all fields are filled out, if not, show an alert
    if (!name || !description || !category || !price || !brandId || !image) {
      return alert("All fields are required.");
    }

    // Create a new product object with the data from the form
    const newProduct = {
      _id: Date.now().toString(),
      name,
      description,
      category,
      price: parseFloat(price),
      brandId,
      image,
      isDeletable: true,
    };

    addProduct(newProduct); // Add the new product using the addProduct method from context
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  // Function to handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Set the image preview once loaded
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div className="add-product-container">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="add-product-form">
        <h2 className="form-title">Add Product</h2>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Left Section: Basic Information */}
          <div className="left-section">
            <h3 className="section-title">Basic Information</h3>
            <label className="label">Product Name</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state on change
            />
            <label className="label">Description</label>
            <textarea
              className="input-field"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state on change
            />
            <label className="label">Category</label>
            <input
              type="text"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)} // Update category state on change
            />
          </div>

          {/* Right Section: Image Upload */}
          <div className="right-section">
            <h3 className="section-title">Product Image</h3>
            <div className="image-upload">
              {image ? (
                <img src={image} alt="Preview" className="image-preview" /> // Show image preview if selected
              ) : (
                <p className="upload-placeholder">Upload your product image.</p>
              )}
              <input
                type="file"
                className="file-input"
                onChange={handleImageChange} // Handle image file selection
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="pricing-section">
            <h3 className="section-title">Pricing</h3>
            <label className="label">Price</label>
            <input
              type="number"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)} // Update price state on change
            />
            <label className="label">Brand</label>
            <select
              className="input-field"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)} // Update brandId state on change
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name} {/* Display brand options */}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for submit and cancel */}
          <div className="buttons-container">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")} // Navigate to dashboard if cancel
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
