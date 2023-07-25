import './social.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsHeartFill } from 'react-icons/bs';

function Social(props) {
    // State
    const [showVideo, setShowVideo] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveForward, setMoveForward] = useState(false);
    // New constantes
     // New constantes
   

    // Function
      

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
          <section id="wrap">
            <div className='container'>
                <p className='slogan'>#Best swiss team#</p>
                <h4>
                    <span>Follow </span>
                    us
                </h4>
                <div className='social-container'>
                    <div className='social'>
                        <img className='logo' src='https://rbleipzig.com/assets/images/logos/socials/facebook.svg' alt='facebook' />
                        Facebook
                    </div>
                    <div className='social'>
                    <img className='logo' src='https://rbleipzig.com/assets/images/logos/socials/instagram.svg' alt='facebook' />
                        Instagram
                    </div>
                    <div className='social'>
                    <img className='logo' src='https://rbleipzig.com/assets/images/logos/socials/twitter.svg' alt='facebook' />
                        Twitter
                    </div>
                    <div className='social'>
                        <img className='logo' src='https://rbleipzig.com/assets/images/logos/socials/tiktok.svg' alt='facebook' />
                            Tiktok
                    </div>
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default Social;