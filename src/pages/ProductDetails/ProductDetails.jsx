import React, { use, useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {

    const [bids, setBids] = useState([]);
    const {user} = use(AuthContext);
    const product = useLoaderData();
    const navigate = useNavigate();
    const bidModalRef = useRef(null);
    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const {image, condition, usage, description, price_min, price_max, _id, created_at, seller_image, seller_name, email, location, seller_contact, status} = product;


    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        const contact = e.target.contact.value;

        // console.log(name, email, bid, _id, contact)

        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            buyer_contact: contact,
            status: status,
            buyer_image: user?.photoURL,
            bid_price: bid,
        };

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId) {
                    bidModalRef.current.close();
                    toast.success('Bid submitted successfully!');
                    e.target.reset();
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                }
            })

    }

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${_id}`,{
            headers : {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Bids for this products', data);
                setBids(data);
            })
    },[_id, user]);
    

    return (
        <>
            <div className='py-20'>
                <div className='container grid lg:grid-cols-2 gap-7'>
                    <div>
                        <img className='w-full h-[300px] sm:h-[500px] object-cover rounded-lg' src={image} alt="" />
                        <div className='mt-8 p-6 bg-white rounded-lg shadow-sm'>
                            <h4 className='text-[20px] md:text-[24px] font-semibold text-[#001931]'>Product Description</h4>
                            <div className='flex flex-col sm:flex-row justify-between sm:items-center pt-7 pb-4 border-b'>
                                <p className='text-[16px] font-semibold text-[#7F46EA]'>Condition : <span className='text-[#001931]'>{condition}</span></p>
                                <p className='text-[16px] font-semibold text-[#7F46EA]'>Usage Time : <span className='text-[#001931]'>{usage}</span></p>
                            </div>
                            <p className='text-[#969A9D] text-[16px] mt-5'>{description}</p>
                        </div>
                    </div>
                    <div>
                        <button  onClick={() => navigate(-1)} className='flex items-center gap-1.5 text-[20px] text-[#001931] font-semibold'><FaArrowLeft size={18} /> Back to Products</button>
                        <div className='mt-6 p-6 bg-white rounded-lg shadow-sm'>
                            <h4 className='text-[22px] md:text-[28px] font-semibold text-[#4CAF50]'>$ {price_min} - {price_max}</h4>
                            <p className='text-[16px] text-[#001931]'>Price starts from </p>
                        </div>
                        <div className='mt-6 p-6 bg-white rounded-lg shadow-sm'>
                            <h4 className='text-[20px] md:text-[24px] font-semibold text-[#001931 mb-3'>Product Details</h4>
                            <p className='text-[15px] font-medium text-[#001931] py-1.5'>Product ID: {_id}</p>
                            <p className='text-[15px] font-medium text-[#001931]'>Posted: {new Date(created_at).toLocaleString()}</p>
                        </div>
                        <div className='mt-6 p-6 bg-white rounded-lg shadow-sm'>
                            <h4 className='text-[20px] md:text-[24px] font-semibold text-[#001931 mb-2'>Seller Information</h4>
                            <div className='flex items-center gap-5 pt-1.5 pb-3'>
                                <img src={seller_image} alt={seller_name} className='w-16 h-16 rounded-full object-cover bg-[#f5f5f5] overflow-hidden' />
                                <div>
                                    <h4 className='text-[#001931] text-[18px] font-semibold'>{seller_name}</h4>
                                    <p className='text-[14px]'>{email}</p>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#001931] font-semibold'>Location: <span className='font-normal'>{location}</span></p>
                            <p className='text-[16px] text-[#001931] font-semibold py-1.5'>Contact: <span className='font-normal'>{seller_contact}</span></p>
                            <p className='text-[16px] text-[#001931] font-semibold'>Status: <span className='font-normal text-[12px] bg-[#FFC107] rounded-full px-2 py-1'>{status}</span></p>
                        </div>
                        <button onClick={handleBidModalOpen} className='py-2 w-full bg-[#7F46EA] rounded mt-8 text-white text-[18px] font-medium'>I want Buy This Product</button>
                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-[22px] md:text-[26px] text-[#001931] mb-2">Give Seller Your Offered Price!</h3>
                                {/* Bids form */}
                                <form onSubmit={handleBidSubmit}>
                                    {/* Name Field */}
                                    <label className="form-label">Your Name</label>
                                    <input name='name' className='form-input' type="text" defaultValue={user.displayName} readOnly/>
                                    {/* Email Field */}
                                    <label className="form-label">Email address</label>
                                    <input name='email' className='form-input' type="email" defaultValue={user.email} readOnly />
                                    {/* Bids Field */}
                                    <label className="form-label">Bids</label>
                                    <input name='bid' className='form-input' type="text" placeholder="Bids"/>
                                    {/* Contact Info Field */}
                                    <label className="form-label">Contact Info</label>
                                    <input name='contact' className='form-input' type="text" placeholder="Contact Info"/>
                                    {/* Button */}
                                    <button type='submit' className='py-2 w-full bg-[#7F46EA] rounded mt-4 text-white text-[18px] font-medium'>Submit Bid</button>
                                </form>
                                {/* Bids form */}
                                
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
                <div className='container'>
                    <h2 className='py-10 text-[30px] sm:text-[40px] lg:text-[45px] font-bold text-[#001931]'> Bids For This Products: <span className='text-[#7F46EA]'>{bids.length}</span></h2>

                    <div> 
                        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">SL No</th>
                                        <th className="px-6 py-3 font-semibold">Product</th>
                                        <th className="px-6 py-3 font-semibold">Seller</th>
                                        <th className="px-6 py-3 font-semibold">Bid Price</th>
                                        <th className="px-6 py-3 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bids.map((bid, index) => ( <tr key={bid._id} className="shadow-sm">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden"> {bid.product?.image && ( <img src={bid.product.image} alt={bid.product.title} className="w-full h-full object-cover" /> )} </div>
                                                <div>
                                                    <p className="font-medium">{bid.product?.title}</p>
                                                    <p className="text-gray-500 text-xs">${bid.product?.price}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden"> {bid.buyer_image && ( <img src={bid.buyer_image} alt={bid.buyer_name} className="w-full h-full object-cover" /> )} </div>
                                                <div>
                                                    <p className="font-medium">{bid.buyer_name}</p>
                                                    <p className="text-gray-500 text-xs">{bid.buyer_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold">${bid.bid_price}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button className="px-3 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition"> Accept Offer </button>
                                            <button className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"> Reject Offer </button>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;