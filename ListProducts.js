import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h3>Product List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button variant="warning" href={`/products/edit/${product.id}`}>
                  Edit
                </Button>{" "}
                <Button variant="danger" href={`/products/delete/${product.id}`}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
