import React from 'react';

const Banner = () => {
    return (
        <>
            <div className="bg-[url('https://i.ibb.co.com/pBHmCkRx/hero-bg.png')] bg-cover bg-center pt-[70px] pb-[90px]">
                <div className='container'>
                    <h2 className='text-[32px] sm:text-[42px] md:text-[55px] txt-[#001931] font-bold text-center'>Deal your <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Products</span><br /> in a <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Smart</span> way !</h2>
                    <p className='text-[#627382] md:text-[18px] text-center'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
                    <div className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden mt-[22px]">
                        <input type="text" placeholder="Search For Products, Categories..." className="flex-1 px-6 py-3 text-gray-700 focus:outline-none rounded-l-full" />
                        <button className="px-6 py-3.5 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-r-full hover:opacity-90 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex space-x-4 justify-center mt-6">
                        <button className="px-6 py-2 bg-purple-600 text-white rounded hover:opacity-90 transition"> Watch All Products </button>
                        <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"> Post a Product </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;