import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  //console.log("uday",user?.data);
  const handleLogout = async () => {
    try {
      console.log("logout");
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧑‍💻DevTinder </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>About us</Link>
          </li>
          <li>
            <a>Services</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>

          {user == null && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <>
            <div>
              <span>
                {user.data.firstName.charAt(0).toUpperCase() +
                  user.data.firstName.slice(1).toLowerCase() +
                  " " +
                  user.data.lastName}
              </span>
            </div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.data?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
