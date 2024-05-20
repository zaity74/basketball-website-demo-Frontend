import { createBrowserHistory } from 'history';
import { BsHeartFill } from 'react-icons/bs';

// Redux import 
import { getCartItems } from "../../redux/action/cartAction";
import { addToCart } from '../../redux/action/cartAction';

// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Cart(props) {
    const { cart, isAdded, setIsAdded } = props;
    const storedProducts = localStorage.getItem('addedProducts');
    // STATE

    // DATA RESPONSE AND USE CONSTANTE
    const { cartItems } = useSelector((state) => state.addToCart.cartItems);
    const dispatch = useDispatch();

    // EFFECTS 
    useEffect(() => {
        const initializeAddedProducts = async () => {
          const listePanier = await dispatch(getCartItems());
          return listePanier;
        };
  
        initializeAddedProducts();
  
        if (storedProducts && storedProducts.length === 0) {
          // Si le tableau pokedex est vide, définir isAdded à false
          setIsAdded({});
          // Vider également le tableau isAdded dans le localStorage
          localStorage.removeItem("addedProducts");
      }
      }, [dispatch, storedProducts]);
  
    useEffect(() => {
        // Récupérer isAdded du localStorage lors du chargement de la page
        const savedIsAdded = JSON.parse(localStorage.getItem("addedProducts"));
        if (savedIsAdded) {
            setIsAdded(savedIsAdded);
        }
    }, []);
    
  
    // FUNCTIONS
    const handleAddToCart = async (id, qty, name) => {
        const itemAlreadyExist = cartItems && cartItems.find((cart) => cart.name === name);
    
        if (itemAlreadyExist ) {
            alert('Item already exists in cart');
            return;
        }
    
        try {
            await dispatch(addToCart(id, { qty }));
    
            // Ajouter l'ID du produit ajouté à isAdded
            setIsAdded(prevIsAdded => {
                const newIsAdded = { ...prevIsAdded, [id]: true }; // Utilisez newItem._id pour accéder à l'ID de l'élément
                localStorage.setItem("addedProducts", JSON.stringify(newIsAdded));
                return newIsAdded;
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };
    
    

    // New constantes
     const categoryStyles = {

        shorts : { backgroundColor: '#84374E' },
        accessoires : { backgroundColor: '#222222' },
        sweetshirts: { backgroundColor: '#A2596C' },
        jersey: { backgroundColor: '#FFD700' },
        // Ajoutez plus de catégories et de styles selon vos besoins
    };
    return (
      <>

            {
                cart && cart.map((article, index) => (
                    <div className='cart' key={index}>
                        <div className='image-container'>
                            <img className='image' src={article.image} alt='category picture' />
                            <div style={categoryStyles[article.category] || {}} className='new'>{article.category}</div>
                        </div>
                        <Link to={`/boutique/${article._id}`} className='title-cart'>{article.title}</Link>
                        <div className='text'>
                            <p className='price'>{article.price}€</p>
                            <p onClick={() => handleAddToCart(article._id,article.qty, article.title)} 
                            className={ ` link ${isAdded[article._id] ? 'buttonAdded' : ' '} ` }
                            >
                                {isAdded[article._id] ? 'Ajouté' : 'Ajouter au panier'}
                            </p>
                        </div>
                        <Link className='like' to={'/'}>
                            <BsHeartFill className='icone' />
                        </Link>
                    </div>
                ))
            }
      </>
    );
  }
  
  export default Cart;