import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../context/useAxiosSecure';

const MyBids = () => {

    const {user} = use(AuthContext);
    const [bids, setBids] = useState([]);
    const axiosSecure = useAxiosSecure();

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log('My Bids:', data);
    //                 setBids(data);
    //             })
    //     }
    // }, [user]);


    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/bids?email=${user.email}`)
                .then(res => {
                    console.log('My Bids:', res.data);
                    setBids(res.data);
                });
        }
    }, [user, axiosSecure]);



    const handleDeleteBids = (_id) => {
     Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {

            fetch(`http://localhost:3000/bids/${_id}`, {
                method: "DELETE",
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your bid has been deleted.",
                    icon: "success"
                    });
                    
                    const remainingBids = bids.filter(bid => bid._id !== _id);
                    setBids(remainingBids);
                }
            })
        }
    });



    };

    return (
        <>

        <div className='py-[55px] dm:py-[70px]'>
            <div className='container'>
                    <h2 className='text-[32px] md:text-[44px] text-50px] font-bold text-[#001931] text-center mb-[30px]'>My Bids: <span className='text-[#7F46EA]'>{bids.length}</span></h2>
                <div> 
                    <div className="w-full bg-white rounded-lg shadow-md overflow-scroll">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">SL No</th>
                                    <th className="px-6 py-3 font-semibold">Product</th>
                                    <th className="px-6 py-3 font-semibold">Seller</th>
                                    <th className="px-6 py-3 font-semibold">Bid Price</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
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
                                    <td className={`px-6 py-4 font-semibold ${
                                        bid.status === 'success'
                                        ? 'text-green-600'
                                        : bid.status === 'pending'
                                        ? 'text-yellow-500'
                                        : 'text-gray-500'
                                    }`}
                                    >
                                    {bid.status === 'success' ? 'Success' : bid.status === 'pending' ? 'Pending' : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button onClick={() => handleDeleteBids(bid._id)} className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"> Remove Bid </button>
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

export default MyBids;
