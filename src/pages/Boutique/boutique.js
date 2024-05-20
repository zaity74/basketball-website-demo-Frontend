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
// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

function Boutique(props) {
  const [isCatClicked, setIsCatClicked] = useState(false);
  const [isPriceClicked, setIsPriceClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [limitPage, setLimitPage] = useState(2);
  const [sortCategory, setSortCategory] = useState([]);
  const [sortedField, setSortedField] = useState('title');
  const [sortedOrder, setSortedOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const { products, pagination, total, productPerPage } = useSelector((state) => state.listProduct.product);
  const allCategory = useSelector((state) => state.listCategory.category.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const nextPage = pagination && pagination.next ? pagination.next.page : productPerPage && productPerPage.length;
  const prevPage = pagination && pagination.prev ? pagination.prev.page : 1;

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const page = queryParams.get('page') || 1;
      const category = queryParams.get('category') || '';
      if (category) {
          setSortCategory(category.split(','));
      } else {
          setSortCategory([]);
      }
      const title = queryParams.get('title') || '';
      setSearchTitle(title);
      const sortField = queryParams.get('sortField') || 'title';
      setSortedField(sortField);
      const sortOrder = queryParams.get('sortOrder') || 'asc';
      setSortedOrder(sortOrder);
      const price = queryParams.get('price') || '';
      setSortPrice(price);
      const size = queryParams.get('size') || '';
      const limit = queryParams.get('limit') || 2;
      setLimitPage(limit);

      const fetchListeDeProduit = async () => {
          try {
              await dispatch(listeProduct({
                  page,
                  category,
                  title,
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
          } finally {
              setLoading(false);
          }
      };
      fetchListeDeProduit();
  }, [dispatch, location.search]);

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const page = queryParams.get('page') || 1;
      setCurrentPage(parseInt(page));

      const nonEmptyPages = productPerPage ? productPerPage.filter(pageData => pageData.count > 0) : [];
      // if (currentPage > nonEmptyPages.length) {
      //     setCurrentPage(1);
      //     queryParams.set('page', 1);
      //     navigate({ search: queryParams.toString() });
      // }
  }, [location.search, total, limitPage, productPerPage]);

  const handleAddToCart = async (id, qty) => {
      try {
          await dispatch(addToCart(id, { qty }));
      } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
      }
  };

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

  const handleSearchChange = (event) => {
      event.preventDefault();
      const newTitle = event.target.value;
      setSearchTitle(newTitle);
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('title', newTitle);
      navigate({ search: queryParams.toString() });
  };

  const toggleCat = () => {
      setIsCatClicked(!isCatClicked);
  };
  const togglePrice = () => {
      setIsPriceClicked(!isPriceClicked);
  };
  const toggleSort = () => {
      setIsSortClicked(!isSortClicked);
  };

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

  const priceDisplay = (
      <div className='priceBlock'>
          <div className='select'>
              <input
                  type="checkbox"
                  name="price"
                  id="price-0-10"
                  value="0-10"
                  checked={sortPrice === "0-10"}
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
                  checked={sortPrice === "10-20"}
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
                  checked={sortPrice === "20-30"}
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
                  checked={sortPrice === "30-40"}
                  onChange={handlePriceChange}
              />
              <label htmlFor="price-30-40">30-40</label>
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
          <Navbar />
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
                          categoryTitle && categoryTitle ?
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
                                  <h3 onClick={toggleCat}>
                                      Categorie
                                      <BsPlusLg className='icone' />
                                  </h3>
                                  <ul style={{ display: isCatClicked ? 'block' : 'none' }} className='block'>
                                      {categoryDisplay}
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
                  <Breadcrumbs />
                  <div className='cart-container'>
                      {
                          loading ? 
                          (<p>Loading...</p>) : 
                          (<Cart cart={products} handleAddToCart={handleAddToCart} />)
                      }
                  </div>
                  <div className='pagination'>
                      <p>Pages : </p>
                      {currentPage > 1 && (
                          <FiChevronsLeft onClick={() => goToPage(currentPage - 1)} />
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
                          <FiChevronsRight onClick={() => goToPage(currentPage + 1)} />
                      )}
                  </div>
              </div>
          </section>
          <Footer />
      </>
  );
}

export default Boutique;