import './login.scss';
import { Link } from 'react-router-dom';
import { HiUserCircle, HiOutlineMagnifyingGlass, HiOutlineShoppingCart } from "react-icons/hi2";
import { CgMenuGridR } from 'react-icons/cg'

// Redux import 
import { userLogin } from '../../../redux/action/userActions';
import { userLogout } from '../../../redux/action/userActions';
import { getCartItems } from '../../../redux/action/cartAction';

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';



function Navbar(props) {
    // State
    const [isWindowDown, setWindowDown] = useState(false);
    // New constantes
    const dispatch = useDispatch()
    const location = useLocation(); 
    const isLogin  = useSelector(state => state.userLogin.isLogin);
    const { totalItem } = useSelector((state) => state.addToCart.cartItems);

    
  
    const [prevScrollPos, setPrevScrollPos] = useState(0);

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

    useEffect(() => {

      const getCartIt = async() =>{
        try{
          const listeItems = await dispatch(getCartItems());
          return listeItems
        }catch(error){
          console.log("error:", error);

        }
      }
      getCartIt();

    }, [totalItem]);
  
    // Events
    const handleLogout = () =>{
      dispatch(userLogout())
    }
   
    // Variables
  
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
                    Accueil
                  </Link>
                  <Link className={`burger ${location.pathname === '/boutique' ? 'activeLink' : ''}`} to={'/boutique'}>
                    Boutique
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
                                Déconnexion
                            </Link>
                            <HiUserCircle className='icone' />
                        </div>
                        :
                        <>
                          <div className='connexion'>
                              <Link className={`link ${location.pathname === '/login' ? 'activeLink' : ''}`} to={'/login'}>
                                  Connexion
                              </Link>
                              <HiUserCircle className='icone' />
                          </div>
                          <div className='connexion'>
                              <Link className={`link ${location.pathname === '/register' ? 'activeLink' : ''}`} to={'/register'}>
                                  S'inscrire
                              </Link>

                          </div>
                        </>
                      }
                     <div className='register'>
                          <Link className={`link ${location.pathname === '/panier' ? 'activeLink' : ''}`} to={'/panier'}>
                              Panier
                              {
                                totalItem > 0 ? 
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