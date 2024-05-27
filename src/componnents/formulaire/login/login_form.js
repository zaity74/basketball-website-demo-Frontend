import './login_form.scss';
import BasicContainer from '../../../admin/componnents/container/basic_container';
import Footer from '../../footer/footer';
import { Link } from 'react-router-dom';

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
    const [errors, setErrors] = useState("");

    // New constantes
    const dispatch = useDispatch();
    const { user, isLogin } = useSelector(state => state.userLogin);
    const userLoginState = useSelector(state => state.userLogin);


    // EFFECTS
    useEffect(() => {
        if (userLoginState.error) {
            setErrors(userLoginState.error.message);
            console.log('SHOW ERRORS :',errors)
        }
    }, [userLoginState]);

    
    // Events
    const handleLogin= async (e) => {
        e.preventDefault();
        // do something with the email and password
        await dispatch(userLogin(email,password));
        
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
                        <h2>Bienvenue {user && user.data.user.name.firstname} {user && user.data.user.name.lastname}</h2>
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
                            {errors && <span className='error'>{errors}</span>}
                            <Link id="forgotPassword" to={"/forgot-password"}>Forgot your password?</Link>
                        </div>

                        <div className="buttons">
                            <button 
                                id="button_form" 
                                type="submit" 
                                >Login
                            </button>
                        </div>

                        <div className='existUser'>
                            <Link to={'/register'}>Create an account</Link>
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