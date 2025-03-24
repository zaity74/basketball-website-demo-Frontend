import './social.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsHeartFill } from 'react-icons/bs';
// Importation des icônes FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Social(props) {
    // State
    const [showVideo, setShowVideo] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveForward, setMoveForward] = useState(false);

    // Function
  
    // Page load
    // Events
   
    // Variables
  
    return (
      <section id="wrap">
        <div className='container'>
            <p className='slogan'>#Best swiss team#</p>
            <h4>
                <span>Follow </span>
                us
            </h4>
            <div className='social-container'>
                <div className='social'>
                    <FontAwesomeIcon icon={faFacebookF} />
                    Facebook
                </div>
                <div className='social'>
                    <FontAwesomeIcon icon={faInstagram} />
                    Instagram
                </div>
                <div className='social'>
                    <FontAwesomeIcon icon={faTwitter} />
                    Twitter
                </div>
                <div className='social'>
                    <FontAwesomeIcon icon={faTiktok} />
                    Tiktok
                </div>
            </div>
        </div>
      </section>
    );
}

export default Social;
