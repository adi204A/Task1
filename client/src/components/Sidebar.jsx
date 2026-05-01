import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },
  ];

  return (
    <div className="w-[250px] bg-black text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-10">
        Task Manager
      </h2>

      <div className="flex flex-col gap-3">

        {
          menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-4 py-3 rounded
                ${
                  location.pathname === item.path
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }
              `}
            >
              {item.name}
            </Link>
          ))
        }

        {
          user?.role === "admin" && (
            <div className="mt-10 border-t border-gray-700 pt-5">

              <p className="text-gray-400 mb-3 text-sm uppercase tracking-widest">
                Admin Panel
              </p>

              <Link
                to="/projects"
                className={`block px-4 py-3 rounded mb-1 ${
                  location.pathname === "/projects"
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                Manage Projects
              </Link>

              <Link
                to="/admin/register-member"
                className={`block px-4 py-3 rounded ${
                  location.pathname === "/admin/register-member"
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                Register Member
              </Link>

            </div>
          )
        }

      </div>
    </div>
  );
};

export default Sidebar;