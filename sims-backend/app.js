// backend/app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes"); // Import the customer routes
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const authRoutes = require("./routes/authRoutes");
//const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for the frontend to connect

// Use customer routes
app.use("/api", customerRoutes); // All routes in customerRoutes will now be prefixed with /api
app.use("/api", inventoryRoutes); //
app.use("/api/auth", require("./routes/authRoutes"));
// ✅ This will prefix all auth routes with /api/auth
//app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
// Connect to MongoDB (replace with your own URI)
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
