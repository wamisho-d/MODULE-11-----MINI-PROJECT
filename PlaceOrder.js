import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const PlaceOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({ customerId: "", productId: "", quantity: 1 });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, productsRes] = await Promise.all([
          axios.get("/api/customers"),
          axios.get("/api/products"),
        ]);
        setCustomers(customersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(false);
      await axios.post("/api/orders", order);
      setSuccess(true);
    } catch (err) {
      setError("Failed to place order");
    }
  };

  return (
    <div>
      <h3>Place Order</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Order placed successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomer">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            as="select"
            name="customerId"
            value={order.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            name="productId"
            value={order.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
};

export default PlaceOrder;
