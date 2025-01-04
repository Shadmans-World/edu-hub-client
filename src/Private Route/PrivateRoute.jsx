// components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth Context/AuthProvider';



const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Assuming user context provides user info
  const location = useLocation();

  if (loading) {
    // You can provide a more descriptive message during loading
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
        <p className="ml-2">Checking authentication...</p>
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  // If logged in, return the children (component inside PrivateRoute)
  return children;
};

export default PrivateRoute;
