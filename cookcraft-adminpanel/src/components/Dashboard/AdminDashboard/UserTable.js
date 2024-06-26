import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "../../../utils/Modals/DeleteComfirmationModel";

const UserTable = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDeleteUser = (user_id) => {
    setDeleteUserId(user_id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting user with ID:", deleteUserId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/deleteUser/${deleteUserId}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully");
        window.location.reload();
        console.log(response.data);
      } else if (response.status === 204) {
        toast.warn("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setShowModal(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-black mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border hidden md:table-cell">User Id</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border hidden md:table-cell">Email</th>

            <th className="px-4 py-2 border hidden md:table-cell">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "text-white"}
            >
              <td className="px-4 py-2 border hidden md:table-cell">
                {user._id}
              </td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {user.email}
              </td>

              <td
                className="px-4 py-2 border hidden md:table-cell cursor-pointer"
                onClick={() => handleDeleteUser(user._id)}
              >
                <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default UserTable;
