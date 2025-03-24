import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsTrash } from 'react-icons/bs';
import { getAllWishlist, removeFromWishlist, clearWishlist } from "../../redux/action/wishlistAction";
import { userLogin } from "../../redux/action/userActions";
import Navbar from "../../componnents/header/navbar/login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './wishlist.scss'; // Assurez-vous de créer ce fichier pour les styles CSS

const Wishlist = () => {


    // CONST DATA API AND USE CONSTANTE
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getAllWishlist);
  const { totalItem, wishlistItem } = useSelector((state) => state.getAllWishlist.wishlist);
  const isLogin  = useSelector(state => state.userLogin.isLogin);

//   EFFECTS 1
  useEffect(() => {
    // Load all wishlist : to get info about it
    const fetchWishlist = async () => {
        if(!isLogin){
            return;
        }
        await dispatch(getAllWishlist());   
    }
    fetchWishlist();

  }, [dispatch, isLogin]);

//   FUNCTIONS
  const handleRemoveFromWishlist = async (id) => {
        await dispatch(removeFromWishlist(id));
        await dispatch(getAllWishlist());
        toast.success('Product removed from saved items');
  };

  return (
    <>
     <div className="wishlist-section">
      <div className="container">
        <h2>Saved Items</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error || !isLogin ? (
          <div>
            You have no Saved Items <br></br>
            Sign in to sync your Saved Items across all your devices.
            <Link to={'/login'}>Login</Link> or <Link to={'/register'}>Create an account</Link>
          </div>
        ) : (
        <>
            <p>{totalItem === 0 ? '' : 'there is ' + totalItem + 'items' }</p>
            <div className="wishlist-items">
            {wishlistItem && wishlistItem.length === 0 ? (
              <p>Votre wishlist est vide.</p>
            ) : 
                wishlistItem && wishlistItem.map((item) => (
                    <div className="wishlist-item" key={item._id}>
                        <Link to={`/boutique/${item.product}`}>
                            <img src={item.image} alt={item.title} className="item-image" />
                        </Link>
                        <div className="item-details">
                            <Link to={`/boutique/${item.product}`}>
                            <h3>{item.name}</h3>
                            </Link>
                            <p>{item.price}€</p>
                            <button onClick={() => handleRemoveFromWishlist(item._id)} className="remove-button">
                            <BsTrash /> Remove
                            </button>
                        </div>
                    </div>
                ))
            }
          </div>
        </>
        )}
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Wishlist;
