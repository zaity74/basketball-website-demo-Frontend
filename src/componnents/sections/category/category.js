import './category.scss';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';

function Category(props) {
    // State
    const [showVideo, setShowVideo] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveForward, setMoveForward] = useState(false);
    const [category, setCategory] = useState([
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "first team news",
            "image": "https://www.swisscentralbasketball.ch/wp-content/uploads/2023/01/Swiss_central_basket_Fribourg_20230103-980x750.jpg",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",
        },
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "First team news",
            "image": "https://www.swisscentralbasketball.ch/wp-content/uploads/2022/12/Swiss_central_basket_Vevey_Riviera_Basket-_20221218-980x653.jpg",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",


        },
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "First team news",
            "image":"https://www.swisscentralbasketball.ch/wp-content/uploads/2022/10/Swiss_central_basket__20221026-980x777.jpg",
            "video": "https://www.youtube.com/watch?v=3FTjt8t7RqM",


        },
    ])
    // New constantes
     // New constantes
   

    // Function
      


    const categoryDisplay = category.map((article, index) => (
        <div className='cart' key={index}>
            <img className='image' src={article.image} alt='category picture' />
            <div className='overlay'></div>
                <div className='text'>
                    <Link to={'/'} className='link'>
                        {article.category}
                    </Link>
                </div>
        </div>
      ))

   

    // Page load
  
    // Events
   
    // Variables
  
    return (
      <>
          <section id="category">
            <div className='container'>
                <div className='title-container'>
                    <h2 className='title'>
                        #Catalogue <br></br>
                    </h2>
                </div>
                <div className='cart-container'>
                    {categoryDisplay}
                </div>
            </div>
          </section>
      </>
    );
  }
  
  export default Category;