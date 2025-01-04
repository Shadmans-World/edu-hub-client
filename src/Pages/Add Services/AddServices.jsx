import React, { useContext } from "react";
import { AuthContext } from "../../Auth Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AddServices = () => {
  const { user } = useContext(AuthContext);


  const handleAddService = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData)

    const service = {
      serviceProviderImage: user?.photoURL,
      serviceProviderName: user?.displayName,
      serviceProviderEmail: user?.email,
      ...initialData,
    };

    // console.log(service);

    axios.post(`https://edu-hub-bangla-server.vercel.app/services/addServices`,service,{withCredentials:true})
    .then(res => {
        // console.log('Service Added Successfully', res.data)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your service has been added",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset()
    })
    .catch(error => {
        // console.error('Error in adding the service: ', error.message)
    })
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Add a New Service</h1>
      <form
        onSubmit={handleAddService}
        className="w-full  mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        {/* Service Image URL */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">
            Service Image URL
          </label>
          <input
            type="text"
            name="image"
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
        </div>

        {/* Service Name */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Service Name</label>
          <input
            type="text"
            name="serviceName"
            className="input input-bordered w-full"
            placeholder="Enter service name"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Price</label>
          <input
            type="text"
            name="price"
            className="input input-bordered w-full"
            placeholder="Enter price"
          />
        </div>

        {/* Service Area */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Service Area</label>
          <input
            type="text"
            name="serviceArea"
            className="input input-bordered w-full"
            placeholder="Enter service area"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Enter service description"
          />
        </div>

        {/* Add Service Button */}
        <button type="submit" className="btn btn-primary w-full">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServices;
