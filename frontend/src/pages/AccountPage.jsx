import { UPDATE_USER } from "../graphql/mutations/user.mutation";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const AccountPage = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    profilePicture: user.profilePicture || "",
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      variables: {
        userId: user._id,
        input: {
          name: formData.name,
          username: formData.username,
          profilePicture: formData.profilePicture,
        },
      },
    });
  };

  return (
    <div className="account-page">
      <h1>Account Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default AccountPage;
