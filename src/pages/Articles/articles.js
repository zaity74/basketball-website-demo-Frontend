import './articles.scss';
import Navbar from '../../componnents/header/navbar/login';
import Banner from '../../componnents/header/banner/page_banner';
import Footer from '../../componnents/footer/footer';
import CartActualite from '../../componnents/cart/cart_actualite';

// Redux import 
import { listeArticles } from '../../redux/action/articlesAction';
import { listeCategory } from '../../redux/action/categoryAction';
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

function Blog(props) {
    const storedCategory = localStorage.getItem("articleCategory");
    const storedOrder = localStorage.getItem("articleOrder");
    const storedSortField = localStorage.getItem("articleSortField");
    const storedPage = localStorage.getItem("blogPage");
    // State
    const [isClicked, setIsClicked] = useState(false);
    const [order, setOrder] = useState(storedOrder ? storedOrder : null);
    const [category, setCategory] = useState(storedCategory);
    const [sortField, setSortField] = useState(storedSortField);
    const [page, setPage] = useState(storedPage);
    const [title, setTitle] = useState(null);
    const [isCatClicked, setIsCatClicked] = useState(false);
    const [isSortClicked, setIsSortClicked] = useState(false);

    // New constantes
    const { article, pagination, results, total }  = useSelector((state) => state.listeArticles.article);
    const allCategory = useSelector((state) => state.listCategory.category.data);

    // Pagination variables
    const nextPage = pagination && pagination.next ? pagination.next.page : null;
    const prevPage = pagination && pagination.prev ? pagination.prev.page : null;
    const limit = 20;
    const totalPages = Math.ceil(total / limit);
    
    // New constantes
    const dispatch = useDispatch();

    // Pagination variables

    // Page load
    useEffect(() => {
        dispatch(listeArticles({title, page, limit, order, category, sortField}));
        dispatch(listeCategory());
      }, [dispatch, title, page, limit, category, sortField, order ]);


    // Function

  
    // Events

    const goToPage = (newPage) => {
        setPage((prevPage) => {
            localStorage.setItem("blogPage", newPage );
            window.location.reload();
            return newPage;
          });
    };


    const handleCategoryClick = (catName) => {
        setCategory(catName);
        localStorage.setItem("articleCategory", catName);
        window.location.reload();
    };
    const removeCategory = () => {
        localStorage.removeItem("articleCategory");
        window.location.reload();
    }; 

    const handleOrderCreatedAtAsc = () => {
        const newOrder = 'asc';
        const newSortField = 'createdAt';
        setOrder((prevOrder) => {
          localStorage.setItem("articleOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("articleSortField", newSortField );
            return newSortField;
        });
      };
    const handleOrderCreatedAtDesc = () => {
        const newOrder = 'desc';
        const newSortField = 'createdAt';
        setOrder((prevOrder) => {
          localStorage.setItem("articleOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("articleSortField", newSortField );
            return newSortField;
        });
      };
    const RemoveOrder = () => {
        localStorage.removeItem("articleSortField");
        localStorage.removeItem("articleOrder");
        window.location.reload();
    }; 

    // CSS EVENT
    const toogleCat = () => {
        setIsCatClicked(!isCatClicked);
    }
    const toogleSort = () => {
        setIsSortClicked(!isSortClicked);
    }

    
    // Variables
    const categoryDisplay = allCategory && allCategory.map((cat,index) => (
        <li style={{display : cat.type === 'article' ? 'block' : 'none'}} key={index} >
            {
                cat.type === 'article' ?(
                    <p onClick={() => handleCategoryClick(cat.name)}>
                        {cat.name}
                    </p>
                ):
                <p >None</p>
            }

        </li>
    ))

    const orderDisplay = (
        <div>
            <p onClick={handleOrderCreatedAtAsc}>Récent</p>
            <p onClick={handleOrderCreatedAtDesc}>Moins récent</p>
            <p onClick={RemoveOrder}>Undefined</p>
        </div>
    )

    

    

  
    return (
      <>
      <Navbar />
          <section id="articles">
            <div className='container'>
            <Banner title={'Blog'} backgroundImageUrl={'https://res.cloudinary.com/swiss-basketball/image/fetch/c_fill,g_center,f_auto,q_80,w_1900,h_780/https://s3.eu-central-1.amazonaws.com/swiss.basketball/assets/swissbasket/5x5u20menswitzerland-1689411071.jpg'}/>
                 {/* ... SEARCH INPUT... */}
                 <form className='search'>
                    <BsSearch className='icone' />
                    <input
                        type="text"
                        placeholder="Rechercher par nom..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </form>
                {/* ... */}
                <div className='filtre-section'>
                    {
                        category && category ? 
                        <h2 className='title'>
                            {category} <br></br>
                        </h2>
                        :
                        <h2 className='title'>
                            All articles <br></br>
                        </h2>
                    }
                    {/* FILTER */}
                    <div className='slide-filter-container'>
                        <div className='displayed-container'>
                            <ul className='selector'>
                                <h3 onClick={toogleCat}>
                                    Categorie
                                    <BsPlusLg className='icone' />
                                </h3>
                                <ul style={{display : isCatClicked ? 'block': 'none'}} className='block'>
                                    <li onClick={removeCategory}>All</li>
                                    {categoryDisplay}
                                </ul>
                            </ul>
                            <ul className='selector'>
                                <h3 onClick={toogleSort}>
                                    Trier
                                    <BsPlusLg className='icone' />
                                </h3>
                                <ul style={{display : isSortClicked ? 'block': 'none'}} className='block'>
                                    {orderDisplay}
                                </ul>
                            </ul>
                        </div>
                    </div>
                    {/* ... */}
                </div>
                <div className='news-container'>
                    <CartActualite cart={ article } />
                </div>
                <div className='pagination'>
                    <p>Pages : </p>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => goToPage(index + 1)}>
                        {index + 1}
                        </button>
                    ))}
                </div>
            </div>
          </section>
        <Footer />
      </>
    );
  }
  
  export default Blog;