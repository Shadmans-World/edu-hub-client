// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../../Shared/Navbar';
// import Footer from '../../Shared/Footer';

// const Root = () => {
//     return (
        
//         <div className='max-w-7xl mx-auto'>
//             <Navbar/>
//             <Outlet></Outlet>
//             <Footer/>
//         </div>
//     );
// };

// export default Root;



import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar';
import Footer from '../../Shared/Footer';
import DynamicTitle from '../../Dynamic Title/DynamicTitle';

const Root = () => {
    const [theme, setTheme] = useState('light'); // Default theme is 'light'

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme); // Apply theme globally
    };

    return (
        <div className="max-w-7xl mx-auto">
            <DynamicTitle/>
            <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
            <div className='min-h-[calc(100vh-172px)]'>
            <Outlet/>
            </div>
           
            <Footer />
        </div>
    );
};

export default Root;
