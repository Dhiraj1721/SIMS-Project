const Order = require("../models/order");
const InventoryItem = require("../models/inventoryItem");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { wholesalerName, orderItems, status } = req.body;

    const validatedItems = orderItems.map((item) => ({
      itemName: item.itemName,
      category:
        item.category && item.category.trim() !== ""
          ? item.category
          : "Uncategorized",
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = validatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      wholesalerName,
      orderItems: validatedItems,
      totalAmount,
      status,
    });

    await order.save();

    if (status === "Completed") {
      for (const item of validatedItems) {
        await InventoryItem.findOneAndUpdate(
          { name: item.itemName, category: item.category },
          {
            $inc: { quantity: item.quantity },
            $set: {
              purchasePrice: item.price,
              supplier: wholesalerName,
              category: item.category,
            },
          },
          { upsert: true, new: true }
        );
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { wholesalerName, orderItems, status } = req.body;

    const validatedItems = orderItems.map((item) => ({
      itemName: item.itemName,
      category:
        item.category && item.category.trim() !== ""
          ? item.category
          : "Uncategorized",
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = validatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        wholesalerName,
        orderItems: validatedItems,
        totalAmount,
        status,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status === "Completed") {
      for (const item of validatedItems) {
        await InventoryItem.findOneAndUpdate(
          { name: item.itemName, category: item.category },
          {
            $inc: { quantity: item.quantity },
            $set: {
              purchasePrice: item.price,
              supplier: wholesalerName,
              category: item.category,
            },
          },
          { upsert: true, new: true }
        );
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// GET MONTHLY REVENUE
const getMonthlyRevenue = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          month: "$_id.month",
          totalRevenue: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const fullRevenue = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = i + 1;
      const data = revenueData.find((r) => r.month === monthIndex);
      return {
        month: monthNames[i],
        revenue: data ? data.totalRevenue : 0,
      };
    });

    res.status(200).json(fullRevenue);
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ error: "Failed to fetch revenue" });
  }
};

// EXPORT ALL CONTROLLERS
module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMonthlyRevenue,
};
