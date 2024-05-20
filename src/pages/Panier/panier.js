// LIBRARY AND COMPONENTS
import './panier.scss';
import Navbar from "../../componnents/header/navbar/login";
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';

// REDUX IMPORT
import { getCartItems, decreaseCartItem, increaseCartItem, removeCart, clearCart } from '../../redux/action/cartAction';
import { listeProduct } from '../../redux/action/productAction';

// HOOKS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Panier(props) {

  // STATE
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState({});
  const [totalCartItems, setTotalCartItems] = useState(0);

  // DATA AND USE CONSTANTE
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalItem } = useSelector((state) => state.addToCart.cartItems);
  const products   = useSelector((state) => state.listProduct.product.products);



  // EFFECTS
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

    // Fetch products
    const fetchProduct = async () => {
      await dispatch(listeProduct({}));
    }
    fetchProduct();
    

  }, [dispatch, totalPrice]);

  // FONCTIONS EVENT
  const decreaseQuantity = (id) => {
    dispatch(decreaseCartItem(id));
  };

  const increaseQuantity = (id) => {
    dispatch(increaseCartItem(id));
  };

  const removeItem = async(id, name) => {
    try {
      // Supprimer l'élément du panier
      const removeSingleItem = await dispatch(removeCart(id));

      // Recuperer les ids
      const itemAlreadyExist = products && products.find((cart) => cart.title === name);
      const newId = itemAlreadyExist._id;
  
      // Récupérer les produits ajoutés depuis le localStorage
      const savedIsAdded = JSON.parse(localStorage.getItem("addedProducts"));

      console.log('ID :', newId);
      console.log('savedId :', savedIsAdded);
  
      // Si aucun produit n'est enregistré, il n'y a rien à faire
      if (!savedIsAdded) {
        return removeSingleItem;
      }
      // Filtrer les clés différentes de l'ID
      const filteredKeys = Object.keys(savedIsAdded).filter(key => key !== newId);
  
      // Créer un nouvel objet à partir des clés filtrées et les valeurs correspondantes
      const updatedIsAdded = filteredKeys.reduce((acc, key) => {
        acc[key] = savedIsAdded[key];
        return acc;
      }, {});
  
      console.log(updatedIsAdded, 'find here');
  
      // Mettre à jour `addedProducts` dans l'état et le localStorage
      localStorage.setItem("addedProducts", JSON.stringify(updatedIsAdded));
  
      return removeSingleItem;
    } catch(error) {
      console.error('Erreur lors de la suppression de l\'élément du panier:', error);
    }
  };
  
  

  const handleClearCart = async() => {
    try{
      const removeAllItems = await dispatch(clearCart());
      localStorage.removeItem("addedProducts");
      return removeAllItems;
    }catch(error){
      console.error('Erreur lors de la récupération des données:', error);
    }
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
                      <BsTrash className='item-remove' onClick={() => removeItem(cart._id, cart.name)} />
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
