import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h3>Product Details</h3>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetails;
