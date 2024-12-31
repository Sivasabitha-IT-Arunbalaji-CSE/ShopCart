import React from 'react'
import Title from '../componenets/Title/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../componenets/NewsLetter/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full lg:max-w-[450px] h-96' src={assets.about_img} alt="about_img" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>Shopcart is your go-to online shopping destination, offering a seamless experience for browsing and purchasing a wide range of products. 
            From fashion and electronics to home essentials, we have something for everyone. Our goal is to provide an intuitive and user-friendly interface 
            that makes online shopping fast, secure, and enjoyable. We carefully curate our inventory to offer high-quality products at competitive prices. 
            With a focus on customer satisfaction, we offer hassle-free returns and prompt delivery. Enjoy personalized recommendations and exclusive deals
             tailored to your shopping preferences. Our payment options are secure, ensuring peace of mind with every transaction. Join the Shopcart community today and start shopping with ease. We’re here to make your shopping experience unforgettable!</p>          
          <b className='text-gray-800'>Our Mission</b>
          <p>At Shopcart, our mission is to provide a seamless and enjoyable shopping experience, offering a diverse 
            range of high-quality products at unbeatable prices. We are committed to empowering our customers with easy access to top-tier brands and exceptional 
            service. Our goal is to continuously innovate and adapt to the needs of modern shoppers. We strive to build lasting relationships by prioritizing
             customer satisfaction and trust.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600' >At Shopcart, we prioritize quality in every product we offer. Our rigorous quality assurance process ensures that each item meets the highest standards of performance and durability. We work closely with trusted suppliers to guarantee reliable and safe products. Our commitment to quality means you can shop with confidence, knowing that every purchase is thoroughly vetted for excellence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600' >At Shopcart, we make shopping simple and hassle-free. With easy-to-navigate categories and fast checkout options, you can find exactly what you need in no time. Our seamless online experience allows you to shop from the comfort of your home, anytime. Enjoy fast delivery and excellent customer service, ensuring a smooth shopping journey every time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600' >At Shopcart, we prioritize our customers’ satisfaction. Our dedicated support team is always available to assist you with any inquiries or issues. Whether it’s product advice, order tracking, or returns, we’re here to ensure your shopping experience is seamless. Your happiness is our top priority, and we strive to exceed your expectations every time.</p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  )
}

export default About