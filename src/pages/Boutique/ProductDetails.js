// LIBRARY AND COMPONENTS
import './ProductDetails.scss';
import Navbar from "../../componnents/header/navbar/login";
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';
import StarRating from '../../componnents/notation/starsRating';

// HOOKS
import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

// REDUX ACTION IMPORT
import { addReview } from '../../redux/action/reviewAction';
import { produitDetail } from "../../redux/action/productAction";
import { addToCart } from '../../redux/action/cartAction';
import { getCartItems } from '../../redux/action/cartAction';
import { getRelatedProducts } from '../../redux/action/productAction';

function ProductDetails() {

  // STATE
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingDelay, setLoadingDelay] = useState(true);

  //New constantes
  const dispatch = useDispatch();
  const { category, id } = useParams();


  // API response selector
  const product = useSelector((state) => state.produitDetail.productDetail.product);
  const relatedProduct = useSelector((state) => state.relatedProduct.relatedProduct.data);
  const errorReview = useSelector((state) => state.listeReview.error);
  const loadingReview = useSelector((state) => state.listeReview.loading);
  const { loading, error } = useSelector((state) => state.produitDetail);
  const { isLogin }  = useSelector(state => state.userLogin);

  


  // EFFECTS 1
  useEffect(() => {


    // Fetch single product by id 
    const fetchSingleProduct = async () => {
      try{
        await dispatch(produitDetail(id));
  
      }catch(error){
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
    fetchSingleProduct();

    // Fetch related product with the current id 
    const fetchRelatedProduct = async () => {
      try{
        await dispatch(getRelatedProducts(id));
  
      }catch(error){
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
    fetchRelatedProduct();

    // Loading timer 
    const loadingTimer = setTimeout(() => {
      setLoadingDelay(false);
    }, 1000); // Délai de 1 seconde avant de masquer le chargement

    return () => clearTimeout(loadingTimer);


  }, [dispatch, id]);

  


  // FONCTIONS 
  const handleQuantityChange = (event) => {
    event.preventDefault();
    const newQuantity = parseInt(event.target.value);
    setQty(newQuantity);
  };
  const handleDecreaseQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  const handleIncreaseQuantity = () => {
    setQty(qty + 1);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addReview(id, {rating, comment})); 
    setComment('');
    setRating(0);

    setTimeout(() => {
      dispatch(produitDetail(id, {rating, comment})); // Soumettre la revue utilisateur après un léger délai
    }, 200); 
  };

  const handleAddToCart = async () => {
    try{
       await dispatch(addToCart(id,{qty})); 
       await dispatch(getCartItems());
    }catch(error){
      console.error('Erreur lors de la récupération des données:', error);
    }

     // Attendre que l'action produitDetails soit terminée
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
    <Navbar />
        <div class="detail_section">
          <div className="container detail-container">
            <Breadcrumbs />
            {/* DETAILS */
              loading || loadingDelay ? (<p>Loading...</p>) :
            (
            <div className="details">
                <div className='product-image'>
                    <div className='current-image'>
                      <img 
                      src={product && product.image} 
                      alt='sport image product' />
                    </div>
                    <div className='extra-images'>
                        {
                          product && 
                          product.photos.map(
                            (p, index) => 
                            (
                            <div 
                            className='picture' 
                            key={index}>
                                <img 
                                src={p} 
                                alt='extra product image' />
                            </div>
                          ))
                        }
                    </div>
                </div>
                <div className='product-descritpion'>
                  <div className='title'>
                    <h2>{product && product.title}</h2>
                    <p className='price'> {product && product.price}€</p>
                  </div>
                  <hr></hr>
                  <p className='stars'>
                    {product && (
                        <StarRating
                            rating={product.averageRating}
                            outOf={5}
                        />
                    )}
                    <span className='rating'>{product.averageRating === 'NaN'? 'No rating available' : product.averageRating }</span>
                  </p>
                    <div className='colorContainer'>
                        <p className='productColor'>
                          Colors : {product && product.colors.productColor}
                          <span className='visualColor' style={{backgroundColor: `${product && product.colors.productColor}`}}></span>
                        </p>
                        <div className='otherColor'>
                        {product && product.colors.otherColors.map((cl, index) => (
                          <div className='detailColor' key={index}>
                            {cl.product && (
                              <Link to={`/boutique/${cl.product._id}`}>
                                <img className='colorImage' src={cl.product.image} alt={cl.product.title} />
                              </Link>
                            )}
                            </div>
                          ))}
                        </div>
                      </div>
                    <p className='description'>
                      Description :</p> 
                      <p>{product && product.description}</p>
                      <div className='action'>
                        <div className='quantity'>
                          Quantity : <button onClick={handleDecreaseQuantity}>-</button>
                          <input
                            type='number'
                            value={qty}
                            onChange={handleQuantityChange}
                            min={1}
                          />
                          <button onClick={handleIncreaseQuantity}>+</button>
                        </div>
                        <button className='add' onClick={handleAddToCart} >Add to cart</button>
                      </div>
                </div>
            </div>)
            }
            {/* ... */}

            {/* ... */}
            <div className="discover-section">
              <div className="related-products">
                  <h2>You might also like</h2>
                  <div className="related-products-list">
                      {relatedProduct && relatedProduct.map((relatedProduct) => (
                          <div key={relatedProduct._id} className="related-product-item">
                              <Link className='relatedLink' to={`/boutique/${relatedProduct._id}`}>
                                  <img className='relatedImg' src={relatedProduct.image} alt={relatedProduct.title} />
                                  <h3 className='relatedTitle'>{relatedProduct.title}</h3>
                                  <div className='relatedText'>
                                    <p>{relatedProduct.price}€</p>
                                  </div>
                              </Link>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
            {/* REVIEW */}
            <div className="review">
              <div className='title-container'>
                <div className='title'>
                  <h2>Avis clients</h2>
                  <p>{product && product.totalReviews} reviews</p>
                </div>
                <h3>{product && product.title}</h3>
              </div>
              <div className='reviews-details'>
                  <div className='reviews-list'>
                    {product &&
                      product.reviews.map((p, index) => (
                        loadingReview ? <p>Loading...</p> :
                        <div className='review-block' key={index}>
                          <div className='b1'>
                            <h4>
                              {p.author.map((a, index) => {
                                return a.name.lastname; // Ajouter un return pour retourner la valeur du prénom
                              })}
                            </h4>
                            <p>Rating : {p.rating} /5</p>
                            <p>Posté le : {formatDate(p.createdAt)}</p>
                          </div>
                          <div className='b2'>
                            <p>{p.comment}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className='comment-input'>
                  <h3>Votre commentaire :</h3>
                  <form id='addComment' onSubmit={handleReviewSubmit} >
                    {
                      isLogin && isLogin ?
                    <>
                      <div className='comment-box'>
                            <label>
                                Rating:
                              <input
                                  type="number"
                                  value={rating}
                                  onChange={(e) => setRating(parseInt(e.target.value))}
                                  min={0}
                                  max={5}
                              />
                              </label>
                              <label>
                                Review:
                                <textarea
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </label>
                              <button  type="submit">Submit Review</button>
                      </div>
                      {
                        errorReview && errorReview ? <p>{errorReview}</p> : ""
                      }
                    </>
                      : 
                      <p>Please connect to add reviews 
                        <Link to={'/login'}>Login</Link> or 
                        <Link to={'/register'}>Register</Link> </p> 
                    }
                    </form>
                  </div>

              </div>
            </div>
          </div>
        </div>
        <Footer />

    </>
  );
}

export default ProductDetails;