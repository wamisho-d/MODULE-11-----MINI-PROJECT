import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateCustomer = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to load customer details");
      }
    };
    fetchCustomer();
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
      await axios.put(`/api/customers/${id}`, formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to update customer");
    }
  };

  return (
    <div>
      <h3>Update Customer</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Customer updated successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter customer email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
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

export default UpdateCustomer;
