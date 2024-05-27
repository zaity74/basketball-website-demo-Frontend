import '../login/login_form.scss';
import { Link } from 'react-router-dom';

// Redux import 
import { userLogin } from '../../../redux/action/userActions';
import { forgotPassword } from '../../../redux/action/userActions';

// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function ForgotForm(props) {
    // State
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");

    // New constantes
    const dispatch = useDispatch();
    const { isLogin, user } = useSelector(state => state.userLogin);
    const forgotPasswordState = useSelector(state => state.forgotPassword);

    // EFFECTS
    useEffect(() => {
        if (forgotPasswordState && forgotPasswordState.error) {
            setErrors(forgotPasswordState.error.message)
            console.log('show:', errors);
        }
    }, [forgotPasswordState]);
  
    // Events
    const submitEmail= async (e) => {
        try{
            e.preventDefault();
            // do something with the email and password
            await dispatch(forgotPassword(email));

        }catch(error){
            console.log('Error : ',error.response.data);
        }
      };
   
    // Variables
  
    return (
        <>
        <div className='section-login'>
            <div className='container'>
            <div className='login-section'>
            <form className='loginForm' onSubmit={submitEmail}>
                <div className='intro'>
                    <h2>Reset your password </h2>
                </div>

                <div className='entry'>
                    <div className='left'>
                        <p className='infoForm'>Please enter your e-mail address below. We will send you instructions on how to create a new password.</p>
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
                        <div className="buttons">
                            <button 
                                id="button_form" 
                                type="submit" 
                                >Send a login link
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
  
  export default ForgotForm;