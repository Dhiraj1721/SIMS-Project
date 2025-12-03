// src/api/orderApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

const getToken = () => localStorage.getItem("token"); // adjust this if stored differently

export const getOrders = async () => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createOrder = async (orderData) => {
  return await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const getMonthlyRevenue = async (token) => {
  const response = await axios.get("/api/orders/monthly-revenue", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// UPDATE order
export const updateOrder = async (id, orderData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// DELETE order
export const deleteOrder = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
