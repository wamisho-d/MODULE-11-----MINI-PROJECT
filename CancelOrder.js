import React from "react";
import ConfirmationModal from "../shared/ConfirmationModal";
import axios from "axios";

const CancelOrder = ({ orderId, onSuccess }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      onSuccess();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>
        Cancel Order
      </button>
      <ConfirmationModal
        show={showModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        onConfirm={handleCancel}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default CancelOrder;
