// LIBRARY AND COMPONENTS
import './panier.scss';
import Navbar from "../../componnents/header/navbar/login";
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';

// REDUX IMPORT
import { getCartItems, decreaseCartItem, increaseCartItem, removeCart, clearCart } from '../../redux/action/cartAction';

// HOOKS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Panier(props) {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalItem } = useSelector((state) => state.addToCart.cartItems);
  const testData = useSelector((state) => state.addToCart.cartItems);
  // STATE
  const [loading, setLoading] = useState(true)
  const [totalCartItems, setTotalCartItems] = useState(0);


  // PAGE LOAD
  useEffect(() => {
    const fetchCartItems = async() => {
      try{
        const listePanier = await dispatch(getCartItems());
        setLoading(true);
        return listePanier;
      }catch(error){
        console.log("nous avons pas pu récupérer les données", error);
      }finally {
        setLoading(false); // Définir loading à false après la récupération des données
      }
    }
    fetchCartItems();


    console.log(testData)

  }, [dispatch, totalPrice]);

  // FONCTIONS EVENT
  const decreaseQuantity = (id) => {
    dispatch(decreaseCartItem(id));
  };

  const increaseQuantity = (id) => {
    dispatch(increaseCartItem(id));
  };

  const removeItem = async(id) => {
    console.log("item supprimé",id);
    try{
        const removeSingleItem = await dispatch(removeCart(id));
        return removeSingleItem;
    }catch(error){
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // CONSTANTES

  return (
    <>
      <Navbar />
      <div className="panier_section">
        <div className="container">
          <p style={{fontStyle: 'italic', fontSize: ' 0.9rem'}}>Vous avez {totalItem} produits ajouté à votre panier</p>
          {
            loading ? <p>Loading...</p> : (
              cartItems && cartItems.length === 0 ? 
              <h2>Votre panier est vide...</h2> :
              cartItems && cartItems.map((cart, index) => (
                   <div className='item' key={index}>
                    <img className='item-image' src={cart.image} alt='cart item' />
                    <Link className='cartLink' to={`/boutique/${cart._id}`}>
                      <h3 className='item-title'>{cart.name}</h3>
                    </Link>
                    <div className='item-action'>
                      <p className='item-price'>Price: {cart.price}€</p>
                      <div className='item-quantity'>
                        <button onClick={() => decreaseQuantity(cart._id)}>-</button>
                        <p>Quantity: {cart.qty}</p>
                        <button onClick={() => increaseQuantity(cart._id)}>+</button>
                      </div>
                      <BsTrash className='item-remove' onClick={() => removeItem(cart._id)} />
                    </div>
                  </div>
            ))
            )
          }
          <div className='totalPrice'>
            <button className='clearCart' onClick={handleClearCart}>
              <BsTrash className='item-remove' />
              Vider le panier
            </button>
            <p>Prix total : {totalPrice && totalPrice}€</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Panier;
