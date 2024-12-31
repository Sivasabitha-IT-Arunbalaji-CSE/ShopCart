import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../componenets/Title/Title';
import ProductItem from '../componenets/ProductItem/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products); // Show all products initially
  const [selectedCategories, setSelectedCategories] = useState([]); // No category selected initially
  const [subcategory, setSubCategory] = useState(""); // No subcategory selected initially
  const [sortType, setSortType] = useState("relevant");

  const getCategorySubCategories = (category) => {
    switch (category) {
      case 'Electronics':
        return ['Smartphones and Accessories', 'Laptops and Computers', 'Audio Devices', 'Cameras and Photography', 'Smart Home Devices'];
      case 'Fashion':
        return ['Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Accessories', 'Jewelry'];
      case 'HomeAppliances':
        return ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'Microwaves', 'Vacuum Cleaners'];
      case 'KitchenAppliances':
        return ['Mixers and Grinders', 'Blenders', 'Ovens', 'Toasters', 'Coffee Makers'];
      case 'HealthAndBeauty':
        return ['Skincare', 'Haircare', 'Makeup', 'Fitness Equipment', 'Personal Care'];
      case 'BooksAndStationery':
        return ['Books', 'Notebooks and Journals', 'Writing Instruments', 'Office Supplies', 'Art Supplies'];
      default:
        return [];
    }
  };

  useEffect(() => {
    setSubCategory(""); // Reset subcategory when category changes
  }, [selectedCategories]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const toggleSubCategory = (e) => {
    setSubCategory(e.target.value);
  };

  const applyFilter = () => {
    let filteredProducts = [...products];

    // Apply search filter
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by categories if any category is selected
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Filter by subcategory if a subcategory is selected
    if (subcategory) {
      filteredProducts = filteredProducts.filter((item) => item.subCategory === subcategory);
    }

    setFilterProducts(filteredProducts);
  };

  const sortProducts = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting; keep products as is
        break;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategories, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-4"
        >
          FILTER
          <img
            className={`h-3 sm:hidden transition delay-75 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Electronics', 'Fashion', 'HomeAppliances', 'KitchenAppliances', 'HealthAndBeauty', 'BooksAndStationery'].map((cat, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={selectedCategories.includes(cat)}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {selectedCategories.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {selectedCategories.map((cat) => (
                <div key={cat}>
                  {getCategorySubCategories(cat).map((sub, index) => (
                    <p key={index} className="flex gap-2">
                      <input
                        className="w-3"
                        type="checkbox"
                        value={sub}
                        onChange={toggleSubCategory}
                        checked={subcategory === sub}
                      />
                      {sub}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

