import React, { useState, useEffect } from 'react';

const UpdatePage = ({ match }) => {
  const userId = match.params.id; 

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    phone: '',
    aadharNumber: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user data based on the userId from your backend API
    fetchUserData(userId);
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      // Make a request to your backend API to get user details based on userId
      const response = await fetch(`your-backend-api/user/${userId}`);
      const data = await response.json();

      // Set the retrieved user data in the state
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        address: data.address,
        phone: data.phone,
        aadharNumber: data.aadharNumber,
        email: data.email,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend API to update user details
      const response = await fetch(`your-backend-api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User details updated successfully!');
        // You can redirect the user or perform other actions after successful update
      } else {
        console.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Update User Details</h1>
      <form onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {/* Repeat the above pattern for other form fields */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
