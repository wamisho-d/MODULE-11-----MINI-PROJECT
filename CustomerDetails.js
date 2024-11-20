import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        setError("Failed to load customer details");
      }
    };
    fetchCustomer();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;
