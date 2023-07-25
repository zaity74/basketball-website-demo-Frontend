import './header.scss';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// Redux import 
// Hooks
import React, { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Header(props) {
    // State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("forward");
    const [isPaused, setIsPaused] = useState(false);
    const [progressBar, setProgressBar] = useState(0);

    // New constantes
    const articles = [
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "first team news",
            "image": "https://www.swisscentralbasketball.ch/wp-content/uploads/2023/04/Swiss_central_basket_Lugano_tiger_20230413_04-980x551.jpg"

        },
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "first team news",
            "image":"https://www.swisscentralbasketball.ch/wp-content/uploads/2023/02/Swiss_central_basket_starwings_20230205_03-980x634.jpg"

        },
        {
            "title":"Final ligue des champions à Madrir le réal face au ...",
            "content":"Après avoir défini psr-4 et le namespace src dans le compose",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "First team news",
            "image" : "https://www.swisscentralbasketball.ch/wp-content/uploads/2022/09/Swiss_central_basket_2022_23-SBL.png"

        }
    ]

    const preview = articles.map(
        (
        article, 
        index
        ) => (
            <div className={index === currentIndex ? 'active' : 'previewBanner'}
                key={index}
                onMouseOver={() => pauseLoader(index)}
                onMouseLeave={() => reLoad(index)}
                >
                    <span className="progressBar"
                            style={{
                                height: index === currentIndex && window.innerWidth > 1024 ? progressBar + "%":'4px',  
                                width: index === currentIndex && window.innerWidth <= 1024 ? progressBar + "%" : "4px",
                                transition: `300ms linear`, // Utiliser la durée totale pour la transition
                            }}
                    />
                    <img className='imagePreview_container' src={article.image} alt='pho' />

                    <h2>
                        {article.title}
                    </h2>
            </div>
        ))
    
    const currentArticle = articles[currentIndex? currentIndex : 0];

   // Page load
    useEffect(() => {
        const interval = setInterval(slideCard, 100);
    
        if (progressBar >= 100 && isPaused) {
        clearInterval(interval);
        }
    
        return () => {
        clearInterval(interval);
        };
    }, [currentIndex, direction, progressBar]);
    
    
  
    // Events

    /* --------> Slide card <--------- */
    function slideCard() {
        if (direction === "forward") {
            setProgressBar(progressBar + 1)
          if (currentIndex < articles.length ) {
            if(progressBar === 100){
                setCurrentIndex(currentIndex + 1);
                setProgressBar(0)
            }else{
                setCurrentIndex(currentIndex)
            }

          }else {
            setCurrentIndex(0);
          }
        }
      }
      
      
     /* --------> PAUSE & RELOAD <--------- */
     function pauseLoader(index) {
        setCurrentIndex(index);
        setIsPaused(true)
        if(index < currentIndex || index > currentIndex){
            setProgressBar(0)
        }
    }

    function reLoad(index) {
        setIsPaused(false);
        slideCard()
    }

   
    // Variables
  
    return (

        <section id="header">
            <div id='container-slide' >
                <h2 className='article-title'>
                    {
                        currentArticle? currentArticle?.category : articles[0].category
                    }
                </h2>
                <div className='container'
                    style={{
                        backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0) 30%), url(${currentArticle ? currentArticle.image : articles[0].image})`
                    }}
                    >
                        <div className='text'>
                            <h2 className='title'>{currentArticle? currentArticle?.title : articles[0].title}</h2>
                            <Link to={'/'} className='link'>
                                <BsArrowRight className='icone' />
                                Read more
                            </Link>
                        </div>


                </div>
                <div className='preview_container'>
                {articles && preview}

                </div>
            </div>
         </section>
    );
  }
  
  export default Header;