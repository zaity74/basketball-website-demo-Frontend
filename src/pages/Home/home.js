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
import Breadcrumbs from '../../componnents/breadcrumb';

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
import { useLocation, useNavigate} from 'react-router-dom';

function Home(props) {
    // STATE
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState({});
    
    // DATA RESPONSE AND USE CONSTANTE
    const dispatch = useDispatch();
    const location = useLocation();
    const articles  = useSelector((state) => state.listeArticles.article.articles);
    const loadingArticle = useSelector((state) => state.listeArticles.loading);
    const mediaData = useSelector((state) => state.listeMedia.medias.data);
    const products   = useSelector((state) => state.listProduct.product.products);
    const loadingProduct  = useSelector((state) => state.listProduct.loading);
    const games = useSelector((state) => state.listeGames.games.data);
    const ranking = useSelector((state) => state.listeGames.ranking.data);
    const { cartItems } = useSelector((state) => state.addToCart.cartItems);


    
  
    // EFFECTS
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const page = queryParams.get('page') || 1;
      const sortOrder = queryParams.get('sortOrder') || 'asc';
      const limit = queryParams.get('limit') || 10;


      // Fetch articles
      try{
        const fetchArticles = async () => {
          await dispatch(listeArticles({ sortOrder, page, limit }));
        }
        fetchArticles();
  
        // Fetch products
        const fetchProduct = async () => {
          await dispatch(listeProduct({page, limit, sortOrder}));
        }
        fetchProduct();

        // Other fetch
        dispatch(listeMedia())
        dispatch(listeCalendar());
        dispatch(listeRanking());

        setLoading(true);

      }catch(error){
        console.error('Erreur lors de la récupération des données:', error);
      }finally {
        setLoading(false); // Définir loading à false après la récupération des données
      }


    }, [dispatch, location.search]);

  

  // FUNCTIONS

    
   
    // Variables
  
    return (
      <>
      <div className='home-section'>
        <Header />
        <Games gameInfo={games} />  
        <Actualite articles={ articles }  ranking={ranking} loading={loadingArticle} />
        <GallerySection  gallery={ mediaData }/>
        <Category />
        {
          <BoutiqueSection product={ products } isAdded={isAdded} setIsAdded={setIsAdded} loading={loadingProduct} />
        }
        <Sponsors />
        <Social />
        <Footer />
      </div>

      </>
    );
  }
  
  export default Home;
  
  


