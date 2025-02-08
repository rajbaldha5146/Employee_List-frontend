import React from "react";

const DeleteButton = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteUser/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(userId);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center justify-center rounded-md bg-red-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-red-500"
    >
      Delete
    </button>
  );
};

export default DeleteButton;