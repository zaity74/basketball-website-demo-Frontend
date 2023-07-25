import './page_banner.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Banner(props) {
    const { title, backgroundImageUrl } = props
    // State
    // New constantes

    
  
    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
        <div className='banner' style={{ backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.57) 0%, rgba(0, 0, 0, 0) 80%), url(${backgroundImageUrl})` }}>
            <h1>{title}</h1>
        </div>
      </>
    );
  }
  
  export default Banner;