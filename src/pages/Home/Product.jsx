import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {

    const {image, title, price_min, price_max, _id} = product;
    
    return (
        <>
           <div className='p-4 rounded-lg shadow-sm'>
                <img className='w-full h-[275px] object-cover' src={image} alt="images" />
                <h2 className='pt-3 text-[22px] text-[#001931] font-semibold'>{title}</h2>
                <h6 className='py-3 text-[20px] font-medium text-[#7F46EA]'>$ {price_min} - {price_max}</h6>
                <Link to={`/product-details/${_id}`} className='text-center py-1.5 border border-[#7F46EA] rounded w-full text-[17px] font-semibold text-[#7F46EA] bg-white hover:bg-[#7F46EA] hover:text-white duration-200 block'>View Details</Link>
           </div>
        </>
    );
};

export default Product;