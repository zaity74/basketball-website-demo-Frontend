import { createBrowserHistory } from 'history';
import { BsHeartFill } from 'react-icons/bs';
import ErrorModal from '../modal/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux import : action to dispatch 
import { getCartItems, addToCart } from "../../redux/action/cartAction";
import { userProductStatus } from '../../redux/action/productAction';
import { addToWishlist, removeFromWishlist, getAllWishlist } from '../../redux/action/wishlistAction';
import StarRating from '../notation/starsRating';

// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

function Cart(props) {
    const { cart } = props;

    // STATE
    // const [errors, setErrors] = useState("");
    const [isAdd, setIsAdd] = useState({});
    const [isLike, setIsLike] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [status, setStatus] = useState("");
    const [showModal, setShowModal] = useState(false);

    // DATA RESPONSE AND USE HOOKS
    const { error, loading, data } = useSelector((state) => state.allCartItems.cartItems);
    const userProd = useSelector((state) => state.userProductStatus?.userProduct?.data || []);
    const addToCartMessage = useSelector((state) => state.addToCart?.cartItems);
    const messageCart = useSelector((state) => state.addToCart?.cartItems.message);
    const isLogin = useSelector(state => state.userLogin.isLogin);
    const { totalItem, wishlistItem } = useSelector((state) => state.getAllWishlist.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // EFFECTS 1
    useEffect(() => {
        try{
            // load cart items : to get information about it 
            const fetchCartElement = async () => {
                await dispatch(getAllWishlist());
                await dispatch(getCartItems());
                await dispatch(userProductStatus());
            };
            fetchCartElement();

            }catch(error){
                console.log('erreur dans la recuperation des données', error);

            }


    }, [dispatch]);

    // EFFECTS 2
    useEffect(() => {

        if(isLogin){
                // Au chargement de la page mettre a jour les produits ajoutés au panier
                const initializeIsAdded = () => {
                    const initialIsAdd = {};
                    const initialIsLiked = {};
                    cart && cart.forEach(article => {
                        const productFound = userProd.find(status => status.product === article._id && status.isAdded);
                        if (productFound) {
                            initialIsAdd[article._id] = true;
                        }

                        const productLikedFound = userProd.find(status => status.product === article._id && status.isLiked);
                        if (productLikedFound) {
                            initialIsLiked[article._id] = true;
                        }
                    });
                    setIsAdd(initialIsAdd);
                    setIsLike(initialIsLiked);
                };

                if (userProd.length > 0) {
                    initializeIsAdded();
                }
        }
    }, [cart, userProd]);

    // EFFECTS 3
    useEffect(() => {
        // GET ERROR MESSAGE
        if (addToCartMessage && addToCartMessage.message) {
            // setErrors(addToCartMessage.message);
            setStatus(addToCartMessage.status);
            // setShowModal(true);
        }
    }, [addToCartMessage]);

    // FUNCTIONS
    const handleAddToCart = async (id, qty) => {
        try {
            if (!isLogin) {
                navigate('/login');
                return;
            }

            await dispatch(addToCart(id, { qty }));
            await dispatch(userProductStatus());
            await dispatch(getCartItems());
            toast.success(messageCart, "👍");
            // setIsAdd(prevIsAdd => ({ ...prevIsAdd, [id]: true }));
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            // setErrors(error.message || 'An error occurred');
            setStatus('Erreur');
            setShowModal(true);
        }
    };

    const handleAddToWishlist= async (id) => {
        try {
            if (!isLogin) {
                navigate('/login');
                return;
            }
            // setIsChecked(!isChecked);
            await dispatch(addToWishlist(id));
            await dispatch(getAllWishlist());
            await dispatch(userProductStatus());
            toast.success('product added to saved-items 👍');

            // setIsAdd(prevIsAdd => ({ ...prevIsAdd, [id]: true }));
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            // setErrors(error.message || 'An error occurred');
            toast.error(error);
            setStatus('Erreur');
            setShowModal(true);
        }
    };

    // const handleCloseModal = () => setShowModal(false);

    // CONSTANTES
    const categoryStyles = {
        vetements: { backgroundColor: '#84374E' },
        accessoires: { backgroundColor: '#222222' },
        chaussures: { backgroundColor: '#A2596C' },
        maillot: { backgroundColor: '#FFD700' },
    };

    return (
        <>
            {cart && cart.map((article, index) => (
                <div className='cart' key={index}>
                    <div className='image-container'>
                        <img className='image' src={article.image} alt='category picture' />
                        <div style={categoryStyles[article.category] || {}} className='new'>{article.category}</div>
                    </div>
                    <Link to={`/boutique/${article._id}`} className='title-cart'>{article.title}</Link>
                    <div className='text'>
                        <p className='price'>{article.price}€</p>
                        <p
                            onClick={() => handleAddToCart(article._id, article.qty, article.title)}
                            className={`link ${isAdd[article._id] ? 'buttonAdded' : ''}`}
                        >
                            {isAdd[article._id] ? 'Added' : 'Add To Cart'}
                        </p>
                    </div>
                    <Link className='like' onClick={() => handleAddToWishlist(article._id)}>
                        <BsHeartFill className={`${isLike[article._id] ? 'icone-focused' : 'icone'}`}/>
                        {/* <p>
                            {isLike[article._id] ? 'Liked' : 'No Liked'}
                        </p> */}
                    </Link>
                </div>
                
            ))}

            <ToastContainer />
            {/* <ErrorModal show={showModal} handleClose={handleCloseModal} status={status} errorMessage={errors} /> */}
        </>
    );
}

export default Cart;

// import { createBrowserHistory } from 'history';
// import { BsHeartFill } from 'react-icons/bs';
// import ErrorModal from '../modal/modal';

// // Redux import : action to dispatch 
// import { getCartItems, addToCart } from "../../redux/action/cartAction";
// import { userProductStatus } from '../../redux/action/productAction';
// import { addToWishlist, removeFromWishlist, getAllWishlist } from '../../redux/action/wishlistAction';
// import StarRating from '../notation/starsRating';

// // Hooks
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from 'react-router-dom';

// function Cart(props) {
//     const { cart, listeProduct } = props;

//     // STATE
//     const [errors, setErrors] = useState("");
//     const [isAdd, setIsAdd] = useState({});
//     const [isLike, setIsLike] = useState({});
//     const [isChecked, setIsChecked] = useState(true);
//     const [status, setStatus] = useState("");
//     const [showModal, setShowModal] = useState(false);

//     // DATA RESPONSE AND USE HOOKS
//     const { error, loading, data } = useSelector((state) => state.allCartItems.cartItems);
//     const userProd = useSelector((state) => state.userProductStatus?.userProduct?.data || []);
//     const addToCartMessage = useSelector((state) => state.addToCart?.cartItems);
//     const isLogin = useSelector(state => state.userLogin.isLogin);
//     const { wishlistItem } = useSelector((state) => state.getAllWishlist?.wishlist);
//     console.log('wishlist', wishlistItem && wishlistItem);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // EFFECTS 1
//    useEffect(() => {
//     const fetchData = async () => {
//         try {
//             await dispatch(getAllWishlist());
//             await dispatch(getCartItems());
//             await dispatch(userProductStatus());
//         } catch (error) {
//             console.error('Erreur lors de la récupération des données:', error);
//         }
//         };

//         fetchData();
//     }, [dispatch]);

//     // EFFECTS 2
//     useEffect(() => {

//         if(isLogin){
//                 // Au chargement de la page mettre a jour les produits ajoutés au panier
//                 const initializeIsAdded = () => {
//                     const initialIsAdd = {};
//                     const initialIsLiked = {};
//                     cart && cart.forEach(article => {
//                         const productFound = userProd.find(status => status.product === article._id && status.isAdded);
//                         if (productFound) {
//                             initialIsAdd[article._id] = true;
//                         }

//                         const productLikedFound = userProd.find(status => status.product === article._id && status.isLiked);
//                         if (productLikedFound) {
//                             initialIsLiked[article._id] = true;
//                         }
//                     });
//                     setIsAdd(initialIsAdd);
//                     setIsLike(initialIsLiked);
//                 };

//                 if (userProd.length > 0 || wishlistItem?.wishlistItem?.length > 0) {
//                     initializeIsAdded();
//                 }
//         }
//     }, [cart, userProd]);

//     // EFFECTS 3
//     useEffect(() => {
//         // GET ERROR MESSAGE
//         if (addToCartMessage && addToCartMessage.message) {
//             setErrors(addToCartMessage.message);
//             setStatus(addToCartMessage.status);
//             // setShowModal(true);
//         }
//     }, [addToCartMessage]);

//     // FUNCTIONS
//     const handleAddToCart = async (id, qty) => {
//         try {
//             if (!isLogin) {
//                 navigate('/login');
//                 return;
//             }

//             await dispatch(addToCart(id, { qty }));

//             await dispatch(userProductStatus());

//             await dispatch(getCartItems());
//             // setIsAdd(prevIsAdd => ({ ...prevIsAdd, [id]: true }));
//         } catch (error) {
//             console.error('Erreur lors de la récupération des données:', error);
//             setErrors(error.message || 'An error occurred');
//             setStatus('Erreur');
//             setShowModal(true);
//         }
//     };

//     const handleAddToWishlist= async (id, qty) => {
//         try {
//             if (!isLogin) {
//                 navigate('/login');
//                 return;
//             }
//             const productInWishlist = wishlistItem?.wishlistItem?.find(status => status.product._id === id);
//             console.log("productFound",productInWishlist);

//             if (productInWishlist) {
//                 console.log('find here');
//                 await dispatch(removeFromWishlist(productInWishlist._id));
//                 await dispatch(listeProduct());
//             } else {
//                 await dispatch(addToWishlist(id));
//                 await dispatch(listeProduct());
//             }

//             await dispatch(getAllWishlist());
//             await dispatch(userProductStatus());
            
//             // setIsAdd(prevIsAdd => ({ ...prevIsAdd, [id]: true }));
//         } catch (error) {
//             console.error('Erreur lors de la récupération des données:', error);
//             setErrors(error.message || 'An error occurred');
//             setStatus('Erreur');
//             setShowModal(true);
//         }
//     };

//     // const handleCloseModal = () => setShowModal(false);

//     // CONSTANTES
//     const categoryStyles = {
//         vetements: { backgroundColor: '#84374E' },
//         accessoires: { backgroundColor: '#222222' },
//         chaussures: { backgroundColor: '#A2596C' },
//         maillot: { backgroundColor: '#FFD700' },
//     };

//     return (
//         <>
//             {cart && cart.map((article, index) => (
//                 <div className='cart' key={index}>
//                     <div className='image-container'>
//                         <img className='image' src={article.image} alt='category picture' />
//                         <div style={categoryStyles[article.category] || {}} className='new'>{article.category}</div>
//                     </div>
//                     <Link to={`/boutique/${article._id}`} className='title-cart'>{article.title}</Link>
//                     <div className='text'>
//                         <p className='price'>{article.price}€</p>
//                         <p
//                             onClick={() => handleAddToCart(article._id, article.qty, article.title)}
//                             className={`link ${isAdd[article._id] ? 'buttonAdded' : ''}`}
//                         >
//                             {isAdd[article._id] ? 'Added' : 'Add To Cart'}
//                         </p>
//                     </div>
//                     <Link className='like' onClick={() => handleAddToWishlist(article._id)}>
//                         <BsHeartFill className={`${isLike[article._id] ? 'icone-focused' : 'icone'}`}/>
//                         {/* <p>
//                             {isLike[article._id] ? 'Liked' : 'No Liked'}
//                         </p> */}
//                     </Link>
//                 </div>
//             ))}

//             {/* <ErrorModal show={showModal} handleClose={handleCloseModal} status={status} errorMessage={errors} /> */}
//         </>
//     );
// }

// export default Cart;
