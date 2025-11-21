import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-white ">
      <ul className="flex items-center justify-center space-x-4 p-4">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/date-time"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Date & Time
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/drop-down"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Drop Down
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/multi-document"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Multi Document
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notification"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Notification
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Chart
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/form"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Form
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
