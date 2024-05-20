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
            "title":"4 ajustements pour essayer de sauver des Nuggets au bord du gouffre",
            "content":
            " Même si Josh Hart et OG Anunoby vont tenter de jouer la qualification des Knicks en finale de conférence va dépendre en très grosse partie de la performance de Jalen Brunson…",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "HOT news",
            "image": "https://www.basketsession.com/statics/uploads/2024/05/DENVER-NUGGETS-strategy.jpg"

        },
        {
            "title":"Quel(s) joueur(s) peut faire du Magic une puissance à l’Est ?",
            "content":"Même si les séries entre les Knicks et les Pacers à l’Est, et les Nuggets et les Wolves à l’Ouest n’ont pas encore révélé",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "HOT news",
            "image":"https://www.basketsession.com/statics/uploads/2024/05/ORLANDO-MAGIC-Banchero-mag.jpg"

        },
        {
            "title":"Kristaps Porzingis, un retour qui va se faire attendre…",
            "content":"C’est près du quartier Pablo-Picasso de Nanterre, une ville où il a grandi et est passé professionnel,",
            "author": 'steave bernanrd',
            "data": "20/12/2030",
            "category": "Hot news",
            "image" : "https://www.basketsession.com/statics/uploads/2024/04/PORZINGIS-injury-640x332.jpg"

        }
    ]

    const preview = articles.map(
        (
        article, 
        index
        ) => (
            <div className={index === currentIndex ? 'active' : 'previewBanner'}
                key={index}
                // dans l'év onMouse () => fucntion(index) pour sélectionner l'index
                // Quand on a un map
                // dans la méthode je met en params index qui est égale à index de articles.map
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
   // Charger une méthode au chargement de l apge
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
            <h3 className='style-title'>
                x <br></br>
            <span>xx</span>
            <br></br>
            xxx <br></br>
            {/* <span style={{color: "#d90715"}}> xoxoxox  </span> */}
            <span> xoxoxox  </span>
            <br></br>
            basketball <br></br>
            
            </h3>
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