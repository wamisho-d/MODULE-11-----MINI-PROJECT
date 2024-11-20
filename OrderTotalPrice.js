import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";

const OrderTotalPrice = ({ orderId }) => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}/total`);
        setTotal(response.data.total);
      } catch (err) {
        setError("Failed to calculate total price");
      }
    };
    fetchTotal();
  }, [orderId]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h3>Order Total Price</h3>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
    </div>
  );
};

export default OrderTotalPrice;
