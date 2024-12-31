import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 h-[65vh]'>
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-4 sm:py-3">
        <div className='text-[#414141]'>
          <div className='flex items-center gap-3'>
            <p className='w-10 md:w-12 h-[3px] bg-[#414141]'></p>
            <p className='font-medium text-base md:text-lg'>OUR BESTSELLERS</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-snug prata-regular'>Latest Arrivals</h1>
          <div className='flex items-center gap-3'>
            <p className='font-semibold text-base md:text-lg'>SHOP NOW</p>
            <p className='w-10 md:w-12 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img 
        className='w-full sm:w-1/2 h-full object-cover' 
        src={assets.hero_img} 
        alt="hero_img" 
      />
    </div>
  );
};

export default Hero;

