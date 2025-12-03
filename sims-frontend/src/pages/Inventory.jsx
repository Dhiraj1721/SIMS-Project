// Updated React component for Inventory.jsx to match the InventoryItem schema
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/inventory';

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [barcode, setBarcode] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const clearForm = () => {
    setItemName('');
    setCategory('');
    setQuantity('');
    setPurchasePrice('');
    setSellingPrice('');
    setSupplier('');
    setBarcode('');
    setEditingItem(null);
    setShowForm(false);
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!itemName || !category || !quantity || !purchasePrice || !sellingPrice || !supplier) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.post(API, {
        name: itemName,
        category,
        quantity,
        purchasePrice,
        sellingPrice,
        supplier,
        barcode,
      });
      setItems([...items, res.data]);
    } catch (err) {
      console.error("Error adding item:", err);
    }

    clearForm();
  };

  const updateItem = async (e) => {
    e.preventDefault();
    if (!itemName || !category || !quantity || !purchasePrice || !sellingPrice || !supplier) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.put(`${API}/${editingItem._id}`, {
        name: itemName,
        category,
        quantity,
        purchasePrice,
        sellingPrice,
        supplier,
        barcode,
      });
      const updatedItems = items.map((item) =>
        item._id === editingItem._id ? res.data : item
      );
      setItems(updatedItems);
    } catch (err) {
      console.error("Error updating item:", err);
    }

    clearForm();
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 rounded mr-4"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Filter by category</option>
          <option value="Accessories">Accessories</option>
          <option value="Apparel">Apparel</option>
          <option value="Beauty">Beauty</option>
        </select>
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowForm(true)}
        >
          + Add New Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={editingItem ? updateItem : addItem}>
            <input type="text" placeholder="Item Name" className="border p-2 rounded" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="text" placeholder="Category" className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="number" placeholder="Quantity" className="border p-2 rounded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="number" placeholder="Purchase Price" className="border p-2 rounded" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <input type="number" placeholder="Selling Price" className="border p-2 rounded" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
            <input type="text" placeholder="Supplier" className="border p-2 rounded" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            <input type="text" placeholder="Barcode" className="border p-2 rounded" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button type="button" onClick={clearForm} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editingItem ? 'Update' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Purchase Price</th>
              <th className="p-2">Selling Price</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Barcode</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₹{item.purchasePrice}</td>
                <td className="p-2">₹{item.sellingPrice}</td>
                <td className="p-2">{item.supplier}</td>
                <td className="p-2">{item.barcode}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setEditingItem(item);
                      setItemName(item.name);
                      setCategory(item.category);
                      setQuantity(item.quantity);
                      setPurchasePrice(item.purchasePrice);
                      setSellingPrice(item.sellingPrice);
                      setSupplier(item.supplier);
                      setBarcode(item.barcode);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
