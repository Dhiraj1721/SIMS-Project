import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getOrders, getMonthlyRevenue } from "../utils/orderApi";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const Reports = () => {
  const [orders, setOrders] = useState([]);
  //const [orders, setOrders] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const ordersData = await getOrders(token);
        const revenueData = await getMonthlyRevenue(token);

        const formattedRevenue = revenueData.map((entry) => ({
          month: `${entry._id.month}-${entry._id.year}`,
          revenue: entry.totalRevenue,
        }));

        setOrders(ordersData);
        setMonthlyRevenue(formattedRevenue);
      } catch (err) {
        console.error("Failed to load reports", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Purchase Report</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders to display.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Wholesaler</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{order.wholesalerName}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside">
                      {order.orderItems.map((item, index) => (
                        <li key={index}>
                          {item.itemName} - {item.quantity} x ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-4">
                    {order.status === "Completed" ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> Completed
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <FaClock /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Monthly Revenue
            </h3>
            {monthlyRevenue.length === 0 ? (
              <p>No revenue data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
