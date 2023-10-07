import './boutique.scss';
import Navbar from '../../componnents/header/navbar/login';
import Cart from '../../componnents/cart/cart';
import Banner from '../../componnents/header/banner/page_banner';
import Footer from '../../componnents/footer/footer';

// Redux import 
import { listeProduct } from '../../redux/action/productAction';
import { listeCategory } from '../../redux/action/categoryAction';
import { listeSizes } from '../../redux/action/sizeAction';
import { addToCart } from '../../redux/action/cartAction';
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IoIosPlay} from "react-icons/io";
import { RiStarSFill } from 'react-icons/ri';
import { BsHeartFill, BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { BsChevronDown, BsSliders } from 'react-icons/bs';

function Boutique(props) {
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedPrice = localStorage.getItem("selectedPrice");
    const storedOrder = localStorage.getItem("selectedOrder");
    const storedSortField = localStorage.getItem("selectedSortField");
    const storedPage = localStorage.getItem("selectedPage");
    // State
    const [isClicked, setIsClicked] = useState(false);
    const [isCatClicked, setIsCatClicked] = useState(false);
    const [isPriceClicked, setIsPriceClicked] = useState(false);
    const [isSortClicked, setIsSortClicked] = useState(false);
    const [order, setOrder] = useState(storedOrder ? storedOrder : null);
    const [category, setCategory] = useState(storedCategory);
    const [price, setPrice] = useState(storedPrice ? storedPrice : null);
    const [sortField, setSortField] = useState(storedSortField);
    const [page, setPage] = useState(storedPage);
    const [title, setTitle] = useState(null);
    const [removeChoice, setRemoveChoice] = useState(false);

    // data extraction
    const { products, pagination, results, total }  = useSelector((state) => state.listProduct.product);
    const allCategory = useSelector((state) => state.listCategory.category.data);
    const allSizes = useSelector((state) => state.listSizes.size.data);

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
        dispatch(listeProduct({title, page, limit, order, category, price, sortField}));
        dispatch(listeCategory());
        dispatch(listeSizes());
        if (removeChoice) {
            // Réinitialise l'affichage ici
            setCategory(storedCategory);
            window.location.href = '/boutique';
            setRemoveChoice(false); // Réinitialise removeChoice après l'utilisation
        }
    }, [dispatch, title, page, limit, category, price, sortField, order, removeChoice ]);


    // Function
    const handleAddToCart = (id, qty) => {
        dispatch(addToCart(id,{qty})); 
         // Attendre que l'action produitDetails soit terminée
      };

  
    // Events

    const goToPage = (newPage) => {
        setPage((prevPage) => {
            localStorage.setItem("selectedPage", newPage );
            window.location.reload();
            return newPage;
          });
    };


    const handleCategoryClick = (catName) => {
        setCategory(catName);
        localStorage.setItem("selectedCategory", catName);
        //window.location.reload();
    };
    const removeCategory = () => {
        // Supprime la catégorie du localstorage
        localStorage.removeItem("selectedCategory");
    
        // Met à jour l'état pour déclencher la réinitialisation de l'affichage
        setRemoveChoice(true);
    };
    
    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        setPrice((prevPrice) => {
          localStorage.setItem("selectedPrice", newPrice);
          window.location.reload();
          return newPrice;
        });
      };
    const handleOrderPriceAsc = () => {
        const newOrder = 'asc';
        const newSortField = 'price';
        setOrder((prevOrder) => {
          localStorage.setItem("selectedOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("selectedSortField", newSortField );
            return newSortField;
        });
      };
    const handleOrderPriceDesc = () => {
        const newOrder = 'desc';
        const newSortField = 'price';
        setOrder((prevOrder) => {
          localStorage.setItem("selectedOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("selectedSortField", newSortField );
            return newSortField;
        });
      };
    const handleOrderCreatedAtAsc = () => {
        const newOrder = 'asc';
        const newSortField = 'createdAt';
        setOrder((prevOrder) => {
          localStorage.setItem("selectedOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("selectedSortField", newSortField );
            return newSortField;
        });
      };
    const handleOrderCreatedAtDesc = () => {
        const newOrder = 'desc';
        const newSortField = 'createdAt';
        setOrder((prevOrder) => {
          localStorage.setItem("selectedOrder", newOrder );
          window.location.reload();
          return newOrder;
        });
        setSortField((prevSortField) => {
            localStorage.setItem("selectedSortField", newSortField );
            return newSortField;
        });
      };
    const RemoveOrder = () => {
        localStorage.removeItem("selectedSortField");
        localStorage.removeItem("selectedOrder");
        window.location.reload();
    }; 

    // CSS EVENT
    const toogleCat = () => {
        setIsCatClicked(!isCatClicked);
    }
    const tooglePrice = () => {
        setIsPriceClicked(!isPriceClicked);
    }
    const toogleSort = () => {
        setIsSortClicked(!isSortClicked);
    }
    
      
   
    // Variables
    const categoryDisplay = allCategory && allCategory.map((cat,index) => (
        <li key={index} >
            {
                cat.type === 'boutique' ?(
                    <p onClick={() => handleCategoryClick(cat.name)}>
                        {cat.name}
                    </p>
                ):
                null
            }

        </li>
    ))

    const priceDisplay = (
        <div className='priceBlock'>
            <div className='select'>
                <input
                type="checkbox"
                name="price"
                id="price-0-10"
                value="0-10"
                checked={price === "0-10"}
                onChange={handlePriceChange}
                />
                <label htmlFor="price-0-10">0-10</label>
            </div>
            <div className='select'>
                <input
                type="checkbox"
                name="price"
                id="price-10-20"
                value="10-20"
                checked={price === "10-20"}
                onChange={handlePriceChange}
                />
                <label htmlFor="price-10-20">10-20</label>
            </div>
            <div className='select'>
            <input
            type="checkbox"
            name="price"
            id="price-20-30"
            value="20-30"
            checked={price === "20-30"}
            onChange={handlePriceChange}
            />
            <label htmlFor="price-20-30">20-30</label>
            </div>

            <div className='select'>
            <input
            type="checkbox"
            name="price"
            id="price-30-40"
            value="30-40"
            checked={price === "30-40"}
            onChange={handlePriceChange}
            />
            <label htmlFor="price-30-40">30-40</label>
            </div>

            <div className='select'>
             <input
            type="checkbox"
            name="price"
            id="price-null"
            value=""
            checked={price === ""}
            onChange={handlePriceChange}
            />
            <label htmlFor="price-null">none</label>
            </div>
        </div>
    )

    const orderDisplay = (
        <>
            <li onClick={handleOrderPriceAsc}>Prix croissant</li>
            <li onClick={handleOrderPriceDesc}>Prix décroissant</li>
            <li onClick={handleOrderCreatedAtAsc}>Récent</li>
            <li onClick={handleOrderCreatedAtDesc}>Moins récent</li>
            <li onClick={RemoveOrder}>Undefined</li>
        </>
    )

    

    

  
    return (
      <>
      <Navbar />
          <section id="boutique">
            <div className='container'>
            <Banner title={'Boutique'} backgroundImageUrl={'https://assets.redbullshop.com/f_auto,q_auto/t_category-banner/content/RBL/2022/Summer%20Collection/RBL_summer0622_listing_01.jpg'}/>
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
                            All product <br></br>
                        </h2>
                    }
                       {/* SLIDE FILTER */}
                        <div className='slide-filter-container'>
                            <ul className='displayed-container'>
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
                                    <h3 onClick={tooglePrice}>
                                        Price
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{display : isPriceClicked ? 'block': 'none'}} className='block'>
                                        {priceDisplay}
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
                            </ul>
                        </div>
                        {/* ... */}
                </div>
                <div className='cart-container'>
                    <Cart cart={products} handleAddToCart={handleAddToCart} />
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
  
  export default Boutique;