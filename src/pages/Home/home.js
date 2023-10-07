import './home.css';
import Header from '../../componnents/header/header';
import Games from '../../componnents/sections/games/games';
import Actualite from '../../componnents/sections/actualite/actualite';
import GallerySection from '../../componnents/sections/gallery/galleryVideos';
import Category from '../../componnents/sections/category/category';
import BoutiqueSection from '../../componnents/sections/boutique/boutiqueSection';
import Sponsors from '../../componnents/sections/sponsors/sponsors';
import Social from '../../componnents/sections/social/social';
import Footer from '../../componnents/footer/footer';
import Navbar from '../../componnents/header/navbar/login';
import PlayersSection from '../../componnents/sections/players/players';

// Redux import 
import { listeArticles } from '../../redux/action/articlesAction';
import { listeMedia } from '../../redux/action/mediaAction';
import { listeProduct } from '../../redux/action/productAction';
import { addToCart } from '../../redux/action/cartAction';
import { listeCalendar } from '../../redux/action/gamesAction';
import { listeRanking } from '../../redux/action/gamesAction';
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Home(props) {
    // State
    // New constantes
    const dispatch = useDispatch();
    const articles  = useSelector((state) => state.listeArticles.article.article);
    const {data}   = useSelector((state) => state.listeMedia.medias);
    console.log('DATA VIDEO : ', data);
    const products   = useSelector((state) => state.listProduct.product.products);
    const games = useSelector((state) => state.listeGames.games.data);
    const ranking = useSelector((state) => state.listeGames.ranking.data);
    console.log(ranking, 'ranks');
    const order = 'asc';
    const page = 1;
    const limit = 10;
    const category = 'cat3';
    const size = 'l';

    
  
    // Page load
    useEffect(() => {
      dispatch(listeArticles({ order, page }));
      dispatch(listeMedia())
      dispatch(listeProduct({page, limit, order}))
      dispatch(listeCalendar());
      dispatch(listeRanking());
    }, [dispatch]);
    
    // Events
    const handleAddToCart = (id, qty) => {
      dispatch(addToCart(id,{qty})); 
       // Attendre que l'action produitDetails soit terminée
    };
   
    // Variables
  
    return (
      <>
      <div className='home-section'>
        <Navbar />
        <Header />
        <Games gameInfo={games} />
        <Actualite articles={ articles }  ranking={ranking}/>
        <GallerySection  gallery={ data }/>
        <Category />
        <BoutiqueSection product={ products } addCart={handleAddToCart} />
        <Sponsors />
        <Social />
        <Footer />
      </div>

      </>
    );
  }
  
  export default Home;
  
  


