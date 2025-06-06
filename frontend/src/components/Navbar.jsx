import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import avatarImg from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const navigation=[
  {name:"Dashboard", href:"/dashboard"},
  {name:"Orders", href:"/orders"},
  {name:"Cart Page", href:"/cart"},
  {name:"Check Out", href:"/checkout"},

  
]

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.cartItems);

  const {currentUser, logout} = useAuth();

  const handleLogOut = () => {
    logout();

  };

  
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
        {/* left side */}
        <div className='flex items-center md: gap-16 gap -4'> 
          <Link to ='/'>
          <HiBars3CenterLeft className="size-6" />
          </Link>

         {/* search and input */}
          <div className='relative sm:w-72 w-40 space-x-2'>
           <IoIosSearch  className='absolute inline-block left-2 inset-y-2 '/>
           <input type='text' placeholder='Search here' 
           className='bg-[#EAEAEA] w-full p-1 md:px-8 px-6 rounded-md focus:outline-none '
           />
          </div>
        </div>

        
        {/* right side */}
        <div className='relative flex items-center md:space-x-3 space-x-2'> 
          <div>
            {
            currentUser ? <>
            <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
            <img src={avatarImg} alt="Image" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />

            </button>
            {/* dropdowns */}
            {
              isDropdownOpen &&(
                <div className='absolute right-0 mt-2 w-48 bg-white ssadow-lg rounded-md z-40>'>
                  <ul className='py-2'>
                     {
                      navigation.map((item)=>(
                        <li key={item.name}>
                          <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                          {item.name}
                          </Link>
                        </li>
                      ))
                    }
                    <li
                      onClick ={ handleLogOut }>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout

                      </button>
                    </li>
                  </ul>
                </div>
              )
            }
             </> : <Link to='/login'><FaRegUser className='size-6' /></Link>
            }         
          </div>
               
               <button className='hidden sm:block'>
               <FaRegHeart className='size-6'/>
               </button>
               <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
               <AiOutlineShoppingCart />
               {
                 cartItems.length > 0 ?  <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> :  <span className="text-sm font-semibold sm:ml-1">0</span>
              }
                        
               </Link>

        </div>

        </nav>
        </header>
  )
}

export default Navbar; 