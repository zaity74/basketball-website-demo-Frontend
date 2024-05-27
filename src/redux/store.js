import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer } from './reducer/userReducer';
import { userLoginReducer } from './reducer/userReducer';
import { articleReducer } from './reducer/articleReducer';
import { mediaReducer } from './reducer/mediaReducer';
import { productReducer } from './reducer/productReducer';
import { productDetailsReducer } from './reducer/productReducer';
import { articleDetailsReducer } from './reducer/articleReducer';
import { categoryReducer } from './reducer/categoryReducer';
import { sizeReducer } from './reducer/sizeReducer';
import { reviewReducer } from './reducer/reviewReducer';
import { cartReducer } from './reducer/cartReducer';
import { gamesReducer } from './reducer/gamesReducer';
import { articleCreatedReducer } from './reducer/articleReducer';
import { forgotPasswordReducer } from './reducer/userReducer';


const rootReducer = combineReducers({
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  forgotPassword : forgotPasswordReducer,
  listeArticles : articleReducer,
  listeMedia : mediaReducer,
  listProduct : productReducer,
  produitDetail : productDetailsReducer,
  articleDetail : articleDetailsReducer,
  listCategory : categoryReducer,
  listSizes : sizeReducer,
  listeReview : reviewReducer,
  addToCart : cartReducer,
  listeGames : gamesReducer,
  createArticle : articleCreatedReducer

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