import { getCurrentUser } from "./utils/getCurrentUser";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import Login from "./LoginDetails/Login";
import Signup from "./LoginDetails/Signup";
import ForgotPassword from "./LoginDetails/forgotpassword";
import PrivateRoute from "./utils/PrivateRoute";

function Layout({ toggleSidebar, isSidebarOpen, children }) {
  const location = useLocation();
  const user = getCurrentUser(); // Get the current user
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <div className="flex min-h-screen">
      {!isAuthPage && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          role={user?.role} // Pass user role to Sidebar
        />
      )}
      <div className="flex-1">
        {!isAuthPage && <Navbar toggleSidebar={toggleSidebar} />}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Default Route — Protected */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Inventory />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Customers />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Orders />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Reports />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
