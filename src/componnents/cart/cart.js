
// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { BsHeartFill } from 'react-icons/bs';

function Cart(props) {
    const { cart, handleAddToCart } = props;
    // State
    // New constantes

    // New constantes
     const categoryStyles = {

        shorts : { backgroundColor: '#84374E' },
        accessoires : { backgroundColor: '#222222' },
        sweetshirts: { backgroundColor: '#A2596C' },
        jersey: { backgroundColor: '#FFD700' },
        // Ajoutez plus de catégories et de styles selon vos besoins
    };
    
   

    // Function
      


    const cartDisplay = cart && cart.map((article, index) => (
        <div className='cart' key={index}>
            <div className='image-container'>
                <img className='image' src={article.image} alt='category picture' />
                <div style={categoryStyles[article.category] || {}} className='new'>{article.category}</div>
            </div>
            <Link to={`/boutique/${article._id}`} className='title-cart'>{article.title}</Link>
            <div className='text'>
                <p className='price'>{article.price}€</p>
                <p onClick={() => handleAddToCart(article._id,article.qty)} className='link'>
                    Add to cart
                </p>
            </div>
            <Link className='like' to={'/'}>
                <BsHeartFill className='icone' />
            </Link>
        </div>
      ))

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>

            {cartDisplay}
      </>
    );
  }
  
  export default Cart;