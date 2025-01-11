import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">All Products List</p>
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] items-center gap-4 bg-gray-100 py-3 px-4 rounded-md text-sm font-medium">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Subcategory</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] items-center gap-4 border-b py-3 px-4 text-sm"
          >
            <img
              className="w-16 h-16 object-cover rounded-md"
              src={item.image[0]}
              alt="Product"
            />
            <p className="truncate">{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subCategory || 'N/A'}</p>
            <p>
              {currency}
              {item.price.toFixed(2)}
            </p>
            <button
              className="text-red-500 hover:underline"
              onClick={() => removeProduct(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

