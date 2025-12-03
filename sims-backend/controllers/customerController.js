const Customer = require("../models/customer");
exports.addCustomer = async (req, res) => {
  console.log("Received customer data:", req.body); // Log the incoming data
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error adding customer:", error); // Log errors for debugging
    res.status(500).json({ message: "Error adding customer" });
  }
};

// GET all customers
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// POST new customer
exports.createCustomer = async (req, res) => {
  const newCustomer = new Customer(req.body);
  const saved = await newCustomer.save();
  res.status(201).json(saved);
};

// PUT update customer
exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
