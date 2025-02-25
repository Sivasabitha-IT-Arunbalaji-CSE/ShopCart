import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../componenets/RelatedProduct/RelatedProduct";
// Importing react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    addToCart(productData._id, size);
    // Show toast message
    toast.success('Item added to cart successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to handle zoom effect
  const handleMouseMove = (e) => {
    const imageElement = e.target;
    const zoomContainer = e.currentTarget;
    const { left, top, width, height } = zoomContainer.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    // Calculate the percentage offset relative to the container
    const percentX = (offsetX / width) * 100;
    const percentY = (offsetY / height) * 100;

    // Apply the zoom effect and adjust the transform for the zoomed image
    imageElement.style.transform = `scale(2) translate(-${percentX}%, -${percentY}%)`;
  };

  const handleMouseLeave = (e) => {
    const imageElement = e.target;
    // Reset zoom when mouse leaves the image
    imageElement.style.transform = 'scale(1) translate(0, 0)';
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {/* Toast Container for displaying messages */}
      <ToastContainer />

      {/*-------------------------- Product Data -------------------------------------*/}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*-------------------------- Product Images ---------------------------------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt="Product Image"
                />
              );
            })}
          </div>

          <div className="w-full sm:w-[80%] relative">
            {/* Image with zoom effect */}
            <div
              className={`w-full h-auto overflow-hidden relative ${isZoomed ? 'z-50' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={toggleZoom}
            >
              <img
                className={`w-full h-auto transition-transform duration-300 ${isZoomed ? 'scale-200' : 'scale-100'}`}
                src={image}
                alt="Product Image"
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                }}
              />
            </div>
          </div>
        </div>
        {/*----------------------- Product Info ----------------------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star" className="w-3 5" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium ">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="textsm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------------------Description & Review Section --------------------- */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            The latest smartphone offering cutting-edge features with a sleek design. 
            Equipped with a high-resolution camera, powerful processor, and long-lasting battery, it's perfect for everyday use.
          </p>
          <p>
            A premium mobile case designed to protect your phone from drops and scratches. 
            Made with durable materials, it ensures your device stays safe while maintaining a slim, stylish look.
          </p>
        </div>
      </div>
      
      {/* Display Related Product */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
