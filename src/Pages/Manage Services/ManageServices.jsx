import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth Context/AuthProvider";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageServices = () => {
  const [manages, setManages] = useState([]);
  const [editingService, setEditingService] = useState(null); 
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/manageServices?email=${user.email}`)
      .then((res) => setManages(res.data))
      .catch((error) => {
        // console.error(`Error: ${error.message}`);
      });
  }, [user.email]);

  const handleDeleteServices = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://edu-hub-bangla-server.vercel.app/services/addServices/${_id}`,{withCredentials:true})
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your service has been deleted.", "success");
              const updatedServices = manages.filter(
                (manage) => manage._id !== _id
              );
              setManages(updatedServices);
            }
          })
          .catch((error) => {
            // console.error(`Error: ${error.message}`);
            Swal.fire("Error!", "Failed to delete the service.", "error");
          });
      }
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal_5");
    const updatedData = {
      serviceName: e.target.serviceName.value,
      price: e.target.price.value,
      serviceArea: e.target.serviceArea.value,
      description: e.target.description.value,
      image: e.target.image.value,
    };

    axios
      .put(
        `https://edu-hub-bangla-server.vercel.app/services/addServices/${editingService._id}`,
        updatedData,{withCredentials:true}
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Service updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Update the UI with the modified service
          setManages((prev) =>
            prev.map((service) =>
              service._id === editingService._id
                ? { ...service, ...updatedData }
                : service
            )
          );

          // Close the modal
          modal.close();
        } else {
            modal.close()
          Swal.fire("No Changes!", "No updates were made to the service.", "info");
        }
      })
      .catch((error) => {
        // console.error(`Error: ${error.message}`);
        Swal.fire("Error!", "Failed to update the service.", "error");
      });
  };

  return (
    <div>
      {manages.length === 0 ? (
        <p className="text-center text-lg font-semibold my-4">
          You have not added any service yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Service Area</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {manages.map((manage, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{manage.serviceName}</td>
                  <td>{manage.serviceArea}</td>
                  <td>{manage.price}</td>
                  <td>
                    <div className="join join-vertical lg:join-horizontal">
                      <button
                        className="btn join-item btn-info"
                        onClick={() => {
                          setEditingService(manage);
                          document.getElementById("my_modal_5").showModal();
                        }}
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteServices(manage._id)}
                        className="btn join-item btn-error"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Editing */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleEdit}
            className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg"
          >
            {/* Service Image URL */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">
                Service Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={editingService?.image || ""}
                className="input input-bordered w-full"
                placeholder="Enter image URL"
              />
            </div>

            {/* Service Name */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                defaultValue={editingService?.serviceName || ""}
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
                defaultValue={editingService?.price || ""}
                className="input input-bordered w-full"
                placeholder="Enter price"
              />
            </div>

            {/* Service Area */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">
                Service Area
              </label>
              <input
                type="text"
                name="serviceArea"
                defaultValue={editingService?.serviceArea || ""}
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
                defaultValue={editingService?.description || ""}
                placeholder="Enter service description"
              />
            </div>

            {/* Edit Service Button */}
            <button type="submit" className="btn btn-primary w-full">
              Edit Service
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* Close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageServices;
