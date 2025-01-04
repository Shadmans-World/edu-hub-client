import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../Auth Context/AuthProvider";


const Login = () => {
  const { logInUser, googleSignIn, setError, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logInUser(email, password); // Use the logInUser function from AuthProvider
      setError(""); // Clear any existing error
      navigate(from, { replace: true }); // Redirect after successful login
    } catch (error) {
      setError(`Error: ${error.message}`); // Handle login error
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setError(""); // Clear any existing error
      navigate(from, { replace: true }); // Redirect after successful login
    } catch (error) {
      setError(`Google Sign-In Error: ${error.message}`); // Handle Google login error
    }
  };

  return (
    <div className="mt-10">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Welcome back! Please log in to access your account and enjoy all
              the features we offer. If you don't have an account yet, feel free
              to{" "}
              <Link className="text-blue-500 font-bold" to="/auth/register">
                register
              </Link>{" "}
              and get started.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                  />
                  <div
                    className="absolute right-3 top-5"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <IoMdEye /> : <IoMdEyeOff />}
                  </div>
                </div>

                
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            {/* Display error message */}
            {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

            <div className="text-center text-[15px] mb-3 text-red-600">
              <p>
                New to this website?{" "}
                <span>
                  <Link
                    className="text-black font-bold"
                    to="/register"
                    onClick={() => setError("")}
                  >
                    Register
                  </Link>{" "}
                  please
                </span>
              </p>
            </div>

            {/* Google Sign-In Button */}
            <div className="flex flex-col justify-center items-center gap-y-2 my-3">
              <p>Or sign in with</p>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-circle"
              >
                <FcGoogle className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
