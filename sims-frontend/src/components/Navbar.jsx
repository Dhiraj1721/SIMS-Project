import { Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/sim-logo.png";

const Navbar = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-4 py-3 w-full relative">
      {/* Left Side */}
      <div className="flex items-center space-x-3">
        <button onClick={toggleSidebar} className="text-blue-600">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-blue-700">SIMS</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* User Dropdown */}
        <div className="relative">
          <button onClick={handleToggle}>
            <User className="h-6 w-6 text-blue-600" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md border p-2 z-50">
              {isLoggedIn ? (
                <>
                  <p className="px-4 py-2 text-sm text-gray-700">
                    Hi, {userName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Logo */}
        <img src={logo} alt="SIMS Logo" className="h-8 w-auto" />
      </div>
    </nav>
  );
};

export default Navbar;
