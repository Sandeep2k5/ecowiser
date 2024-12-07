import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css"; // Import custom CSS for styling

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate to login page on logout

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Add Product", path: "/add-product", icon: "➕" },
    { name: "Add Brand", path: "/add-brand", icon: "🏷️" },
  ];

  const handleLogout = () => {
    // Perform any logout functionality here (e.g., clearing auth tokens)
    // For now, we simply navigate to the login page
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
