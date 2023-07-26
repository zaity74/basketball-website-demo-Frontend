// Library
import axios from 'axios'; 
export const listeCategory = () => async (dispatch) => {
    try {
  
      // Get the data from the API
      dispatch({ type: 'FETCH_CATEGORY_REQUEST' });
      const response = await axios.get('https://basket-demo2-website-api.onrender.com/api/v1/category/all');
  
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