import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title/Title";
import ProductItem from "../ProductItem/ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
	setLatestProducts(products.slice(0,10))
  },[products])

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"OUR"} text2={"PRODUCTS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        At Shopcart, we offer everything from A to Z to cater to all your needs! 🛍️ Whether it’s electronics, home essentials, 
        fashion, or more, we’ve got it covered. Explore a world of variety with top brands and unbeatable prices. Shop smarter, shop everything, only at Shopcart!
        </p>
      </div>

		{/* Rendering Products */}
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
			{
				latestProducts.map((item, index) => {
					return (
						<ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
					)
				})
			}
		</div>

    </div>
  );
};

export default LatestCollection;
