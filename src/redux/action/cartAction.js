import axios from "axios";

export const addToCart = (id, params) => async (dispatch, getState) => {
    try {
      const { qty } = params; // Utiliser "quantity" au lieu de "qty"
      dispatch({ type: 'ADD_TO_CART_REQUEST' });
  
      const response = await axios.post(`https://basket-demo2-website-api.onrender.com/api/v1/cart/add-to-cart/${id}`, {
        qty, // Utiliser "quantity" au lieu de "qty"
      });
  
      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: response.data
      });
  
      localStorage.setItem('cartItems', JSON.stringify(getState().addToCart.cartItems));
    } catch (error) {
      dispatch({
        type: 'ADD_TO_CART_FAIL',
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
export const getCartItems = () => async (dispatch, getState) => {
    try {

        dispatch({ type: 'CART_FETCH_REQUEST' });

        const response = await axios.get(`https://basket-demo2-website-api.onrender.com/api/v1/cart/all`);

        dispatch({ 
            type: 'CART_FETCH_SUCCESS', 
            payload: response.data
        });

      } catch (error) {
        dispatch({ type: 'CART_FETCH_FAIL', payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message, 
        });
      }
  };

export const decreaseCartItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DECREASE_CART_REQUEST' });

    // Effectuer la requête pour diminuer la quantité dans le backend (si nécessaire)
    const response = await axios.put(`https://basket-demo2-website-api.onrender.com/api/v1/cart/decrease/${id}`);

    dispatch({ 
      type: 'DECREASE_CART_SUCCESS', 
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'DECREASE_CART_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const increaseCartItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'INSCREASE_CART_REQUEST' });

    // Effectuer la requête pour diminuer la quantité dans le backend (si nécessaire)
    const response = await axios.put(`https://basket-demo2-website-api.onrender.com/api/v1/cart/increase/${id}`);

    dispatch({ 
      type: 'INCREASE_CART_SUCCESS', 
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'INCREASE_CART_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
  

export const removeCart = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'REMOVE_FROM_CART_REQUEST' });
      const response = await axios.delete(`https://basket-demo2-website-api.onrender.com/api/v1/cart/remove-to-cart/${id}`);
      dispatch({ 
          type: 'REMOVE_FROM_CART_SUCCESS', 
          payload: response.data
      });
    } catch (error) {
      dispatch({ 
          type: 'REMOVE_FROM_CART_FAIL', 
          payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };