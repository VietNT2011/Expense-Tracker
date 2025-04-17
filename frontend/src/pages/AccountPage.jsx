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
    <div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
      <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
        Account Details
			</p>
      <form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
        <div className='flex flex-wrap'>
          <div className='w-full'>
            <label
              className='block uppercase tracking-wide text-ApolloServertext text-xs font-bold mb-2'
              htmlFor='name'
            >
              Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-wrap'>
          <div className='w-full'>
            <label
              className='block uppercase tracking-wide text-ApolloServertext text-xs font-bold mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='username'
              type='text'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-wrap'>
          <div className='w-full'>
            <label
              className='block uppercase tracking-wide text-ApolloServertext text-xs font-bold mb-2'
              htmlFor='profilePicture'
            >
              Profile Picture URL
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='profilePicture'
              type='text'
              name='profilePicture'
              value={formData.profilePicture}
              onChange={handleInputChange}
            />
          </div>
        </div>
            
        <button type="submit" className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'>Update Profile</button>
      </form>
    </div>
  );
};

export default AccountPage;
