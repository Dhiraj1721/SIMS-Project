import React from "react";

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Wholesaler</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price (₹)</th>
            <th className="border px-4 py-2">Total (₹)</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) =>
            order.orderItems.map((item, idx) => (
              <tr key={`${order._id}-${idx}`} className="text-center">
                {idx === 0 && (
                  <>
                    <td
                      rowSpan={order.orderItems.length}
                      className="border px-4 py-2"
                    >
                      {index + 1}
                    </td>
                    <td
                      rowSpan={order.orderItems.length}
                      className="border px-4 py-2"
                    >
                      {order.wholesalerName}
                    </td>
                  </>
                )}
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">
                  {item.category || "Uncategorized"}
                </td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">₹{item.price}</td>
                <td className="border px-4 py-2">
                  ₹{item.quantity * item.price}
                </td>
                {idx === 0 && (
                  <>
                    <td
                      rowSpan={order.orderItems.length}
                      className="border px-4 py-2"
                    >
                      {order.status}
                    </td>
                    <td
                      rowSpan={order.orderItems.length}
                      className="border px-4 py-2"
                    >
                      <button
                        onClick={() => onEdit(order)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(order._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
