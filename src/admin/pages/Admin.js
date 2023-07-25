import './Admin.scss';
import BasicContainer from '../componnents/container/basic_container';
import NavContainer from '../componnents/container/nav_container';
import ContentContainer from '../componnents/container/content_container';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Footer from '../../componnents/footer/footer';

function Admin(props) {
    // State
    // New constantes

    
  
    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
        <BasicContainer>
            <NavContainer>

            </NavContainer>
            <ContentContainer>
                <h1>Welcome to admin page</h1>
            </ContentContainer>
        </BasicContainer>

      </>
    );
  }
  
  export default Admin;