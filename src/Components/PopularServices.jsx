import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardPopular from './CardPopular';
import { Link } from 'react-router-dom';

const PopularServices = () => {

    const [popularServices, setPopularServices] = useState([]);

    useEffect(() => {
        axios
            .get('https://edu-hub-bangla-server.vercel.app/services/popularServices')
            .then((res) => setPopularServices(res.data))
            .catch((error) => {
                // console.error(error.message)
            });
    }, []);

    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Explore Our Popular Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full p-3">
                {popularServices.map((popularService, idx) => {
                    return (
                        <div
                            key={idx}
                            data-aos="fade-up" // Apply fade-up animation for scroll
                            data-aos-duration="1000" // Duration for smooth animation
                            data-aos-easing="ease-in-out" // Easing for smoothness
                        >
                            <CardPopular service={popularService} />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center my-5">
                <Link className="btn btn-primary" to="/allServices">
                    All Services
                </Link>
            </div>
        </div>
    );
};

export default PopularServices;
