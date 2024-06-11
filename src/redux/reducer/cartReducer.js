
// ------------------------ ADD TO CART ------------------------------ 

const cartItemAddedStorage = {
  cartItems : [],
  loading : false,
  error : null,
}

export const addToCartReducer = (state = cartItemAddedStorage, action) => {
  switch (action.type) {
    // ADD TO CART
    case 'ADD_TO_CART_REQUEST':
            return {
            ...state,
            loading: true,
        };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      }
    case 'ADD_TO_CART_FAIL':
        return { ...state, 
          error: action.payload, 
          loading: false 
    };
    default:
      return state;
  }
};

// ------------------------ GET ALL CART ITEMS ------------------------------ 

const cartItemsStorage = {
  cartItems : [],
  loading : false,
  error : null,
}

export const allCartItemsReducer = (state = cartItemsStorage, action) => {
  switch (action.type) {
    // FETCH ALL CART ITEM
    case 'CART_FETCH_REQUEST':
        return {
        ...state,
        loading: true,
    };
    case 'CART_FETCH_SUCCESS':
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      }
    case 'CART_FETCH_FAIL':
      return { ...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

// ------------------------ INCREASE & DECREASE SINGLE CART ITEM ------------- 

const updatedCartItemsStorage = {
  cartItems : [],
  loading : false,
  error : null,
}

export const updatedCartItemsReducer = (state = updatedCartItemsStorage, action) => {
  switch (action.type) {
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
        loading: false,
      }
    case 'DECREASE_CART_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
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
        loading: false,
      }
    case 'INCREASE_CART_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// ------------------------ REMOVE SINGLE ITEM FROM CART --------------------- 

const removedCartItemsStorage = {
  cartItems : [],
  loading : false,
  error : null,
}

export const removedCartItemsReducer = (state = removedCartItemsStorage, action) => {
  switch (action.type) {
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
        loading: false,
      };
        
    case 'REMOVE_FROM_CART_FAIL':
      return { ...state, error: action.payload, loading: false, };
    default:
      return state;
  }
};

// ------------------------ CLEAR ALL THE CART -------------------------------

const clearCartStorage = {
  cartItems : [],
  loading : false,
  error : null,
}

export const clearCartReducer = (state = clearCartStorage, action) => {
  switch (action.type) {
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
