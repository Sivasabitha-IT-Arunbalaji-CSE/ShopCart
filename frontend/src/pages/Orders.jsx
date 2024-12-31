import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../componenets/Title/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for tracking order details

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token },
      });

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['deliveryDate'] = order.deliveryDate || 'Pending';
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadOrderData();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [token]);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order); // Update state with the selected order details
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="item" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                type="button"
                onClick={() => handleTrackOrder(item)} // Track order details
                className="border px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-white hover:text-black"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="border-t mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">Order Details</h3>
          <p>
            <strong>Name:</strong> {selectedOrder.name}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedOrder.quantity}
          </p>
          <p>
            <strong>Size:</strong> {selectedOrder.size}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <p>
            <strong>Delivery Date:</strong> {selectedOrder.deliveryDate}
          </p>
          <p>
            <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
          </p>
          <p>
            <strong>Ordered On:</strong> {new Date(selectedOrder.date).toDateString()}
          </p>
          <button
            type="button"
            onClick={() => setSelectedOrder(null)} // Close the details
            className="mt-4 bg-black text-white px-4 py-2 rounded-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;

