const InventoryItem = require("../models/inventoryItem"); // Corrected import

// Get all inventory items
exports.getAllItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// Add new item
exports.addItem = async (req, res) => {
  const {
    name,
    category,
    quantity,
    purchasePrice,
    sellingPrice,
    supplier,
    barcode,
  } = req.body;

  const newItem = new InventoryItem({
    name,
    category,
    quantity,
    purchasePrice,
    sellingPrice,
    supplier,
    barcode,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  const {
    name,
    category,
    quantity,
    purchasePrice,
    sellingPrice,
    supplier,
    barcode,
  } = req.body;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        quantity,
        purchasePrice,
        sellingPrice,
        supplier,
        barcode,
      },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};
