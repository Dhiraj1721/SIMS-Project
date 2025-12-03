// OrderForm.jsx (Cleaned - Without Category)
import React, { useState, useEffect } from "react";

const OrderForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    wholesalerName: "",
    orderItems: [{ itemName: "", quantity: 1, price: 100 }],
    status: "Pending",
  });

  useEffect(() => {
    if (initialData && initialData.orderItems) {
      setFormData({
        wholesalerName: initialData.wholesalerName || "",
        orderItems: initialData.orderItems.map((item) => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price || 0,
        })),
        status: initialData.status || "Pending",
      });
    }
  }, [initialData]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.orderItems];
    newItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value.trim();
    setFormData({ ...formData, orderItems: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      orderItems: [
        ...formData.orderItems,
        { itemName: "", quantity: 1, price: 100 },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.orderItems.filter((_, i) => i !== index);
    setFormData({ ...formData, orderItems: newItems });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedItems = formData.orderItems.map((item) => ({
      itemName: item.itemName,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const totalAmount = validatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    onSubmit({ ...formData, orderItems: validatedItems, totalAmount });

    setFormData({
      wholesalerName: "",
      orderItems: [{ itemName: "", quantity: 1, price: 100 }],
      status: "Pending",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <div>
        <label className="block mb-1">Wholesaler Name</label>
        <input
          type="text"
          name="wholesalerName"
          value={formData.wholesalerName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {formData.orderItems.map((item, index) => (
        <div key={index} className="border p-3 rounded space-y-2">
          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              value={item.itemName}
              onChange={(e) =>
                handleItemChange(index, "itemName", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              min="0"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          {formData.orderItems.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-600 hover:underline"
            >
              Remove Item
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        Add Product
      </button>

      <div>
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
