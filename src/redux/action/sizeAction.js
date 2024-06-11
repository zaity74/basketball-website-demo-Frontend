// Library
import axios from 'axios'; 
// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const createSize = (params) => async (dispatch,getState) => {
  try {
      const {      
        category, 
        availableSizes
      }= params;

    // Récupérer le authToken depuis les cookies 
    const authToken = getCookie('authToken');
    console.log('show authtoken',authToken)

    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'CREATE_SIZE_FAIL',
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
      category, 
      availableSizes
    };

    // Get the data from the API
    dispatch({ type: 'CREATE_SIZE_REQUEST', });
    const response = await axios.post('https://basket-demo2-website-api.onrender.com/api/v1/sizes/create-size', params, config);

    // Success, return data into action.payload
    dispatch({
      type: 'CREATE_SIZE_SUCCESS',
      payload: response.data,
    });

  } catch (error) {
    // Error, can't return data
    dispatch({
      type: 'CREATE_SIZE_FAIL',
      payload: error.message,
    });
  }
};

export const listeSizes = () => async (dispatch) => {
    try {
  
      // Get the data from the API
      dispatch({ type: 'FETCH_SIZE_REQUEST' });
      const response = await axios.get('https://basket-demo2-website-api.onrender.com/api/v1/sizes/all');
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_SIZE_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_SIZE_FAILURE',
        payload: error.message,
      });
    }
  };

