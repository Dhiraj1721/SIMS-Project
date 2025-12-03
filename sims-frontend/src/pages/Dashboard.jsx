import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { getCurrentUser } from "../utils/getCurrentUser";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [inventoryData, setInventoryData] = useState([]);
  const [orderStats, setOrderStats] = useState({ count: 0, revenue: 0 });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    password: ""
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
if (currentUser) {
  setUser(currentUser);
  setFormData({
    name: currentUser.name || "",
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    password: ""
  });
}

    axios
      .get("http://localhost:5000/api/inventory")
      .then((res) => setInventoryData(res.data))
      .catch(console.error);

    axios
      .get("http://localhost:5000/api/orders/stats")
      .then((res) => setOrderStats(res.data))
      .catch(console.error);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:5000/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setEditMode(false);
        alert("Profile updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* User Profile */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">👤 User Profile</h2>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <input
              className="w-full border rounded p-2"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              className="w-full border rounded p-2"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              className="w-full border rounded p-2"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              className="w-full border rounded p-2"
              type="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Role:</strong> {user.role || "Staff"}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Inventory Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">📦 Inventory Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={inventoryData}>
            <XAxis dataKey="itemName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Overview */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">🛒 Orders & Revenue</h2>
        <p><strong>Total Orders:</strong> {orderStats.count}</p>
        <p><strong>Total Revenue:</strong> ₹{orderStats.revenue}</p>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <h2 className="text-xl font-semibold mb-4">🚀 Quick Navigation</h2>
        <a href="/reports" className="text-blue-600 hover:underline block">View Reports</a>
        <a href="/orders" className="text-blue-600 hover:underline block">View Orders</a>
      </div>

      {/* Owner Only Controls */}
      {user.role === "owner" && (
        <div className="bg-white p-6 rounded-2xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">📊 Owner Controls</h2>
          <p>Staff Management, Role Assignments, etc.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
