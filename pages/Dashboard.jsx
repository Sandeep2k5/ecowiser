import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import BrandTable from "../components/BrandTable";
import { useProductContext } from "../ProduceContext";
import Sidebar from "../components/sidebar";
import "./Dashboard.css";
import Carousel1 from '../Assets/carousel-1.png';
import Carousel2 from '../Assets/watch1.png';
import Carousel3 from '../Assets/soul2.png';
import Carousel4 from '../Assets/soul1.png';

const carouselImages = [Carousel1, Carousel2, Carousel3, Carousel4];

const Dashboard = () => {
  const navigate = useNavigate();
  const { brands, addBrand, deleteBrand } = useProductContext();

  const defaultProducts = [
    {
      _id: "1",
      name: "Default Product 1",
      image: "https://via.placeholder.com/50",
      category: "Electronics",
      brandId: "1",
      price: 100,
      isDeletable: false,
    },
    {
      _id: "2",
      name: "Default Product 2",
      image: "https://via.placeholder.com/50",
      category: "Apparel",
      brandId: "2",
      price: 150,
      isDeletable: false,
    },
    {
      _id: "3",
      name: "Default Product 3",
      image: "https://via.placeholder.com/50",
      category: "Furniture",
      brandId: "3",
      price: 200,
      isDeletable: false,
    },
    {
      _id: "4",
      name: "foot",
      image: "https://via.placeholder.com/50",
      category: "Sports",
      brandId: "1",
      price: 50,
      isDeletable: false
    }
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle search from SearchBar
  const handleSearch = (query) => {
    console.log("Search Query from Dashboard:", query);

    const lowercaseQuery = query.toLowerCase();

    const matchedProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();
      const productBrand = brands.find((brand) => brand._id === product.brandId)?.name?.toLowerCase() || "";

      return (
        productName.includes(lowercaseQuery) ||
        productCategory.includes(lowercaseQuery) ||
        productBrand.includes(lowercaseQuery)
      );
    });

    const matchedBrands = brands.filter((brand) => brand.name.toLowerCase().includes(lowercaseQuery));

    setFilteredProducts(matchedProducts); // Update filtered products state
    setFilteredBrands(matchedBrands); // Update filtered brands state

    console.log("Filtered Products:", matchedProducts);
    console.log("Filtered Brands:", matchedBrands);
  };

  useEffect(() => {
    setFilteredProducts(products);
    setFilteredBrands(brands);
  }, [products, brands]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-blue-50 p-6">
      <Sidebar />
      <div className="max-w-7xl mx-auto pl-[250px]">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
        </header>

        {/* Carousel */}
        <div className="carousel">
          <div className="carousel-track">
            {["carousel-1", "carousel-2", "carousel-3", "carousel-4"].map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === currentSlide ? "carousel-item-active" : ""
                }`}
              >
                <img src={carouselImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
              </div>
            ))}
          </div>
          <button
            className="carousel-button carousel-button-prev"
            onClick={() => setCurrentSlide((currentSlide - 1 + 4) % 4)}
          >
            &#8249;
          </button>
          <button
            className="carousel-button carousel-button-next"
            onClick={() => setCurrentSlide((currentSlide + 1) % 4)}
          >
            &#8250;
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Button Group */}
        <div className="flex justify-between gap-4 mb-6">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("/add-brand")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Brand
          </button>
        </div>

        {/* Brand and Product Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Brands</h2>
            {filteredBrands.length > 0 ? (
              <BrandTable brands={filteredBrands} onDeleteBrand={deleteBrand} />
            ) : (
              <p>No brands found</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
            {filteredProducts.length > 0 ? (
              <ProductTable products={filteredProducts} />
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
