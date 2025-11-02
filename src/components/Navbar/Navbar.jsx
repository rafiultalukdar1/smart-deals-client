import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {

    const {user, logOut} = use(AuthContext);
    const [open, setOpen] = useState(false);

    // Log Out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You logged out successfully!');
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    const links = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/all-products'>All Products</NavLink>
        <NavLink to='/my-products'>My Products</NavLink>
        <NavLink to='/my-bids'>My Bids</NavLink>
        <NavLink to='/create-product'>Create Product</NavLink>
    </>

    return (
        <>
            <div className='bg-[#F8F8F8] shadow-sm py-2.5 sticky top-0 z-99'>
                <div className='navbar container'>
                    <div className='navbar-start'>
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='lg:hidden cursor-pointer mr-3.5'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
                            </svg>
                            </div>
                            <nav tabIndex='-1' className='menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow px-5 py-3 space-y-1.5'>
                                {links}
                            </nav>
                        </div>
                        <NavLink to='/' className='flex items-center gap-1.5 text-[22px] font-bold text-[#001931]'>Smart<span className='text-[#7F46EA]'>Deals</span></NavLink>
                    </div>
                    <div className='navbar-center hidden lg:flex'>
                        <nav className='flex items-center gap-[22px]'>
                            {links}
                        </nav>
                    </div>
                    <div className='navbar-end'>
                        {
                            user ? (
                                <>
                                    <div className='relative'>
                                        <div>
                                            <img onClick={() => setOpen(!open)} src={user.photoURL}  className='w-11 h-11 object-cover rounded-full cursor-pointer'/>
                                        </div>
                                        {
                                            open ? (
                                            <div className='absolute menu bg-base-100 right-0 w-[235px] px-[15px] py-[22px] rounded-lg shadow-xl'>
                                                <h2 className='text-[20px] text-[#141414] font-semibold'>{user.displayName}</h2>
                                                <p className='text-[14px] text-[#141414]'>{user.email}</p>
                                                <button onClick={handleLogOut} className='py-1.5 bg-[#7F46EA] text-white text-[16px] font-medium rounded-lg w-full mt-2.5'>LogOut</button>
                                            </div>
                                            ) : ('')
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex items-center gap-2'>
                                        <NavLink to='/login' className='py-2 px-[25px] bg-white rounded-lg text-[#7F46EA] border border-[#7F46EA] text-[18px] font-semibold'>Login</NavLink>
                                        <NavLink to='/register' className='py-2 px-[25px] bg-white rounded-lg text-[#7F46EA] border border-[#7F46EA] text-[18px] font-semibold hidden sm:block'>Register</NavLink>
                                    </div>
                                </>)
                            }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;