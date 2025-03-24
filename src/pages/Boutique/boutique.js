import './boutique.scss';
import Navbar from '../../componnents/header/navbar/login';
import Cart from '../../componnents/cart/cart';
import Banner from '../../componnents/header/banner/page_banner';
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';

// Redux import 
import { listeProduct } from '../../redux/action/productAction';
import { listeCategory } from '../../redux/action/categoryAction';
import { listeSizes } from '../../redux/action/sizeAction';
import { addToCart } from '../../redux/action/cartAction';
import { getCartItems } from '../../redux/action/cartAction';

// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

function Boutique(props) {

    // STATE
    const [isCatClicked, setIsCatClicked] = useState(false);
    const [isGenderClick, setIsGenderClick] = useState(false);
    const [isPriceClicked, setIsPriceClicked] = useState(false);
    const [isSortClicked, setIsSortClicked] = useState(false);
    const [isColorClicked, setIsColorClicked] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [sortGender, setSortGender] = useState([]);
    const [limitPage, setLimitPage] = useState(10);
    const [sortCategory, setSortCategory] = useState([]);
    const [sortColors, setSortColors] = useState([]);
    const [sortedField, setSortedField] = useState('title');
    const [sortedOrder, setSortedOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingDelay, setLoadingDelay] = useState(true);

    // DATA RESPONSE AND USE CONSTANTE
    const { products, pagination, total, productPerPage, allColors } = useSelector((state) => state.listProduct.product);
    const { loading } = useSelector((state) => state.listProduct);
    const allCategory = useSelector((state) => state.listCategory.category.data);
    const { cartItems } = useSelector((state) => state.allCartItems.cartItems);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const nextPage = pagination && pagination.next ? pagination.next.page : productPerPage && productPerPage.length;
    const prevPage = pagination && pagination.prev ? pagination.prev.page : 1;

    // EFFECTS 
    useEffect(() => {

        // Get query parameters and affect them to useState constante
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page') || 1;
        const category = queryParams.get('category') || '';
        if (category) {
            setSortCategory(category.split(','));
            setCategoryTitle(category);
        } else {
            setSortCategory([]);
            setCategoryTitle(' ');
        }
        const title = queryParams.get('title') || '';
        setSearchTitle(title);
        const colors = queryParams.get('colors') || '';
        if (colors) {
            setSortColors(colors.split(','));
        } else {
            setSortColors([]);
        }
        const sortField = queryParams.get('sortField') || 'title';
        setSortedField(sortField);
        const sortOrder = queryParams.get('sortOrder') || 'asc';
        setSortedOrder(sortOrder);
        const price = queryParams.get('price') || '';
        setSortPrice(price);
        const gender = queryParams.get('gender') || '';
        setSortGender(gender);
        if (gender) {
            setSortGender(gender.split(','));
        } else {
            setSortGender([]);
        }
        const size = queryParams.get('size') || '';
        const limit = queryParams.get('limit') || 10;
        setLimitPage(limit);

        // Load products, category and sizes action
        const fetchListeDeProduit = async () => {
            try {
                await dispatch(listeProduct({
                    page,
                    category,
                    title,
                    colors,
                    gender,
                    sortField,
                    sortOrder,
                    price,
                    size,
                    limit
                }));
                await dispatch(listeCategory());
                await dispatch(listeSizes());
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        fetchListeDeProduit();

    }, [dispatch, location.search]);

    // EFFECTS 2
    useEffect(() => {
    
        // Au chargement de la page le state currentPage prend la valeur du parametre page
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get('page')) || 1;
      setCurrentPage(page);
        
    // Si page est egale a une page sans produit, revenir a la premiere page
      const nonEmptyPages = productPerPage ? productPerPage.filter(pageData => pageData.count > 0) : [];
      if (page > nonEmptyPages.length && nonEmptyPages.length > 0) {
          setCurrentPage(1);
          queryParams.set('page', 1);
          navigate({ search: queryParams.toString() });
      }
  }, [location.search, total, limitPage, productPerPage]);

  // EFFECTS 3
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
        setLoadingDelay(false);
      }, 1000); // Délai de 1 seconde avant de masquer le chargement
  
      return () => clearTimeout(loadingTimer);
   
  }, []);

  

  // FUNCTIONS

    const goToPage = (pageIndex) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('page', pageIndex);
      navigate({ search: queryParams.toString() });
      setCurrentPage(pageIndex);
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

    const handlePriceChange = (event) => {
        const queryParams = new URLSearchParams(location.search);
        const selectedPrice = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            queryParams.set('price', selectedPrice);
        } else {
            queryParams.delete('price');
        }

        navigate({ search: queryParams.toString() });
    };

    const handleGenderChange = (event) => {
        const queryParams = new URLSearchParams(location.search);
        const selectedGender = event.target.value;
        const isChecked = event.target.checked;

        let updatedGender = [...sortGender];
        if (isChecked) {
            if (!updatedGender.includes(selectedGender)) {
                updatedGender.push(selectedGender);
            }
        }else{
            updatedGender = updatedGender.filter(cat => cat !== selectedGender);
        }

        if (updatedGender.length > 0) {
            queryParams.set('gender', updatedGender.join(','));
        } else {
            queryParams.delete('gender');
        }

        navigate({ search: queryParams.toString() });
    };

    const handleSearchChange = (event) => {
        event.preventDefault();
        const newTitle = event.target.value;
        setSearchTitle(newTitle);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('title', newTitle);
        navigate({ search: queryParams.toString() });
    };
    const handleSortByColors = (event) =>{
        const queryParams = new URLSearchParams(location.search);
        const selectedColors = event.target.value;
        const isChecked = event.target.checked;

        let updatedColors = [...sortColors];
        if (isChecked) {
            if (!updatedColors.includes(selectedColors)) {
                updatedColors.push(selectedColors);
            }
        }else{
            updatedColors = updatedColors.filter(cat => cat !== selectedColors);
        }

        if (updatedColors.length > 0) {
            queryParams.set('colors', updatedColors.join(','));
        } else {
            queryParams.delete('colors');
        }

        navigate({ search: queryParams.toString() });
    }

    // TOGGLE METHODS
    const toggleCat = () => {
        setIsCatClicked(!isCatClicked);
    };
    const toggleColor = () => {
        setIsColorClicked(!isColorClicked);
    };
    const togglePrice = () => {
        setIsPriceClicked(!isPriceClicked);
    };
    const toggleSort = () => {
        setIsSortClicked(!isSortClicked);
    };

    const toggleGender = () => {
        setIsGenderClick(!isGenderClick);
    };

    // MAPing 
    const categoryDisplay = allCategory && allCategory.map((cat, index) => (
        <div key={index} className='priceBlock'>
            {cat.type === 'boutique' && (
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

    const colorsDisplay = allColors && allColors.map((col, index) => (
        <div key={index} className='priceBlock'>
                <div className='priceBlock'>
                    <div className='select'>
                        <input
                            type="checkbox"
                            name="colors"
                            id={`colors-${col}`}
                            value={col}
                            checked={sortColors.includes(col)}
                            onChange={handleSortByColors}
                        />
                        <label htmlFor={`colors-${col}`}>{col}</label>
                    </div>
                </div>
        </div>
    ));

    const gendersAutorize = ["men", "women", "mixte"]; 
    const genderDisplay = gendersAutorize && gendersAutorize.map((gender, index) => (
        <div key={index} className='priceBlock'>
                <div className='priceBlock'>
                    <div className='select'>
                        <input
                            type="checkbox"
                            name="gender"
                            id={`gender-${gender}`}
                            value={gender}
                            checked={sortGender.includes(gender)}
                            onChange={handleGenderChange}
                        />
                        <label htmlFor={`gender-${gender}`}>{gender}</label>
                    </div>
                </div>
        </div>
    ));

    const priceDisplay = (
        <div className='priceBlock'>
            <div className='select'>
                <input
                    type="checkbox"
                    name="price"
                    id="price-0-50"
                    value="0-50"
                    checked={sortPrice === "0-50"}
                    onChange={handlePriceChange}
                />
                <label htmlFor="price-0-50">0-50</label>
            </div>
            <div className='select'>
                <input
                    type="checkbox"
                    name="price"
                    id="price-50-100"
                    value="50-100"
                    checked={sortPrice === "50-100"}
                    onChange={handlePriceChange}
                />
                <label htmlFor="price-50-100">50-100</label>
            </div>
            <div className='select'>
                <input
                    type="checkbox"
                    name="price"
                    id="price-100-200"
                    value="100-200"
                    checked={sortPrice === "100-200"}
                    onChange={handlePriceChange}
                />
                <label htmlFor="price-100-200">100-200</label>
            </div>
            <div className='select'>
                <input
                    type="checkbox"
                    name="price"
                    id="price+200"
                    value="200"
                    checked={sortPrice >= "200"}
                    onChange={handlePriceChange}
                />
                <label htmlFor="price+200">+200</label>
            </div>
        </div>
    );

    const orderDisplay = (
        <div className="orderBlock">
            <div className="select">
                <input
                    type="radio"
                    name="sortOrder"
                    id="price-asc"
                    value="price-asc"
                    checked={sortedField === 'price' && sortedOrder === 'asc'}
                    onChange={() => handleSortChange('price', 'asc')}
                />
                <label htmlFor="price-asc">Prix croissant</label>
            </div>
            <div className="select">
                <input
                    type="radio"
                    name="sortOrder"
                    id="price-desc"
                    value="price-desc"
                    checked={sortedField === 'price' && sortedOrder === 'desc'}
                    onChange={() => handleSortChange('price', 'desc')}
                />
                <label htmlFor="price-desc">Prix décroissant</label>
            </div>
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
            <section id="boutique">
                <div className='container'>
                    <Banner title={'Boutique'} backgroundImageUrl={'https://www.basketsession.com/statics/uploads/2024/05/Bandeau-NL-2-1156x600.jpg'} />
                    <form className='search'>
                        <BsSearch className='icone' />
                        <input
                            type="text"
                            placeholder="Rechercher par nom..."
                            value={searchTitle}
                            onChange={handleSearchChange}
                        />
                    </form>
                    <div className='filtre-section'>
                        {
                            categoryTitle && categoryTitle !== ' ' ?
                                <h2 className='title'>
                                    {categoryTitle} <br />
                                </h2>
                                :
                                <h2 className='title'>
                                    All product <br />
                                </h2>
                        }
                        <div className='slide-filter-container'>
                            <ul className='displayed-container'>
                                <ul className='selector'>
                                    <h3 onClick={toggleGender}>
                                        Gender
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{ display: isGenderClick? 'block' : 'none' }} className='block'>
                                        {genderDisplay}
                                    </ul>
                                </ul>
                                <ul className='selector'>
                                    <h3 onClick={toggleCat}>
                                        Categorie
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{ display: isCatClicked ? 'block' : 'none' }} className='block'>
                                        {categoryDisplay}
                                    </ul>
                                </ul>
                                <ul className='selector'>
                                    <h3 onClick={toggleColor}>
                                        Colors
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{ display: isColorClicked ? 'block' : 'none' }} className='block'>
                                        {colorsDisplay}
                                    </ul>
                                </ul>
                                <ul className='selector'>
                                    <h3 onClick={togglePrice}>
                                        Price
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{ display: isPriceClicked ? 'block' : 'none' }} className='block'>
                                        {priceDisplay}
                                    </ul>
                                </ul>
                                <ul className='selector'>
                                    <h3 onClick={toggleSort}>
                                        Trier
                                        <BsPlusLg className='icone' />
                                    </h3>
                                    <ul style={{ display: isSortClicked ? 'block' : 'none' }} className='block'>
                                        {orderDisplay}
                                    </ul>
                                </ul>
                            </ul>
                        </div>
                    </div>
                    <Breadcrumbs total={total} />
                    <div className='cart-container'>
                        {
                            loading || loadingDelay ? 
                            (<p>Loading...</p>) : 
                            (<Cart cart={products} listeProduct={listeProduct} />)
                        }
                    </div>
                    <div className='pagination'>
                        <p>Pages : </p>
                        {currentPage > 1 && (
                            <FiChevronsLeft className='chevrons' onClick={() => goToPage(currentPage - 1)} />
                        )}
                        {productPerPage && productPerPage.map((pageData) => (
                            pageData.count > 0 && (
                                <button key={pageData.page}
                                    onClick={() => goToPage(pageData.page)}
                                    className={currentPage === pageData.page ? 'selected' : ''}>
                                    {pageData.page}
                                </button>
                            )
                        ))}
                        {currentPage < nextPage && (
                            <FiChevronsRight className='chevrons' onClick={() => goToPage(currentPage + 1)} />
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Boutique;