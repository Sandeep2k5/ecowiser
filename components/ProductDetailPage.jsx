import { useParams } from "react-router-dom"; // Import useParams to access dynamic URL parameters (like product ID)
import { useProductContext } from "../ProduceContext"; // Import context to get access to the product data

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL using useParams
  const { products } = useProductContext(); // Use context to get the list of all products
  const product = products.find((prod) => prod._id === id); // Find the product with the matching ID

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2> 
      <p>{product.description}</p> 
      <p>Category: {product.category}</p> 
      <p>Price: ${product.price}</p> 
      <img src={product.image} alt={product.name} /> 
    </div>
  );
};

export default ProductDetailPage;
