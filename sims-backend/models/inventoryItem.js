// models/InventoryItem.js
const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  quantity: { type: Number, required: true },
  purchasePrice: Number,
  sellingPrice: Number,
  supplier: String,
  dateAdded: { type: Date, default: Date.now },
  barcode: String,
});

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
