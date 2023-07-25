// LIBRARY AND COMPONENTS
import './panier.scss';
import Navbar from "../../componnents/header/navbar/login";
import Footer from '../../componnents/footer/footer';

// REDUX IMPORT
import { getCartItems } from '../../redux/action/cartAction';
import { decreaseCartItem } from '../../redux/action/cartAction';
import { increaseCartItem } from '../../redux/action/cartAction';
import { removeCart } from '../../redux/action/cartAction';

// HOOKS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import { BsTrash } from 'react-icons/bs';

function Panier(props) {
  // STATE
  // New constantes
  const dispatch = useDispatch();

  // New constantes
  const  { cartItem, totalPrice }  = useSelector((state) => state.addToCart.cartItems);
  
  
  // PAGE LOAD
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // FONCTIONS EVENT
  const decreaseQuantity = (id) => {
    
    setTimeout(() => {
      dispatch(decreaseCartItem(id));
      window.location.reload();
    },200);
  };
  const increaseQuantity = (id) => {
    
    setTimeout(() => {
      dispatch(increaseCartItem(id));
      window.location.reload();
    },200);
  };

  const removeItem = (id) => {
    
    setTimeout(() => {
      dispatch(removeCart(id));
      window.location.reload();
    },200);
  };

  // CONSTANTES
  
  const items = cartItem && cartItem.map((cart, index) => {
    return (
      <div className='item' key={index}>
        <img className='item-image' src={cart.image} />
        <h3 className='item-title'>{cart.name}</h3>
        <div className='item-action'>
          <p className='item-price'>Price : {cart.price}€</p>
          <div className='item-quantity'>
            <button onClick={() => decreaseQuantity(cart._id)}>-</button>
            <p>Quantity: {cart.qty}</p>
            <button onClick={() => increaseQuantity(cart._id)}>+</button>
          </div>
          <BsTrash className='item-remove' onClick={()=>removeItem(cart._id)} />
        </div>
      </div>
    );
  });





  return (
    <>
    <Navbar />
        <div class="panier_section">
          <div className="container">
            {
              items
            }
            <div className='totalPrice'>
              <p>Prix total : {totalPrice && totalPrice}€</p>
            </div>

          </div>
        </div>
      <Footer />
    </>
  );
}

export default Panier;