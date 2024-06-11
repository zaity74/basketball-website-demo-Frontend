// Library
import axios from 'axios'; 
export const listeMedia = () => async (dispatch,getState) => {
    try {
      // Get the data from the API
      dispatch({ type: 'FETCH_MEDIA_REQUEST' });
      const response = await axios.get(`https://basketball-demo.netlify.app/api/v1/medias/all`);
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_MEDIA_SUCCESS',
        payload: response.data,
      });
      localStorage.setItem('medias', JSON.stringify(getState().listMedia.medias.data));
    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_MEDIA_FAILURE',
        payload: error.message,
      });
    }
  };