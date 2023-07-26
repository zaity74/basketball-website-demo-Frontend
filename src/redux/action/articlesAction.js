// Library
import axios from 'axios'; 

// ENV VARIABLE 
export const listeArticles = (params) => async (dispatch) => {
    try {
      const { page, category, title, sortField, order } = params;
  
      // Get the data from the API
      dispatch({ type: 'FETCH_ARTICLES_REQUEST' });
      const response = await axios.get('/api/v1/articles', {
        params: { page, category, title, sortField, sortOrder: order },
      });
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_ARTICLES_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_ARTICLES_FAILURE',
        payload: error.message,
      });
    }
  };
export const articleDetail = (id)  => async (dispatch,getState) => {
    try {
        // Get the data from the api product
        dispatch({ type: 'FETCH_DETAILS_ARTICLE_REQUEST' })
        const response = await axios.get(`/api/v1/articles/${id}`)
        // Success, return data into action.payload
        dispatch({
            type: 'FETCH_DETAILS_ARTICLE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        // Error, can't return data
        dispatch({
            type: 'FETCH_DETAILS_ARTICLE_FAILURE',
            payload: error.message
        })
    }
}
  