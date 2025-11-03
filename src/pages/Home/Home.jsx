import React from 'react';
import Banner from './Banner';
import LatestProducts from './LatestProducts';

const latestProductsPromise = fetch('http://localhost:3000/latest-product').then(res => res.json());

const Home = () => {
    return (
        <>
           <Banner></Banner>
           <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </>
    );
};

export default Home;