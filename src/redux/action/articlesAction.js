// Library
import axios from 'axios'; 

// ENV VARIABLE 
export const listeArticles = (params) => async (dispatch) => {
    try {
      const { page, category, title, sortField, sortOrder } = params;
  
      // Get the data from the API
      dispatch({ type: 'FETCH_ARTICLES_REQUEST' });
      const response = await axios.get('https://basket-demo2-website-api.onrender.com/api/v1/articles/', {
        params: { page, category, title, sortField, sortOrder},
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
        const response = await axios.get(`https://basket-demo2-website-api.onrender.com/api/v1/articles/${id}`)
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

export const createArticle = (params) => async (dispatch, getState) => {
  try {
    const {
      title,
      content,
      description,
      slug,
      category,
      user,
      banner
    } = params;

    // Récupérer le authToken depuis le localStorage
     const tokenInfo = JSON.parse(localStorage.getItem('loginToken'));

     if (!tokenInfo || !tokenInfo.token) {
       throw new Error('No auth token found');
     }
 
     const authToken = tokenInfo.token;

    if (!authToken) {
      throw new Error('No auth token found');
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    };

    // Corps de la requête
    const body = {
      title,
      content,
      description,
      slug,
      category,
      user,
      banner
    };

    // Déclencher l'action de requête en cours
    dispatch({ type: 'FETCH_CREATE_ARTICLE_REQUEST' });

    // Faire la requête API pour créer un article
    const response = await axios.post(`https://basket-demo2-website-api.onrender.com/api/v1/articles/create-article/`, body, config);

    // Succès, retourner les données dans action.payload
    dispatch({
      type: 'FETCH_CREATE_ARTICLE_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    // Erreur, ne pas pouvoir retourner les données
    dispatch({
      type: 'FETCH_CREATE_ARTICLE_FAILURE',
      payload: error.message
    });
  }
};

  