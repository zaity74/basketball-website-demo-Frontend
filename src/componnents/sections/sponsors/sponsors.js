import './sponsors.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsHeartFill } from 'react-icons/bs';

function Sponsors(props) {
    // State
    const [showVideo, setShowVideo] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveForward, setMoveForward] = useState(false);
    const [sponsors, setSponsors] = useState([
        {

            "image": "https://www.swisscentralbasketball.ch/wp-content/uploads/2021/10/Swiss_central_basket_physio_fanghoefli.png",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",
        },
        {
            "image": "https://www.swisscentralbasketball.ch/wp-content/uploads/2021/10/Swiss_central_basket_don_carlos.png",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",


        },
        {
            "image":"https://www.swisscentralbasketball.ch/wp-content/uploads/2021/11/Swiss_central_basket_goessi.png",


        },
        {
            "image":"https://www.swisscentralbasketball.ch/wp-content/uploads/2022/12/Swiss_central_basket_i_love_tall_20221223.png",


        },
        {
            "image":"https://www.swisscentralbasketball.ch/wp-content/uploads/2021/12/Swiss_central_basket_scb_mms_2021207.png",


        },
        {
            "image":"https://assets.redbullshop.com/images/f_auto,q_auto/t_product-list-3by4/products/RBL/2023/RBL23160_4_1/RBL-Stadium-Seat-Cushion.jpg",


        },
        {
            "image":"https://assets.redbullshop.com/images/f_auto,q_auto/t_product-list-3by4/products/RBL/2023/RBL23160_4_1/RBL-Stadium-Seat-Cushion.jpg",


        },
    ])
    // New constantes
     // New constantes
   

    // Function
      


    const categoryDisplay = sponsors.map((article, index) => (
        <img className='sponsors-img' src={article.image} alt='sponsors' key={index} />
      ))

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
          <section id="boutique">
            <div className='container'>
                <div className='title-container'>
                    <h2 className='title'>
                        #Sponsors <br></br>
                    </h2>
                    <div className='gold'></div>
                </div>
                <div className='sponsors-container-wrap'>
                    <div className='text'>
                    <p className='sub'>The dominant swiss team</p>
                    <h3 className='sub-title'>New time-lapse and drone footage shows a gigantic 550-kilogram LFC crest being installed on the expanded</h3>
                    <p className='info'>We are wainting for you the next season 2023/2024</p>
                    </div>
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default Sponsors;