// Library
import axios from 'axios'; 

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const createCategory = (params) => async (dispatch,getState) => {
  try {
      const {      
        name,
        type, 
        image, 
        slug 
      }= params;

    // Récupérer le authToken depuis les cookies 
    const authToken = getCookie('authToken');
    console.log('show authtoken',authToken)

    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'CREATE_CATEGORY_FAIL',
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
      name,
      type, 
      image, 
      slug 
    };

    // Get the data from the API
    dispatch({ type: 'CREATE_CATEGORY_REQUEST', });
    const response = await axios.post('http://localhost:3300/api/v1/category/create-category', params, config);

    console.log("SHOW IF PRODUCT IS CREATED", response.data)

    // Success, return data into action.payload
    dispatch({
      type: 'CREATE_CATEGORY_SUCCESS',
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

export const listeCategory = () => async (dispatch) => {
    try {
  
      // Get the data from the API
      dispatch({ type: 'FETCH_CATEGORY_REQUEST' });
      const response = await axios.get(`http://localhost:3300/api/v1/category/all`);
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_CATEGORY_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_CATEGORY_FAILURE',
        payload: error.message,
      });
    }
  };