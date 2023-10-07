import './login.scss';
import { Link } from 'react-router-dom';

// Redux import 
import { userLogin } from '../../../redux/action/userActions';
import { userLogout } from '../../../redux/action/userActions';

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HiUserCircle, HiOutlineMagnifyingGlass, HiOutlineShoppingCart } from "react-icons/hi2";
import { CgMenuGridR } from 'react-icons/cg'


function Navbar(props) {
    // State
    const [isWindowDown, setWindowDown] = useState(false);
    // New constantes
    const dispatch = useDispatch()
    const isLogin  = useSelector(state => state.userLogin.isLogin);

    
  
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
                <Link className='burger' to={'/'}>
                  <CgMenuGridR className='icone' />
                  Accueil
                </Link>
                <div className='login-container'>
                      {
                        isLogin && isLogin ? 
                          <div className='connexion'>
                            <Link onClick={handleLogout}  className='link' to={'/login'}>
                                Déconnexion
                            </Link>
                            <HiUserCircle className='icone' />
                        </div>
                        :
                        <>
                          <div className='connexion'>
                              <Link className='link' to={'/login'}>
                                  Connexion
                              </Link>
                              <HiUserCircle className='icone' />
                          </div>
                          <div className='connexion'>
                              <Link className='link' to={'/register'}>
                                  S'inscrire
                              </Link>

                          </div>
                        </>
                      }
                     <div className='register'>
                          <Link className='link' to={'/panier'}>
                              Panier
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