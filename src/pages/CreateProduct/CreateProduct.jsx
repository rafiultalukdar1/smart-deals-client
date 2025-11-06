import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const CreateProduct = () => {

    const handleCreateProduct = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const category = e.target.category.value;
        const price_min = parseFloat(e.target.price_min.value);
        const price_max = parseFloat(e.target.price_max.value);
        const email = e.target.email.value;
        const image = e.target.image.value;
        const status = 'pending';
        const location = e.target.location.value;
        const seller_image = e.target.seller_image.value;
        const seller_name = e.target.seller_name.value;
        const condition = e.target.condition.value;
        const usage = e.target.usage.value;
        const description = e.target.description.value;
        const seller_contact = e.target.seller_contact.value;
        const created_at = new Date().toISOString();

        const newProduct = {title, category, price_min, price_max, email, image, status, location, seller_image, seller_name, condition, usage, description, seller_contact, created_at};

        axios.post('http://localhost:3000/products', newProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    toast.success("Product added successfully!");
                }
            })

    };


    return (
        <>
            <div className='py-[50px] lg:py-[70px]'>
                <div className='container'>
                     <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6 bg-[#632EE3] bg-clip-text text-transparent"> Create A Product </h2>
                        <form onSubmit={handleCreateProduct}>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="title" className="form-input" placeholder="e.g. Yamaha Fz Guitar for Sale" />
                                <select name="category" className="form-input">
                                    <option value="">Select a Category</option>
                                    <option value="">Furniture</option>
                                    <option value="">Electronics</option>
                                    <option value="">Musical Instruments</option>
                                    <option value="">Appliances</option>
                                    <option value="">vehicles</option>
                                </select>
                                <input name="price_min" className="form-input" placeholder="Min Price You want to Sale ($)" />
                                <input name="price_max" className="form-input" placeholder="Max Price You want to Sale ($)" />
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-1">
                                        <input type="radio" name="condition" value="Brand New" defaultChecked />
                                        <span>Brand New</span>
                                    </label>
                                    <label className="flex items-center space-x-1">
                                        <input type="radio" name="condition" value="Used" />
                                        <span>Used</span>
                                    </label>
                                </div>
                                <input name="usage" className="form-input" placeholder="e.g. 1 year 3 month" />
                                <input name="image" className="form-input col-span-2" placeholder="https://..." />
                                <input name="seller_name" className="form-input" placeholder="e.g. Artisan Roasters" />
                                <input name="email" className="form-input" placeholder="Seller Email" />
                                <input name="seller_contact" className="form-input" placeholder="e.g. +1-555-1234" />
                                <input name="seller_image" className="form-input" placeholder="Seller Image URL" />
                                <input name="location" className="form-input col-span-2" placeholder="City, Country" />
                                <textarea name="description" className="form-input col-span-2" placeholder="e.g. I bought this product 3 months ago. did not used more than 1/2 time..."></textarea>
                            </div>
                            <button className="w-full mt-6 bg-[#632EE3] text-white py-3 rounded-lg hover:opacity-90 transition"> Create A Product </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;