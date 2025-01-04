import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Auth Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const DetailsService = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);
  const handleBookService = (_id) => {
    document.getElementById("my_modal_5").showModal();
  };

  const handleBookForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const BookedData = Object.fromEntries(formData.entries())
    // console.log(BookedData)
    const newForm = {
      ...BookedData,
      serviceStatus : 'pending'
    }
    axios.post('https://edu-hub-bangla-server.vercel.app/services/bookedServices',newForm,{withCredentials:true})
    .then(res => {
      // console.log(res.data)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      document.getElementById("my_modal_5").close();
      
    })
    .catch(error=> {
      // console.error(`Error: ${error.message}`)
    })
  }
  return (
    <div className="p-6">
      {/* Service Details Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Service Image */}
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-[600px]"
        />
        <div className="p-6 space-y-4">
          {/* Service Name */}
          <h2 className="text-2xl font-bold text-gray-800">
            {service.serviceName}
          </h2>
          {/* Description */}
          <p className="text-gray-600">{service.description}</p>
          {/* Service Provider */}
          <div className="flex items-center gap-4">
            <img
              src={service.serviceProviderImage}
              alt={service.serviceProviderName}
              className="w-14 h-14 rounded-full border-2 border-gray-300"
            />
            <div>
              <h4 className="font-semibold text-gray-800">
                {service.serviceProviderName}
              </h4>
              <p className="text-sm text-gray-500">
                Location: {service.serviceArea}
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold text-primary">
              Price: {service.price} BDT
            </h3>
            <button
              onClick={() => handleBookService(service._id)}
              className="btn btn-primary"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Service ID */}
          <form onSubmit={handleBookForm}>
            <div className="flex flex-col gap-2 my-2">
              <label>Service ID</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service._id}
                name="serviceId"
                readOnly
              />
            </div>
            {/* Service Name */}
            <div className="flex flex-col gap-2 my-2">
              <label>Service Name</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service.serviceName}
                name="serviceName"
                readOnly
              />
            </div>
            {/* Service Image */}
            <div className="flex flex-col gap-2 my-2">
              <label>Service Image</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service.image}
                name="serviceImage"
                readOnly
              />
            </div>
            {/* Service Provider Email */}
            <div className="flex flex-col gap-2 my-2">
              <label>Service Provider Email</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service.serviceProviderEmail}
                name="serviceProviderEmail"
                readOnly
              />
            </div>
            {/* Service Provider Name */}
            <div className="flex flex-col gap-2 my-2">
              <label>Service Provider Name</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service.serviceProviderName}
                name="serviceProviderName"
                readOnly
              />
            </div>
            <br />
            <br />
            {/* Current User Email */}
            <div className="flex flex-col gap-2 my-2">
              <label>Your Email</label>
              <input
                type="text"
                className="border-2"
                defaultValue={user.email}
                name="bookedUserEmail"
                readOnly
              />
            </div>
            {/* Current User Name */}
            <div className="flex flex-col gap-2 my-2">
              <label>Your Name</label>
              <input
                type="text"
                className="border-2"
                defaultValue={user.displayName}
                name="bookedUserName"
                readOnly
              />
            </div>
            {/* Booking Date */}
            <div className="flex flex-col gap-2 my-2">
              <label>
                Booking Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="border-2"
                name="bookedDate"
                required
              />
            </div>
            {/* Special Instruction */}
            <div className="flex flex-col gap-2 my-2">
              <label>
                Special Instruction{" "}
                <span className="text-red-500">
                  *{" "}
                  <span className="text-sm">
                    (anything like address , area, customized service plan.)
                  </span>
                </span>
              </label>
              <input
                type="text"
                className="border-2"
                placeholder="Give your valuable instruction"
                name="bookedSpecialInstruction"
                required
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-2 my-2">
              <label>Price</label>
              <input
                type="text"
                className="border-2"
                defaultValue={service.price}
                name="price"
                readOnly
              />
            </div>
            <div>
              <button className="btn btn-success" type="submit">Book This Service</button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DetailsService;
