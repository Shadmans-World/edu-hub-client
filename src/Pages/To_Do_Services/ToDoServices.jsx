import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth Context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ToDoServices = () => {
  const { user } = useContext(AuthContext);
  const [manages, setManages] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(
          `https://edu-hub-bangla-server.vercel.app/services/bookedServices?email=${user.email}&type=provider`
        )
        .then((res) => {
          setManages(res.data);
        })
        .catch((error) => {
          // console.error(`Error: ${error.message}`);
        });
    }
  }, [user.email]);

  const handleStatus = (_id, newStatus) => {
    axios
      .patch(
        `https://edu-hub-bangla-server.vercel.app/services/bookedServices/to-do/${_id}`,
        {
          status: newStatus,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setManages((prev) =>
            prev.map((manage) =>
              manage._id === _id
                ? { ...manage, serviceStatus: newStatus }
                : manage
            )
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        // console.error(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      {manages.length === 0 ? (
        <p className="text-center text-lg font-semibold my-4">
          Your service has not been booked by anyone yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Header */}
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service (Name, Provider)</th>
                <th>Client</th>
                <th>Booking Date</th>
                <th>Special Instruction</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {manages.map((manage) => (
                <tr key={manage._id}>
                  <td>{manage.serviceId}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={manage.serviceImage}
                            alt={manage.serviceName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{manage.serviceName}</div>
                        <div className="text-sm opacity-50">
                          {manage.serviceProviderName}
                        </div>
                        <div className="text-sm opacity-50">
                          {manage.serviceProviderEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{manage.bookedUserName}</div>
                      <div className="text-sm opacity-50">
                        {manage.bookedUserEmail}
                      </div>
                    </div>
                  </td>
                  <td>{manage.bookedDate}</td>
                  <td>{manage.bookedSpecialInstruction || "N/A"}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleStatus(manage._id, e.target.value)
                      }
                      value={manage.serviceStatus}
                    >
                      <option value="pending">pending</option>
                      <option value="working">working</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ToDoServices;
