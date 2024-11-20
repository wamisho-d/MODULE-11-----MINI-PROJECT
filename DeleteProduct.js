import React from "react";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../shared/ConfirmationModal";
import axios from "axios";

const DeleteProduct = ({ onSuccess }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${id}`);
      onSuccess();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>
        Delete Product
      </button>
      <ConfirmationModal
        show={showModal}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default DeleteProduct;
