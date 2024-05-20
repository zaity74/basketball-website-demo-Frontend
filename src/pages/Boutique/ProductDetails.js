// LIBRARY AND COMPONENTS
import './ProductDetails.scss';
import Navbar from "../../componnents/header/navbar/login";
import Footer from '../../componnents/footer/footer';
import Breadcrumbs from '../../componnents/breadcrumb';

// HOOKS
import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

// REDUX ACTION IMPORT
import { addReview } from '../../redux/action/reviewAction';
import { produitDetail } from "../../redux/action/productAction";
import { addToCart } from '../../redux/action/cartAction';

function ProductDetails() {

  // STATE
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  //New constantes
  const dispatch = useDispatch();
  const { id } = useParams();


  // API response selector
  const product = useSelector((state) => state.produitDetail.productDetail.product);
  const { isLogin }  = useSelector(state => state.userLogin);
  


  // PAGE LOAD
  useEffect(() => {


    // Fetch single product by id 
    const fetchSingleProduct = async () => {
      try{
        await dispatch(produitDetail(id));
        setLoading(true)
  
      }catch(error){
        console.error('Erreur lors de la récupération des données:', error);
      }finally {
        setLoading(false); // Définir loading à false après la récupération des données
      }
    }
    fetchSingleProduct();


  }, [dispatch, id]);


  // FONCTIONS EVENT
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

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(id, {rating, comment})); 
    setComment('');
    setRating(0);

    setTimeout(() => {
      dispatch(produitDetail(id, {rating, comment})); // Soumettre la revue utilisateur après un léger délai
    }, 200); 
     // Attendre que l'action produitDetails soit terminée
  };

  const handleAddToCart = async () => {
    try{
       await dispatch(addToCart(id,{qty})); 
    }catch(error){
      console.error('Erreur lors de la récupération des données:', error);
    }

     // Attendre que l'action produitDetails soit terminée
  };

  // Functions
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
              loading ? (<p>Loading...</p>) :
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
                                src={p.image} 
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
                    <p className='description'>
                      Description :</p> 
                      <p>{product && product.description}</p>
                    <p>Rating : {product && product.averageRating}/5</p>
                    <div className='action'>
                      <div className='quantity'>
                        Quantité : <button onClick={handleDecreaseQuantity}>-</button>
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
                        <div className='review-block' key={index}>
                          <div className='b1'>
                            <h4>
                              {p.author.map((a, index) => {
                                return a.lastname; // Ajouter un return pour retourner la valeur du prénom
                              })}
                            </h4>
                            <p>Rating : {p.rating}</p>
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
                      : 
                      <p>Please connect to add reviews 
                        <Link to={'/login'}>Login</Link> or 
                        <Link to={'/register'}>Register</Link> </p> 
                    }
                    </form>
                  </div>

              </div>
            </div>
            {/* ... */}
            <div className="discover-section"></div>
          </div>
        </div>
        <Footer />

    </>
  );
}

export default ProductDetails;