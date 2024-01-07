import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import hero from '../images/herosection.png';
import cookie from '../images/cookie.png';
import cake from '../images/cake.png';
import cupcakes from '../images/cupcakes.png';
import cake1 from '../images/cake1.png';
import cake2 from '../images/cake2.png';
import cake3 from '../images/cake3.png';
import cup1 from '../images/cup1.png';
import cup2 from '../images/cup2.png';
import cookie1 from '../images/cookie1.png';
import topper from '../images/topper.png';
import topper2 from '../images/topper2.png';
import { Link } from 'react-router-dom';
export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className='main'>
        <div className='header mt-12'>
          <h1 className='title font-bold text-5xl'>LITTLE HEARTS</h1>
          <p className='tagline text-xl mt-4'>Home Made</p>
          <div className='desc'>
            <p className='text-md sm:text-sm mt-4'>
              Indulge in a delightful assortment of handcrafted cakes and cookies that embody the essence of homemade goodness. Our collection is a testament to freshness, crafted with care to create flavors that are simply irresistible.</p></div>
          <Link to='/home'>
            <button className='explore mt-4'>Explore now</button>
          </Link>
        </div>
        <div className='topper ml-8'>
          <img src={topper} height={125} width={125} alt="Hero Section" />
        </div>
        <div className='topper2 ml-8'>
          <img src={topper2} height={100} width={100} alt="Hero Section" />
        </div>
        <div className='ml-8 lpmain'>
          <img src={hero} height={500} width={250} />
        </div>
      </div>
      <div className='main2 mt-4 pb-3'>
        <h1 className='title2 font-bold text-2xl pt-8'>TREATS FOR EVERY TASTE</h1>
        <p className='tagline text-xl pt-2'>Cakes, Cookies, Cup cakes & much more</p>
        <div class="mx-auto max-w-[80%] py-2  border-b border-black"></div>
        <div className='grid mt-8 mb-4'>
          
            <img className='lpimgs' src={cookie} height={300} width={300} />
          
            <img className='lpimgs' src={cake} height={300} width={300} />
          
            <img className=' lpimgs' src={cupcakes} height={300} width={300} />
          
        </div>
      </div>
      <div className='instagram'>
        <h1 className='tagline2 font-bold text-2xl pt-8 text-center'>follow us @little_hearts</h1>
        <div className='mt-4 flex flex-row gap-6 items-center justify-center instagram'>
          <img src={cake1} height={150} width={150} />
          <img src={cup1} height={150} width={150} />
          <img src={cake2} height={150} width={150} />
          <img src={cookie1} height={150} width={150} />
          <img src={cup2} height={150} width={150} />
          <img src={cake3} height={150} width={150} />
        </div>
        <Link to='https://www.instagram.com/way2mouth/?next=%2F'>
          <div className='flex items-center justify-center'>
            <button className='follow mt-4 mx-auto'>Follow Us</button></div>
        </Link>
      </div>
      <Footer />
    </div>
  )
}