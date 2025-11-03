import React, { use } from 'react';
import Product from './Product';

const LatestProducts = ({latestProductsPromise}) => {

    const products = use(latestProductsPromise);

    return (
        <>
            <div className='py-20'>
                <div className='container'>
                    <h2 className='text-[30px] sm:text-[38px] md:text-[50px] font-bold text-[#001931] text-center'>Recent <span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Products</span></h2>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                        {
                            products.map(product => <Product key={product._id} product={product}></Product>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LatestProducts;