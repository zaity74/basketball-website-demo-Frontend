import './category.scss';

// Redux import 
import { listeCategory } from '../../../redux/action/categoryAction';
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
            "category": "jersey",
            "image": "https://www.basketsession.com/statics/uploads/2024/05/Bandeau-NL-2-1156x600.jpg",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",
        },
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "shorts",
            "image": "https://www.basketsession.com/statics/uploads/2024/04/Michael-Porter-Jr.jpg",
            "video": "https://imagehandler.api.rbleipzig.com/eyJidWNrZXQiOiJyYmwtbmVvcy10YXJnZXQtcHJvZCIsImtleSI6IjE4MWQ1ZjJlY2Q2MTU0OGRhMDc3ZmUxNjQxNGZmODMwM2MyYmU0MmIvV2ViYXVmbmFobWVfNy02LTIwMjNfMTYxNjIxX2k5Lnl0aW1nLmNvbS0xMTQ4eDY0Ni5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNTAwfX0sIm91dHB1dEZvcm1hdCI6IndlYnAifQ==",


        },
    ])
    // New constantes
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.listCategory);
    const allCategory = useSelector((state) => state.listCategory.category.data);
     
    // EFFECTS 
     // Page load
     useEffect(() => {

        const fetchDataAPI = async() => {
            try{
                await dispatch(listeCategory());
            }catch(error){
                console.error('Erreur lors de la récupération des données:', error);
            }
        }

        fetchDataAPI();
        
      }, [dispatch]);
   

    // Function
      


    const categoryDisplay = allCategory && allCategory.map((article, index) => (
        <div className='cart' key={index}>
            {
                <>
                    <img className='image' src={article.image} alt='category picture' />
                        <div className='overlay'></div>
                        <div className='text'>
                            <Link to={article.type === "boutique" ? `/boutique/?category=${article.name}` : `/blog/?category=${article.name}` } className='link'>
                                 {article.name}
                            </Link>
                        </div>
                </>
            }
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