import axios from "axios";
import { getCookie } from "./userActions";


export const addReview = (id, params) => async (dispatch, getState) => {

  const { rating, comment } = params;

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
    rating, 
    comment
    
  };


  try {
    dispatch({ type: 'FETCH_REVIEW_REQUEST' });

    const response = await axios.post(
      `http://localhost:3300/api/v1/reviews/create-review/${id}`,body ,config
    );

    dispatch({
      type: 'FETCH_REVIEW_SUCCESS',
      payload: response.data,
    });

    localStorage.setItem(
      'review',
      JSON.stringify(getState().listeReview.review)
    );
  } catch (error) {
    dispatch({
      type: 'FETCH_REVIEW_FAILURE',
      payload: error.message,
    });
  }
};


export const removeReview = (id) => async (dispatch,getState) =>{
    // COOKIES VARIABLE
    const { authToken } = getState().userLogin;
    const config = {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken.access}`
        }
    };
    try{
        const response = await axios.delete(`http://localhost:3300/api/product/reviews/${id}`,config);
        dispatch({
            type: 'REVIEW_REMOVE',
            payload: response.data
        });
    }catch(error){
        dispatch({
            type: 'REVIEW_REMOVE_FAILURE',
            payload: error.message
        });
    }

}