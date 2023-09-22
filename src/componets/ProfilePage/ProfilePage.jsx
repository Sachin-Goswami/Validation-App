import React from "react";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <div>
      <h1>Profile Page</h1>
      {userData ? (
        <>
          <p>First Name: {userData.fname}</p>
          <p>Last Name: {userData.lname}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.mobile}</p>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
