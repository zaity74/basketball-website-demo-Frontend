import './articles.scss';
import Navbar from '../../componnents/header/navbar/login';
import Banner from '../../componnents/header/banner/page_banner';
import Footer from '../../componnents/footer/footer';
import CartActualite from '../../componnents/cart/cart_actualite';
import Breadcrumbs from '../../componnents/breadcrumb';

// Redux import 
import { listeCategory } from '../../redux/action/categoryAction';
import { listeArticles } from '../../redux/action/articlesAction';
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate} from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

function Blog(props) {
    // State
    const [isCatClicked, setIsCatClicked] = useState(false);
    const [isSortClicked, setIsSortClicked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [limitPage, setLimitPage] = useState(10);
    const [sortCategory, setSortCategory] = useState([]);
    const [sortedField, setSortedField] = useState('') || 'title';
    const [sortedOrder, setSortedOrder] = useState('') || 'asc';
    const [currentPage, setCurrentPage] = useState(1);

    // New constantes
    const { articles, pagination, total, productPerPage  }  = useSelector((state) => state.listeArticles.article);
    const allCategory = useSelector((state) => state.listCategory.category.data);

    // Pagination variables
    const nextPage = pagination && pagination.next ? pagination.next.page : null;
    const prevPage = pagination && pagination.prev ? pagination.prev.page : null;

    
    // New constantes
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // Pagination variables

    // Page load
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page') || 1;
        const category = queryParams.get('category') || '';
        if (category) {
            setSortCategory(category.split(','));
            setCategoryTitle(category);
          } else {
            setSortCategory([]);
            setCategoryTitle('All Articles')
          }
        const title = queryParams.get('title') || '';
        setSearchTitle(title);
        const sortField = queryParams.get('sortField') || 'title';
        setSortedField(sortField);
        const sortOrder = queryParams.get('sortOrder') || 'asc';
        setSortedOrder(sortOrder);
        const limit = queryParams.get('limit') || 10;
        setLimitPage(limit);

        const fetchDataAPI = async() => {
            try{
                await dispatch(listeArticles({
                        page,
                        category,
                        title,
                        sortField,
                        sortOrder,
                        limit
                    }));

                await dispatch(listeCategory());
                setLoading(true);
            }catch(error){
                console.error('Erreur lors de la récupération des données:', error);
            }finally {
                setLoading(false); // Définir loading à false après la récupération des données
            }
        }

        fetchDataAPI();
        
      }, [dispatch, location.search]);

      useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page') || 1;
        setCurrentPage(parseInt(page));
        
        // Calculer la longueur des pages non vides
        const nonEmptyPages = productPerPage ? productPerPage.filter(pageData => pageData.count > 0) : [];
        if(currentPage > nonEmptyPages.length){
            setCurrentPage(1);
            queryParams.set('page', 1);
            navigate({ search: queryParams.toString() });
        }
        
        
    },[location.search, total, limitPage, productPerPage])


    // Function

  
    // Events

    const goToPage = (pageIndex) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', pageIndex);
        navigate({ search: queryParams.toString() });

        setCurrentPage(pageIndex)
      };

    const handleCategoryChange = (event) => {
        const queryParams = new URLSearchParams(location.search);
        const selectedCategory = event.target.value;
        const isChecked = event.target.checked;
    
        let updatedCategories = [...sortCategory];
        if (isChecked) {
          if (!updatedCategories.includes(selectedCategory)) {
            updatedCategories.push(selectedCategory);
          }
        } else {
          updatedCategories = updatedCategories.filter(cat => cat !== selectedCategory);
        }
    
        if (updatedCategories.length > 0) {
          queryParams.set('category', updatedCategories.join(','));
        } else {
          queryParams.delete('category');
        }
    
        navigate({ search: queryParams.toString() });
      };

    const handleSortChange = (field, order) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('sortField', field);
        queryParams.set('sortOrder', order);
        navigate({ search: queryParams.toString() });
    };

    const handleSearchChange = (event) => {
        event.preventDefault();
        const newTitle = event.target.value
        setSearchTitle(newTitle);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('title', newTitle);
        navigate({ search: queryParams.toString() });
    };


   

    // CSS EVENT
    const toogleCat = () => {
        setIsCatClicked(!isCatClicked);
    }
    const toogleSort = () => {
        setIsSortClicked(!isSortClicked);
    }

    
    // Variables
    const categoryDisplay = allCategory && allCategory.map((cat, index) => (
        <div key={index} className='priceBlock'>
          {cat.type === 'article' && (
            <div className='priceBlock'>
              <div className='select'>
                <input
                  type="checkbox"
                  name="category"
                  id={`category-${cat.name}`}
                  value={cat.name}
                  checked={sortCategory.includes(cat.name)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={`category-${cat.name}`}>{cat.name}</label>
              </div>
            </div>
          )}
        </div>
      ));

      const orderDisplay = (
        <div className="orderBlock">
            <div className="select">
            <input
                type="radio"
                name="sortOrder"
                id="createdAt-asc"
                value="createdAt-asc"
                checked={sortedField === 'createdAt' && sortedOrder === 'asc'}
                onChange={() => handleSortChange('createdAt', 'asc')}
            />
            <label htmlFor="createdAt-asc">Récent</label>
            </div>
            <div className="select">
            <input
                type="radio"
                name="sortOrder"
                id="createdAt-desc"
                value="createdAt-desc"
                checked={sortedField === 'createdAt' && sortedOrder === 'desc'}
                onChange={() => handleSortChange('createdAt', 'desc')}
            />
            <label htmlFor="createdAt-desc">Moins récent</label>
            </div>
        </div>
    );

    

    

  
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
                    value={searchTitle}
                    onChange={handleSearchChange}
                    />
                </form>
                {/* ... */}
                <div className='filtre-section'>
                    {
                        categoryTitle && categoryTitle ?  
                        <h2 className='title'>
                            {categoryTitle} <br></br>
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
                <Breadcrumbs />
                <div className='news-container'>
                    {
                        loading ? <p>Loading...</p> : 
                        <CartActualite cart={ articles && articles } />
                    }
                </div>
                <div className='pagination'>
                    <p>Pages : </p>
                    { productPerPage && productPerPage.map((pageData) => (
                        pageData.count > 0 && (
                        <button key={pageData.page} 
                        onClick={() => goToPage(pageData.page)}
                        className={currentPage === pageData.page? 'selected' : ''}>
                            {pageData.page}
                        </button>
                        )
                    ))}
                </div>
            </div>
          </section>
        <Footer />
      </>
    );
  }
  
  export default Blog;