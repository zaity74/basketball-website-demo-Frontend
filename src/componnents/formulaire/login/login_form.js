import './login_form.scss';
import BasicContainer from '../../../admin/componnents/container/basic_container';
import Footer from '../../footer/footer';

// Redux import 
import { userLogin } from '../../../redux/action/userActions';
// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function LoginForm(props) {
    // State
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // New constantes
    const dispatch = useDispatch();
    const { isLogin, user } = useSelector(state => state.userLogin);

    
  
    // Page load
  
    // Events
    const handleLogin= async (e) => {
        e.preventDefault();
        // do something with the email and password
        dispatch(userLogin(email,password));
      };
   
    // Variables
  
    return (
        <>
        <div className='section-login'>
            <div className='container'>
            <div className='login-section'>
            <form className='loginForm' onSubmit={handleLogin}>
                <div className='intro'>
                    {
                        isLogin && isLogin ? 
                        <h2>Bienvenue {user && user.userFound.firstname}</h2>
                        : <h2>Login with your e-mail address</h2>
                    }
                </div>

                <div className='entry'>
                    <div className='left'>
                        <div className='entry-item'>
                            <label>
                            E-mail address
                            </label>
                        <input 
                            type='email' 
                            id='signIn' 
                            name='email address'
                            placeholder='Email address' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="entry-item">
                        <div className="password-label">
                            <label>
                                Password
                            </label>
                        </div>
                        <input 
                            type="password" 
                            id="password" 
                            name="Password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <a id="forgotPassword" href="#">Forgot your password?</a>
                    </div>

                    <div className="buttons">
                        <button 
                            id="button_form" 
                            type="submit" 
                            >Sign in
                        </button>
                    </div>
                    </div>
                    <div className='image'></div>
                </div>

            </form>
            </div>
            </div>
        </div>
        </>
    );
  }
  
  export default LoginForm;