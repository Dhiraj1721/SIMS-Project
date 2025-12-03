import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  const location = useLocation();

  const commonItems = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/inventory", label: "Inventory" },
    { to: "/customers", label: "Customers" },
    { to: "/orders", label: "Orders" },
    { to: "/reports", label: "Reports" },
  ];

  const ownerOnlyItems = [
    { to: "/staff", label: "Staff Management" }, // you can create this page later
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg p-5 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">SIMS</h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X />
          </button>
        </div>

        <ul className="space-y-4">
          {[...commonItems, ...(role === "owner" ? ownerOnlyItems : [])].map(
            ({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={toggleSidebar}
                  className={`block hover:underline ${
                    location.pathname === to
                      ? "text-blue-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
