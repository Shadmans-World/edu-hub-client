import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BookedServices = () => {
  const [booked, setBooked] = useState([]);
    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()
  useEffect(() => {
    axiosSecure
      .get(`/services/bookedServices?email=${user.email}&type=user`)
      .then((res) => {
        setBooked(res.data);
      })
      .catch((error) => {
        // console.error(`Error : ${error.message}`);
      });
  }, []);

  return (
    <div>
      {booked.length === 0 ? (
        <p className="text-center text-lg font-semibold my-4">
          You have not booked any service yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                
                <th>Price</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              
              {
                booked.map((book,idx)=> {
                    return (
                    <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{book.serviceName}</td>
                    <td>{book.price} BDT</td>
                    <td>{book.bookedDate}</td>
                    <td>{book.serviceStatus}</td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookedServices;
