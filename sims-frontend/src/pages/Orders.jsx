// Orders.jsx
import React, { useEffect, useState } from "react";
import OrderForm from "../components/orderForm";
import OrderTable from "../components/orderTable";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../utils/orderApi";
import { getCurrentUser } from "../utils/getCurrentUser";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const totalAmount = formData.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const orderData = {
        wholesalerName: formData.wholesalerName,
        orderItems: formData.orderItems,
        totalAmount,
        status: formData.status,
      };

      await createOrder(orderData);
      loadOrders();
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder({
      _id: order._id,
      wholesalerName: order.wholesalerName,
      orderItems: order.orderItems,
      status: order.status,
    });
  };

  const handleUpdate = async (formData) => {
    try {
      const totalAmount = formData.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const updatedOrder = {
        wholesalerName: formData.wholesalerName,
        orderItems: formData.orderItems,
        status: formData.status,
        totalAmount,
      };

      await updateOrder(selectedOrder._id, updatedOrder);
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        loadOrders();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Order Management</h1>

      <OrderForm
        onSubmit={selectedOrder ? handleUpdate : handleCreate}
        initialData={selectedOrder}
      />

      <OrderTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        role={user?.role}
      />
    </div>
  );
};

export default Orders;
