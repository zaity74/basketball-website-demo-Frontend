// Library
import axios from 'axios'; 

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const createProduct = (params) => async (dispatch,getState) => {
  try {
      const {      
        title,
        description,
        slug,
        gender,
        productCollection,
        colors,
        photos,
        category,
        countInStock,
        qty,
        price,
        image} 
      = params;

    // Récupérer le authToken depuis les cookies 
    const authToken = getCookie('authToken');

    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'PRODUCT_CREATED_FAIL',
          payload: 'You need to be logged in to add a product to the cart. Please log in or create an account.',
        });
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization' : `Bearer ${authToken}`
      }, 
      widthCredentials: true,
    };

    const body = {
      title,
        description,
        slug,
        gender,
        productCollection,
        colors,
        photos,
        category,
        countInStock,
        qty,
        price,
        image
    };

    // Get the data from the API
    dispatch({ type: 'PRODUCT_CREATED_REQUEST', });
    const response = await axios.post('https://basketball-demo.netlify.app/api/v1/products/create-product', params, config);

    console.log("SHOW IF PRODUCT IS CREATED", response.data)

    // Success, return data into action.payload
    dispatch({
      type: 'PRODUCT_CREATED_SUCCESS',
      payload: response.data,
    });

  } catch (error) {
    // Error, can't return data
    dispatch({
      type: 'PRODUCT_CREATED_FAIL',
      payload: error.message,
    });
  }
};

export const listeProduct = (params) => async (dispatch,getState) => {
    try {
        const { page, category, gender, title, colors, sortField, sortOrder, size, price, limit } = params;

      // Get the data from the API
      dispatch({ type: 'FETCH_PRODUCT_REQUEST' });
      const response = await axios.get(`https://basketball-demo.netlify.app/api/v1/products`, {
        params: { page, title, gender, colors, category, sortField, sortOrder, price, size, limit }
      });
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_PRODUCT_SUCCESS',
        payload: response.data,
      });

    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_PRODUCT_FAILURE',
        payload: error.message,
      });
    }
  };


export const produitDetail = (id)  => async (dispatch,getState) => {
    try {
        // Get the data from the api product
        dispatch({ type: 'FETCH_DETAILS_PRODUCT_REQUEST' })
        const response = await axios.get(`https://basketball-demo.netlify.app/api/v1/products/${id}`)
        // Success, return data into action.payload
        dispatch({
            type: 'FETCH_DETAILS_PRODUCT_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        // Error, can't return data
        dispatch({
            type: 'FETCH_DETAILS_PRODUCT_FAILURE',
            payload: error.message
        })
    }
}

export const userProductStatus = (params) => async (dispatch,getState) => {
  try {

    // Récupérer le authToken depuis les cookies 
    const authToken = getCookie('authToken');

    if (!authToken) {
      console.log('No valid token');
      return dispatch({
        type: 'PRODUCT_CREATED_FAIL',
        payload: 'You need to be logged in to add a product to the cart. Please log in or create an account.',
      });
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization' : `Bearer ${authToken}`
      }, 
      widthCredentials: true,
    };

    // Get the data from the API
    dispatch({ type: 'USER_PRODUCT_STATUS_REQUEST' });
    const response = await axios.get('https://basketball-demo.netlify.app/api/v1/products/all-user-product-status', config);

    // Success, return data into action.payload
    dispatch({
      type: 'USER_PRODUCT_STATUS_SUCCESS',
      payload: response.data,
    });

  } catch (error) {
    // Error, can't return data
    dispatch({
      type: 'USER_PRODUCT_STATUS_FAIL',
      payload: error.message,
    });
  }
};

export const getRelatedProducts = (productId) => async (dispatch) => {
  try {
      dispatch({ type: 'RELATED_PRODUCTS_REQUEST' });

      const response = await axios.get(`https://basketball-demo.netlify.app/api/v1/products/${productId}/related`);

      dispatch({
          type: 'RELATED_PRODUCTS_SUCCESS',
          payload: response.data,
      });
  } catch (error) {
      dispatch({
          type: 'RELATED_PRODUCTS_FAIL',
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};