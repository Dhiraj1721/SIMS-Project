const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String }, // Ensure it's included
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    wholesalerName: { type: String, required: true },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
