import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://edu-hub-bangla-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error caught in interceptor", error.message);

        if (error.status === 401 || error.status === 403) {
          console.log("need to logout the user");
          logOut()
            .then(() => {
              console.log("logged out user");
              navigate("/signIn");
            })
            .catch((error) => console.log(error.message));
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
