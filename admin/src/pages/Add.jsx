import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics'); // Default category
  const [subCategory, setSubCategory] = useState('SmartphonesAndAccessories'); // Default subcategory
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Define size options for each category
  const getCategorySizes = (category) => {
    switch (category) {
      case 'Electronics':
        return ['Small', 'Medium', 'Large'];
      case 'Fashion':
        return ['S', 'M', 'L', 'XL'];
      case 'HomeAppliances':
        return ['Small', 'Medium', 'Large'];
      case 'KitchenAppliances':
        return ['Small', 'Medium', 'Large'];
      case 'HealthAndBeauty':
        return ['Small', 'Medium', 'Large'];
      case 'BooksAndStationery':
        return ['A4', 'A5', 'Pocket Size'];
      default:
        return [];
    }
  };

  // Reset subcategory and sizes when category changes
  useEffect(() => {
    if (category === 'Electronics') {
      setSubCategory('SmartphonesAndAccessories');
    } else if (category === 'Fashion') {
      setSubCategory('MensClothing');
    } else if (category === 'HomeAppliances') {
      setSubCategory('Refrigerators');
    } else if (category === 'KitchenAppliances') {
      setSubCategory('MixersAndGrinders');
    } else if (category === 'HealthAndBeauty') {
      setSubCategory('Skincare');
    } else if (category === 'BooksAndStationery') {
      setSubCategory('Books');
    }
    setSizes(getCategorySizes(category)); // Update size options based on category
  }, [category]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation check
    if (!name || !description || !price || !category || !subCategory) {
      toast.error("Please fill all the required fields.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);

      // Append images if they are selected
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Image upload section with previews */}
	  <div>
			<p className='mb-2'>Upload Iamge</p>

			<div className='flex gap-2'>
			<label htmlFor="image1">
				<img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload" />
				<input onChange={e=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
			</label>
			<label htmlFor="image2">
				<img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload" />
				<input onChange={e=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
			</label>
			<label htmlFor="image3">
				<img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload" />
				<input onChange={e=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
			</label>
			<label htmlFor="image4">
				<img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload" />
				<input onChange={e=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
			</label>
			</div>
		</div>
      

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content Here"
          required
        />
      </div>

      {/* Category and Subcategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="HomeAppliances">Home Appliances</option>
            <option value="KitchenAppliances">Kitchen Appliances</option>
            <option value="HealthAndBeauty">Health and Beauty</option>
            <option value="BooksAndStationery">Books and Stationery</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
            {/* Dynamically render subcategories based on selected category */}
            {category === 'Electronics' && (
              <>
                <option value="SmartphonesAndAccessories">Smartphones and Accessories</option>
                <option value="LaptopsAndComputers">Laptops and Computers</option>
                <option value="AudioDevices">Audio Devices</option>
                <option value="CamerasAndPhotography">Cameras and Photography</option>
                <option value="SmartHomeDevices">Smart Home Devices</option>
              </>
            )}
            {category === 'Fashion' && (
              <>
                <option value="MensClothing">Men's Clothing</option>
                <option value="WomensClothing">Women's Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Jewelry">Jewelry</option>
              </>
            )}
            {category === 'HomeAppliances' && (
              <>
                <option value="Refrigerators">Refrigerators</option>
                <option value="WashingMachines">Washing Machines</option>
                <option value="AirConditioners">Air Conditioners</option>
                <option value="MicrowaveOvens">Microwave Ovens</option>
                <option value="VacuumCleaners">Vacuum Cleaners</option>
              </>
            )}
            {category === 'KitchenAppliances' && (
              <>
                <option value="MixersAndGrinders">Mixers and Grinders</option>
                <option value="CoffeeMakers">Coffee Makers</option>
                <option value="ToastersAndGrills">Toasters and Grills</option>
                <option value="Blenders">Blenders</option>
                <option value="RiceCookers">Rice Cookers</option>
              </>
            )}
            {category === 'HealthAndBeauty' && (
              <>
                <option value="Skincare">Skincare</option>
                <option value="Haircare">Haircare</option>
                <option value="Makeup">Makeup</option>
                <option value="Fragrances">Fragrances</option>
                <option value="PersonalCare">Personal Care</option>
              </>
            )}
            {category === 'BooksAndStationery' && (
              <>
                <option value="Books">Books</option>
                <option value="NotebooksAndJournals">Notebooks and Journals</option>
                <option value="OfficeSupplies">Office Supplies</option>
                <option value="ArtSupplies">Art Supplies</option>
                <option value="StationerySets">Stationery Sets</option>
              </>
            )}
          </select>
        </div>
      </div>


    {/* Product Size */}
<div className="w-full">
  <p className="mb-2">Product Size</p>
  <div className="flex flex-wrap gap-3">
    {getCategorySizes(category).map((sizeOption, index) => (
      <label key={index} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={sizeOption}
          onChange={(e) => {
            if (e.target.checked) {
              setSizes((prevSizes) => [...prevSizes, sizeOption]);
            } else {
              setSizes((prevSizes) => prevSizes.filter((size) => size !== sizeOption));
            }
          }}
          checked={sizes.includes(sizeOption)} // Reflects only when user checks a box
        />
        {sizeOption}
      </label>
    ))}
  </div>
</div>


      {/* Price */}
      <div className="w-full">
        <p className="mb-2">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Bestseller Checkbox */}
      <div className="w-full flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
        />
        <p className="mb-2">Bestseller</p>
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
        Add Product
      </button>
    </form>
  );
};

export default Add;




