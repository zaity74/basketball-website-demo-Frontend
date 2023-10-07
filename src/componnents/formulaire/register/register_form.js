import '../login/login_form.scss';
import BasicContainer from '../../../admin/componnents/container/basic_container';

// Redux import 
import { userRegister } from '../../../redux/action/userActions';
// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function RegisterForm(props) {
    // State
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // New constantes
    const dispatch = useDispatch();
    const { isRegiter } = useSelector(state => state.userRegister)

    
  
    // Page load
  
    // Events
    const handleRegister= async (e) => {
        e.preventDefault();
        // do something with the email and password
        dispatch(userRegister(firstname, lastname, email, password));
      };
   
    // Variables
  
    return (
      <>
            <div className='section-login'>
            <div className='container'>
            <div className='login-section'>
            <form className='loginForm' onSubmit={handleRegister}>
                <div className='intro'>
                    <h2>Register with your e-mail address</h2>
                </div>
                <div className='entry'>
                    <div className='left'>
                    <div className='entry-item'>
                        <label>
                            Firstname
                        </label>
                        <input 
                            type='text' 
                            id='firstname' 
                            placeholder='Enter your firstname' 
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>

                    <div className='entry-item'>
                        <label >
                            Lastname
                        </label>
                        <input 
                            type='text' 
                            id='lastname' 
                            placeholder='Enter your lastname' 
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
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
  
  export default RegisterForm;