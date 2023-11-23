import React, { useState, useEffect } from 'react';
import InnerNavbar from './InnerNavbar';

const UserRecordsPage = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    // Assuming your backend API endpoint for fetching user records is at '/api/users'
    const apiUrl = 'https://localhost:44312/api/UserData';

    // Fetch user records from the backend
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUserRecords(data))
      .catch((error) => console.error('Error fetching user records:', error));
  }, []); // The empty dependency array ensures the effect runs only once after the initial render

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="home-container">
      <InnerNavbar />
     
      <h1>User Records</h1>
      <ul>
        {userRecords.map((user, index) => (
          <li key={index} onClick={() => handleUserClick(user)}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>User Details</h2>
          <p>First Name: {selectedUser.firstName}</p>
          <p>Last Name: {selectedUser.lastName}</p>
          <p>Age: {selectedUser.age}</p>
          <p>Address: {selectedUser.address}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Aadhar Number: {selectedUser.aadharNumber}</p>
          <p>Email ID: {selectedUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserRecordsPage;



