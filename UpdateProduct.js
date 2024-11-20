import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(false);
      await axios.put(`/api/products/${id}`, formData);
      setSuccess(true);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  return (
    <div>
      <h3>Update Product</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product updated successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
