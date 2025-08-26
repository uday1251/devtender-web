import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("uday1251@gmail.com");
  const [password, setPassword] = useState("Uday1251@");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log("test", res);
      if (res.status) {
        dispatch(addUser(res.data));
        navigate("/");
      } else {
        setErrorMsg(res.data.message || "Login failed");
      }
    } catch (error) {

       if (error.response && error.response.data && error.response.data.message) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg("Network or server error");
    }
      
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <h3>{errorMsg}</h3>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email {email}</span>
              </div>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Enter Pasword"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
