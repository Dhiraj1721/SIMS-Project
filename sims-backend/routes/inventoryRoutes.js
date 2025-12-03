const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController"); // Correct import

// Route to get all items
router.get("/inventory", inventoryController.getAllItems);

// Route to add new item
router.post("/inventory", inventoryController.addItem);

// Route to update an item by ID
router.put("/inventory/:id", inventoryController.updateItem);

// Route to delete an item by ID
router.delete("/inventory/:id", inventoryController.deleteItem);

module.exports = router;
