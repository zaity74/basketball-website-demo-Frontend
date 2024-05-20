import './boutiqueSection.scss';
import Cart from '../../cart/cart';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsHeartFill } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs'

function BoutiqueSection(props) {
    const { product, addCart } = props;
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
          <section style={{paddingbottom: '4em'}} id="boutique">
            <div className='container'>
                <div className='title-container'>
                    <h2 className='title'>
                        #Top Product <br></br>
                    </h2>
                    <Link className='link' to={'/boutique'}>
                        Go to shopping
                        <BsArrowRight  className='icone' />
                    </Link>
                </div>
                <div className='cart-container'>
                    <Cart cart={product} handleAddToCart={addCart} />
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default BoutiqueSection;