import React from 'react';
import Title from '../componenets/Title/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetter from '../componenets/NewsLetter/NewsLetter';

export const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="contact_img" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            No. 12, North Masi Street, Madurai Main, Madurai - 625001
            <br /> Tamilnadu, India
          </p>
          <p className='text-gray-500'>
            9043731376, 8610527488
            <br />E-Mail: arunbalaji200300u@gmail.com
            <br />E-Mail: sivasabithak15@gmail.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at FashionNow</p>
          <p className='text-gray-500'>Learn more about our team and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default Contact;
