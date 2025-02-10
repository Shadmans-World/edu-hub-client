import React, { useEffect, useState } from "react";
import CardPopular from "../../Components/CardPopular";
import axios from "axios";
import { Link } from "react-router-dom";

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        axios
            .get("https://edu-hub-bangla-server.vercel.app/services/addServices", { withCredentials: true })
            .then((res) => {
                setServices(res.data);
                setFilteredServices(res.data);
            })
            .catch((error) => {
                // console.error(error.message);
            });
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchText(query);

        const filtered = services.filter((service) =>
            service.serviceName.toLowerCase().includes(query)
        );
        setFilteredServices(filtered);
    };

    // Handle sorting by price
    const handleSort = () => {
        const sortedServices = [...filteredServices].sort((a, b) => {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
        setFilteredServices(sortedServices);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div>
            {/* Search & Sort */}
            <div className="flex justify-between items-center my-5 gap-2 px-3">
                <button onClick={handleSort} className="btn btn-primary">Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})</button>
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchText}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 p-3 gap-4">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service, idx) => (
                        <CardPopular key={idx} service={service} />
                    ))
                ) : (
                    <p className="text-center text-lg font-semibold">
                        No services found matching "{searchText}".
                    </p>
                )}
            </div>
            <div className="flex justify-center mb-5">
                <Link to={'/'}><button className="btn btn-primary">GO To Homepage</button></Link>
            </div>
        </div>
    );
};

export default AllServices;
