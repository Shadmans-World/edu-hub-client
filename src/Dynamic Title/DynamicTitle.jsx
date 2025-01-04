import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Edu Hub'; // Default title

    // Set dynamic title based on route
    if (location.pathname === '/') {
      title = 'Home - Edu Hub';
    } else if (location.pathname === '/allServices') {
      title = 'All Services - Edu Hub';
    } else if (location.pathname === '/addServices') {
      title = 'Add Services - Edu Hub';
    } else if (location.pathname.startsWith('/services')) {
      title = 'Service Details - Edu Hub';
    } else if (location.pathname === '/forum') {
      title = 'Forum - Edu Hub';
    } else if (location.pathname === '/manage-services') {
      title = 'Manage Services - Edu Hub';
    } else if (location.pathname === '/booked-services') {
      title = 'Booked Services - Edu Hub';
    } else if (location.pathname === '/to-do-services') {
      title = 'To-Do Services - Edu Hub';
    }

    // Set the document title
    document.title = title;
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default DynamicTitle;
