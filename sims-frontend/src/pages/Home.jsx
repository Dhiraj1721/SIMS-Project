// src/pages/Home.jsx
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-20 px-6 py-12 space-y-10 md:space-y-0">
        {/* Left Side - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Welcome to SIMS 🎉
          </h1>

          <p className="text-lg text-gray-700">
            <strong>Stationery Inventory Management System</strong> is your one-stop solution for managing inventory, tracking feedback, generating bills, and calculating real-time profit/loss — optimized for small, fast-moving items like earrings, bindi, body spray, and more.
          </p>

          <p className="text-md text-gray-700">
            At SIMS, we believe that even small products need big management! Our system is designed to make it incredibly easy to manage, track, and analyze the inventory of lightweight, fast-moving stationery and cosmetic items like earrings, bindis, body sprays, and more.
          </p>

          <p className="text-md text-gray-700">
            Whether you run a small shop or manage multiple outlets, SIMS helps you stay on top of your business by providing real-time inventory updates, profit/loss analytics, customer feedback tracking, and barcode-based stock management. Say goodbye to manual errors and hello to smart, efficient inventory handling!
          </p>

          <p className="text-md text-gray-700">
            Our vision is simple — <strong>Empower small businesses</strong> with powerful tools that are easy to use, affordable, and tailored for your success.
          </p>

          {/* Scroll Button */}
          <div className="flex justify-center md:justify-start mt-6">
  <a
    href="#features"
    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 animate-bounce"
  >
    ↓ Scroll to Explore
  </a>
</div>


          <p className="text-md text-blue-500 mt-4">
            Use the sidebar to navigate through the system!
          </p>
        </div>

        {/* Right Side - Animation/Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/animation.png"
            alt="SIMS Animation"
            className="w-72 md:w-96 h-auto animate-fade-in-up"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12" data-aos="fade-up">
            What SIMS Can Do for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up">
              <h3 className="text-xl font-semibold mb-4">Inventory Management</h3>
              <p>Track your stationery items easily with real-time stock updates and category filtering.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold mb-4">Profit & Loss Analysis</h3>
              <p>Automatic profit/loss calculation for each item and your entire business monthly/yearly.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold mb-4">Billing & Invoicing</h3>
              <p>Generate beautiful QR-enabled bills, calculate tax, and send SMS notifications instantly.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-semibold mb-4">Customer Feedback Storage</h3>
              <p>Keep records of customer feedback, purchase history, and improve your product quality.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-semibold mb-4">Barcode Bulk Updates</h3>
              <p>Use barcodes to update stock quantity or add new items in bulk quickly and easily.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="500">
              <h3 className="text-xl font-semibold mb-4">Secure User Login</h3>
              <p>Allow users to sign up and log in with email, Google, or Facebook with secure authentication.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
