// Library
import axios from 'axios'; 
export const listeProduct = (params) => async (dispatch,getState) => {
    try {
        const { page, category, title, sortField, order, size, price, limit } = params;

      // Get the data from the API
      dispatch({ type: 'FETCH_PRODUCT_REQUEST' });
      const response = await axios.get('https://basket-demo2-website-api.onrender.com/api/v1/products/', {
        params: { page, category, title, sortField, sortOrder: order, price, size, limit },
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
        const response = await axios.get(`/api/v1/products/${id}`)
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