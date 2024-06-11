import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { userProductReducer } from './reducer/productReducer';
import { userRegisterReducer } from './reducer/userReducer';
import { userLoginReducer } from './reducer/userReducer';
import { articleReducer } from './reducer/articleReducer';
import { mediaReducer } from './reducer/mediaReducer';
import { productReducer } from './reducer/productReducer';
import { productDetailsReducer } from './reducer/productReducer';
import { relatedProductReducer } from './reducer/productReducer';
import { articleDetailsReducer } from './reducer/articleReducer';
import { categoryReducer } from './reducer/categoryReducer';
import { createSizeReducer, sizeReducer } from './reducer/sizeReducer';
import { reviewReducer } from './reducer/reviewReducer';
import { addToCartReducer } from './reducer/cartReducer';
import { allCartItemsReducer } from './reducer/cartReducer';
import { updatedCartItemsReducer } from './reducer/cartReducer';
import { removedCartItemsReducer } from './reducer/cartReducer';
import { clearCartReducer } from './reducer/cartReducer';
import { gamesReducer } from './reducer/gamesReducer';
import { articleCreatedReducer } from './reducer/articleReducer';
import { forgotPasswordReducer } from './reducer/userReducer';
import { createProductReducer } from './reducer/productReducer';
import { createCategoryReducer } from './reducer/categoryReducer';
import { addToWishlistReducer } from './reducer/wishlistReducer';
import { allWishlistReducer } from './reducer/wishlistReducer';
import { removedWishlistItemReducer } from './reducer/wishlistReducer';
import { clearWishlistReducer } from './reducer/wishlistReducer';


const rootReducer = combineReducers({
  // user
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  forgotPassword : forgotPasswordReducer,
  // Wishlist
  addToWishlist : addToWishlistReducer,
  getAllWishlist : allWishlistReducer,
  removeFromWishlist : removedWishlistItemReducer, 
  clearWishlist : clearWishlistReducer,
  // product
  listProduct : productReducer,
  produitDetail : productDetailsReducer,
  createProduct : createProductReducer, 
  userProductStatus : userProductReducer,
  relatedProduct: relatedProductReducer,
  // cart
  addToCart : addToCartReducer,
  allCartItems : allCartItemsReducer, 
  updatedCartItems : updatedCartItemsReducer, 
  removedCartItem : removedCartItemsReducer,
  clearCart : clearCartReducer,
  // articles
  listeArticles : articleReducer,
  createArticle : articleCreatedReducer,
  articleDetail : articleDetailsReducer,
  // category
  createCategory : createCategoryReducer, 
  listCategory : categoryReducer,
  // sizes
  listSizes : sizeReducer,
  createSize : createSizeReducer,
  // Review
  listeReview : reviewReducer,
  listeMedia : mediaReducer,
  listeGames : gamesReducer,
});

/* PULLING DATA OUT OF LOCAL STORAGE AND LOAD IT INTO INITIAL STATE */

/* INITIAL STATE */
const initialState = {};

const middleware = [thunk];

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    initialState,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

export default configureAppStore;