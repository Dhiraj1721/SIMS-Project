import axios from '../api/axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = "http://localhost:5000/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      try {
        if (editingCustomer) {
          // EDIT
          const response = await axios.put(`/${editingCustomer._id}`, newCustomer);
          const updatedCustomers = customers.map((customer) =>
            customer._id === editingCustomer._id ? response.data : customer
          );
          setCustomers(updatedCustomers);
          setEditingCustomer(null);
        } else {
          // ADD
          const response = await axios.post('/', newCustomer);
          setCustomers([...customers, response.data]);
        }
  
        // Reset
        setNewCustomer({ name: '', email: '', phone: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error saving customer:', error);
      }
    } else {
      console.log('Form is incomplete!');
    }
  };
  
  

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setShowForm(true);
  };

  const handleSaveCustomer = async () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      try {
        console.log('Updating customer:', editingCustomer._id, newCustomer);  // Log the values
        const response = await axios.put(`/${editingCustomer._id}`, newCustomer);
        console.log('Updated customer response:', response.data);  // Log the response
  
        // Update the state with the updated customer
        const updatedCustomers = customers.map((customer) =>
          customer._id === editingCustomer._id ? response.data : customer
        );
        setCustomers(updatedCustomers);  // Update the customers list
        setEditingCustomer(null);  // Clear the editing customer
        setNewCustomer({ name: '', email: '', phone: '' });  // Clear the form
        setShowForm(false);  // Close the form
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    }
  };
  

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          className="border p-2 rounded w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowForm(true)}
        >
          + Add New Customer
        </button>
      </div>

      {/* Customer Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleChange}
              placeholder="Customer Name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={newCustomer.email}
              onChange={handleChange}
              placeholder="Customer Email"
              className="border p-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              value={newCustomer.phone}
              onChange={handleChange}
              placeholder="Customer Phone"
              className="border p-2 rounded"
            />
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewCustomer({ name: '', email: '', phone: '' });
                  setEditingCustomer(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingCustomer ? handleSaveCustomer : handleAddCustomer}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editingCustomer ? 'Save Changes' : 'Add Customer'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr key={customer._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2">{customer.phone}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
