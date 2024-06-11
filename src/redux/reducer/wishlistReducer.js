
const ADD_TO_WISHLIST_REQUEST = 'ADD_TO_WISHLIST_REQUEST';
const ADD_TO_WISHLIST_SUCCESS = 'ADD_TO_WISHLIST_SUCCESS';
const ADD_TO_WISHLIST_FAIL = 'ADD_TO_WISHLIST_FAIL';
const WISHLIST_FETCH_REQUEST = 'WISHLIST_FETCH_REQUEST';
const WISHLIST_FETCH_SUCCESS = 'WISHLIST_FETCH_SUCCESS';
const WISHLIST_FETCH_FAIL = 'WISHLIST_FETCH_FAIL';
const REMOVE_FROM_WISHLIST_REQUEST = 'REMOVE_FROM_WISHLIST_REQUEST';
const REMOVE_FROM_WISHLIST_SUCCESS = 'REMOVE_FROM_WISHLIST_SUCCESS';
const REMOVE_FROM_WISHLIST_FAIL = 'REMOVE_FROM_WISHLIST_FAIL';
const CLEAR_WISHLIST_REQUEST = 'CLEAR_WISHLIST_REQUEST';
const CLEAR_WISHLIST_SUCCESS = 'CLEAR_WISHLIST_SUCCESS';
const CLEAR_WISHLIST_FAIL = 'CLEAR_WISHLIST_FAIL';


// ------------------------ ADD TO WISHLIST ------------------------------ 

const wishlistAddedStorage = {
    wishlist : [],
    loading : false,
    error : null,
  }
  
  export const addToWishlistReducer = (state = wishlistAddedStorage, action) => {
    switch (action.type) {
      // ADD TO CART
      case ADD_TO_WISHLIST_REQUEST:
              return {
              ...state,
              loading: true,
          };
      case ADD_TO_WISHLIST_SUCCESS:
        return {
          ...state,
          wishlist: action.payload,
          loading: false,
          error: null,
        }
      case ADD_TO_WISHLIST_FAIL:
          return { ...state, 
            error: action.payload, 
            loading: false 
      };
      default:
        return state;
    }
  };
  
  // ------------------------ GET ALL WISHLIST ------------------------------ 
  
  const wishlistStorage = {
    wishlist : [],
    loading : false,
    error : null,
  }
  
  export const allWishlistReducer = (state = wishlistStorage, action) => {
    switch (action.type) {
      // FETCH ALL CART ITEM
      case WISHLIST_FETCH_REQUEST:
          return {
          ...state,
          loading: true,
      };
      case WISHLIST_FETCH_SUCCESS:
        return {
          ...state,
          wishlist: action.payload,
          loading: false,
        }
      case WISHLIST_FETCH_FAIL:
        return { ...state, error: action.payload, loading: false};
      default:
        return state;
    }
  };
  
  // ------------------------ REMOVE SINGLE ITEM FROM WISHLIST --------------------- 
  
  const removedWishlistItemsStorage = {
    wishlist : [],
    loading : false,
    error : null,
  }
  
  export const removedWishlistItemReducer = (state = removedWishlistItemsStorage, action) => {
    switch (action.type) {
      // REMOVE FROM CART
      case REMOVE_FROM_WISHLIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case REMOVE_FROM_WISHLIST_SUCCESS:
        return {
          ...state,
          wishlist: action.payload,
          loading: false,
        };
          
      case REMOVE_FROM_WISHLIST_FAIL:
        return { ...state, error: action.payload, loading: false, };
      default:
        return state;
    }
  };
  
  // ------------------------ CLEAR ALL THE CART -------------------------------
  
  const clearWishlistStorage = {
    wishlist : [],
    loading : false,
    error : null,
  }
  
  export const clearWishlistReducer = (state = clearWishlistStorage, action) => {
    switch (action.type) {
      // CLEAR CART 
      case CLEAR_WISHLIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CLEAR_WISHLIST_SUCCESS:
        return {
          ...state,
          wishlist: [],
          loading: false,
        };
      case CLEAR_WISHLIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  