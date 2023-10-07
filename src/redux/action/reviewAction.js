import axios from "axios";


export const addReview = (id, params) => async (dispatch, getState) => {
  // COOKIES VARIABLE
  const token = getState().userLogin.user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  try {
    const { rating, comment } = params;
    dispatch({ type: 'FETCH_REVIEW_REQUEST' });

    const response = await axios.post(
      `http://localhost:3306/api/v1/reviews/create-review/${id}`,{ rating, comment },config
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
        const response = await axios.delete(`https://basket-demo2-website-api.onrender.com/api/product/reviews/${id}`,config);
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