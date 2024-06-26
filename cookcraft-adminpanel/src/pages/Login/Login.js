import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAuthUser } from "../../store/slices/authUser-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.user?.isAdmin === 0) {
            toast.warn("You can only access Admin Profile");
          } else {
            toast.success(res.data.message);
            dispatch(setAuthUser(res.data.user));
            setTimeout(() => {
              console.log(res.data.user?.isAdmin);
              if (res.data.user?.isAdmin) {
                navigate("/adminDashboard");
              }
            }, 5000);
          }
        }
        if (res.status === 400) {
          toast.warn(res.data.message);
        }
        if (res.status === 500) {
          toast.error(res.data.message);
        }
        if (res.status === 401) {
          toast.warn(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server not responding");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 h-screen">
        <div className="w-11/12 sm:w-96  bg-white px-12 py-12 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <legend className="mb-1 text-4xl font-medium">
              Welcome Back !
            </legend>

            <legend className="mb-4 text-2xl font-small">Login</legend>
            <div className="mb-12">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 "
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 hover:bg-secondary_color bg-primary_color text-white rounded-lg font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
