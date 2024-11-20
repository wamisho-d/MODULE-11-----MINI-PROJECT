import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";

const OrderHistory = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?customerId=${customerId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, [customerId]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h3>Order History</h3>
      {orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
