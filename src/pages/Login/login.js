import './login.scss';
import Footer from '../../componnents/footer/footer';
import BasicContainer from '../../admin/componnents/container/basic_container';
import Navbar from '../../componnents/header/navbar/login';
import LoginForm from '../../componnents/formulaire/login/login_form';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Login(props) {
    // State
    // New constantes

    
  
    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
        <Navbar/>
          <LoginForm />
        <Footer />
      </>
    );
  }
  
  export default Login;