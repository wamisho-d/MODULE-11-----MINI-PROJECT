import React from "react";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../shared/ConfirmationModal";
import axios from "axios";

const DeleteCustomer = ({ onSuccess }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/customers/${id}`);
      onSuccess();
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>
        Delete Customer
      </button>
      <ConfirmationModal
        show={showModal}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default DeleteCustomer;
