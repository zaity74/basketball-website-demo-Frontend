import './login.scss';
import { Link } from 'react-router-dom';
import { HiUserCircle, HiOutlineMagnifyingGlass, HiOutlineShoppingCart } from "react-icons/hi2";
import { CgMenuGridR } from 'react-icons/cg'
import { FiHeart } from "react-icons/fi";

// Redux import 
import { userLogin } from '../../../redux/action/userActions';
import { userLogout } from '../../../redux/action/userActions';
import { getCartItems } from '../../../redux/action/cartAction';
import { getCookie } from '../../../redux/action/userActions';
import { tokenExpires } from '../../../redux/action/tokenExpireAction';

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';



function Navbar(props) {
    // State
    const [isWindowDown, setWindowDown] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // API & USE CONSTANTE
    const dispatch = useDispatch()
    const location = useLocation(); 
    const isLogin  = useSelector(state => state.userLogin.isLogin);
    const { totalItem } = useSelector((state) => state.allCartItems.cartItems);


    // EFFECTS 1
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos > prevScrollPos) {
          setWindowDown(true);
        } else {
          setWindowDown(false);
        }
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

    }, [prevScrollPos]);

    // EFFECTS 2
    useEffect(() => {

      // LOAD CART ITEMS : (to get info about totalItems in cart)
      const getCartIt = async() =>{
        try{
          const listeItems = await dispatch(getCartItems());
          return listeItems
        }catch(error){
          console.log("error:", error);

        }
      }
      getCartIt();

    }, [dispatch, totalItem]);

    // EFFECTS 3
    useEffect(() => {

      // if token expires logout user
      const checkTokenExpiration = async () => {
        const authToken = getCookie('authToken');
        if (!authToken) {
          await dispatch(tokenExpires());
        }
      };
  
      const interval = setInterval(checkTokenExpiration, 10 * 60 * 1000); // Vérifie toutes les secondes
  
      return () => clearInterval(interval);
    }, [dispatch]);
  
    // FUNCTIONS
    const handleLogout = async() =>{
      await dispatch(userLogout())
    }
  
    return (
      <>
        <div className={prevScrollPos <= 10 ? 'login' : 'scroll' }>
            <div className='container'>
                <div className='logo-container'>
                    <img className='logo' src='https://cranpringy-basket.com/wp-content/uploads/2022/10/Logo_CPB_petit.png'
                    alt='logo' />
                </div>
                <div className='linkContainer'>
                  <Link className={`burger ${location.pathname === '/' ? 'activeLink' : ''}`} to={'/'}>
                    <CgMenuGridR className='icone' />
                    Home
                  </Link>
                  <Link className={`burger ${location.pathname === '/boutique' ? 'activeLink' : ''}`} to={'/boutique'}>
                    Shop
                  </Link>
                  <Link className={`burger ${location.pathname === '/blog'  ? 'activeLink' : ''}`} to={'/blog'}>
                    Blog
                  </Link>
                </div>
                <div className='login-container'>
                      {
                        isLogin && isLogin ? 
                          <div className='connexion'>
                            <Link onClick={handleLogout}  className={`link ${location.pathname === '/login' ? 'activeLink' : ''}`} to={'/login'}>
                                Logout
                            </Link>
                            <HiUserCircle className='icone' />
                          </div>
                        :
                        <>
                          <div className='connexion'>
                              <Link className={`link ${location.pathname === '/login' ? 'activeLink' : ''}`} to={'/login'}>
                                  Login
                              </Link>
                              <HiUserCircle className='icone' />
                          </div>
                          <div className='connexion'>
                              <Link className={`link ${location.pathname === '/register' ? 'activeLink' : ''}`} to={'/register'}>
                                  Register
                              </Link>

                          </div>
                        </>
                      }
                      <div className='register'>
                          <Link className={`link ${location.pathname === '/saved-items' ? 'activeLink' : ''}`} to={'/saved-items'}>
                              <FiHeart className='icone' />
                          </Link>
                    </div>
                     <div className='register'>
                          <Link className={`link ${location.pathname === '/panier' ? 'activeLink' : ''}`} to={'/panier'}>
                              Bag
                              {
                                /* 
                                  Erreur de lecture du req.userId dans le serveur dans le cas 
                                  ou l'utilisateur est deconnecté. Ainsi l'action ne traite pas le user déconnecté
                                  donc nous utilisons le state isLogin pour vérifier son activité 
                                */
                                totalItem > 0 && isLogin ? 
                                <span>{totalItem && totalItem}</span> : 
                                " "
                              }
                          </Link>
                          <HiOutlineShoppingCart className='icone' />
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default Navbar;