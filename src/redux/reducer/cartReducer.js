/* PULLING DATA OUT OF LOCAL STORAGE AND LOAD IT INTO INITIAL STATE */
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];


export const cartReducer = (state = { cartItems: cartItemsFromStorage }, action) => {
  switch (action.type) {
    // ADD TO CART
    case 'ADD_TO_CART_REQUEST':
            return {
            ...state,
            loading: false,
        };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
      }
    case 'ADD_TO_CART_FAIL':
        return { ...state, error: action.payload };
    // FETCH ALL CART ITEM
    case 'CART_FETCH_REQUEST':
        return {
        ...state,
        loading: false,
    };
    case 'CART_FETCH_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
      }
    case 'CART_FETCH_FAIL':
      return { ...state, error: action.payload };
    // DEACREASE
    case 'DECREASE_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'DECREASE_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
      }
    case 'DECREASE_CART_FAIL':
      return {
        ...state,
        error: action.payload,
      };
    // INCREASE
    case 'INCREASE_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'INCREASE_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
      }
    case 'INCREASE_CART_FAIL':
      return {
        ...state,
        error: action.payload,
      };
    // REMOVE FROM CART
    case 'REMOVE_FROM_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'REMOVE_FROM_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
      };
        
    case 'REMOVE_FROM_CART_FAIL':
      return { ...state, error: action.payload };
    // CLEAR CART 
    case 'CLEAR_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_CART_SUCCESS':
      return {
        ...state,
        cartItems: [],
        loading: false,
      };
    case 'CLEAR_CART_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
