const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMonthlyRevenue,
} = require("../controllers/orderController");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);
router.get("/monthly-revenue", protect, getMonthlyRevenue); // 👈 NEW ROUTE

module.exports = router;
