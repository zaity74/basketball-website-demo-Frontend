import './panier.scss';
import Navbar from '../../componnents/header/navbar/login';
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';
import { getCartItems, decreaseCartItem, increaseCartItem, removeCart, clearCart } from '../../redux/action/cartAction';
import { listeProduct } from '../../redux/action/productAction';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Panier(props) {

  // STATE
  const [isAdded, setIsAdded] = useState({});
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [loadingDelay, setLoadingDelay] = useState(true);

  // DATA AND USE CONSTANTE
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalItem } = useSelector((state) => state.allCartItems.cartItems);
  const { loading, error } = useSelector((state) => state.allCartItems);
  const isLogin  = useSelector(state => state.userLogin.isLogin);

  // EFFECTS
  useEffect(() => {
    const fetchCartItems = async() => {
      try {
        await dispatch(getCartItems());
      } catch (error) {
        console.log("nous avons pas pu récupérer les données", error);
      }
    }
    fetchCartItems();

    const fetchProduct = async () => {
      await dispatch(listeProduct({}));
    }
    fetchProduct();

    const loadingTimer = setTimeout(() => {
      setLoadingDelay(false);
    }, 1000); // Délai de 1 seconde avant de masquer le chargement

    return () => clearTimeout(loadingTimer);

  }, [dispatch, totalPrice]);

  // FUNCTIONS
  const decreaseQuantity = async (id) => {
    await dispatch(decreaseCartItem(id));
    await dispatch(getCartItems());
  };

  const increaseQuantity = async (id) => {
    await dispatch(increaseCartItem(id));
    await dispatch(getCartItems());
  };

  const removeItem = async(id) => {
    try {
      await dispatch(removeCart(id));
      await dispatch(getCartItems());
    } catch(error) {
      console.error('Erreur lors de la suppression de l\'élément du panier:', error);
    }
  };

  const handleClearCart = async() => {
    try {
      await dispatch(clearCart());
      localStorage.removeItem("addedProducts");
      await dispatch(getCartItems());
    } catch(error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="panier_section">
        <div className="container">
          {error && !isLogin ? (
            <div className='logoutUser'>
              <p>
                You need to be logged in to add items to the cart, please <br></br> <Link to={'/login'}>log in</Link> or <Link to={'/register'}>create an account</Link>.
              </p>
            </div>
          ) : loading || loadingDelay ? (
            <p className="loading show">Loading...</p>
          ) : (
            <div className="cart_content  show">
              <div className="cart_items">
                {cartItems && cartItems.length === 0 ? (
                  <>
                  <h2>Votre panier est actuellement vide...</h2>
                  <div>
                    <Link to={'/boutique'}>Continuer mes achats</Link>
                  </div>
                  </>
                ) : (
                <>
                  <div className="top">
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                      Vous avez {totalItem ? totalItem : 0} produits ajoutés à votre panier
                    </p>
                    <button className="clearCart" onClick={handleClearCart}>
                      <BsTrash className="item-remove" />
                      Vider le panier
                    </button>
                  </div>
                  {
                    cartItems && cartItems.map((cart, index) => (
                      <div className="item" key={index}>
                        <img className="item-image" src={cart.image} alt="cart item" />
                        <Link className="cartLink" to={`/boutique/${cart.product}`}>
                          <h3 className="item-title">{cart.name}</h3>
                        </Link>
                        <div className="item-action">
                          <p className="item-price">Price: {cart.price}€</p>
                          <div className="item-quantity">
                            <button onClick={() => decreaseQuantity(cart._id)}>-</button>
                            <p>Quantity: {cart.qty}</p>
                            <button onClick={() => increaseQuantity(cart._id)}>+</button>
                          </div>
                          <BsTrash className="item-remove" onClick={() => removeItem(cart._id)} />
                        </div>
                        <img className='logo' src='https://cranpringy-basket.com/wp-content/uploads/2022/10/Logo_CPB_petit.png'
                        alt='logo' />
                      </div>
                    ))
                  }
                  </>
                )}
              </div>
              <div className="cart_summary">
                <h2>Résumé du panier</h2>
                <div className="summary_item">
                  <p>Total Items: {totalItem}</p>
                  <p>Total Price: {totalPrice && totalPrice}€</p>
                </div>
                <button className="checkout_btn">Passer à la caisse</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Panier;


