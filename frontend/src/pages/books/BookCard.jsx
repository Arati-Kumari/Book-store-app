import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../redux/features/cart/CartSlice'

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book))
  }
  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-80 sm:justify-center gap-4 w-full">
    
        <div className="sm:h-72 sm:w-48 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt="bookImage"
              className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200" />
          </Link>
        </div>

        <div className="flex flex-col justify-between">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
        
          <p className="text-gray-600 mb-5">
            {book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
          </p>
          
          <p className="font-medium mb-5">
            ${book?.newPrice} <span className="line-through font-normal ml-2">${book?.oldPrice}</span>
          </p>
          
          <button 
          onClick={() =>handleAddToCart(book)}
          className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
            <FiShoppingCart />
            <span className="ml-2">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
};

export default BookCard;
