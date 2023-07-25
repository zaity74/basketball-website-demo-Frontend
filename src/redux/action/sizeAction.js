// Library
import axios from 'axios'; 
export const listeSizes = () => async (dispatch) => {
    try {
  
      // Get the data from the API
      dispatch({ type: 'FETCH_SIZE_REQUEST' });
      const response = await axios.get('/api/v1/sizes/all');
  
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