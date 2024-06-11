import axios from 'axios';

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const addToWishlist = (id) => async (dispatch, getState) => {
  try {

    // Récupérer le authToken d'authentification depuis les cookies
    const authToken = getCookie('authToken');

    // Si il est vide c'est que l'utilisateur n'est pas connecté
    if (!authToken) {
        return dispatch({
          type: 'ADD_TO_WISHLIST_FAIL',
          payload: 'You need to be logged in to add a product to wishlist. Please log in or create an account.',
        });
    }

    // Envoie du cookie dans le header Authorization
    const config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization' : `Bearer ${authToken}`
      }
    };

    // Déclencher l'action de requête en cours
    dispatch({ type: 'ADD_TO_WISHLIST_REQUEST' });

    // Faire la requête API pour ajouter un produit au panier
    const response = await axios.post(
      `https://basket-demo2-website-api.onrender.com/api/v1/wishlist/add-to-wishlist/${id}`, {},
      config
    );

    // Succès, retourner les données dans action.payload
    dispatch({
      type: 'ADD_TO_WISHLIST_SUCCESS',
      payload: response.data
    });

    localStorage.setItem('wishlist', JSON.stringify(getState().addToWishlist.wishlistItems));
  } catch (error) {
    dispatch({
      type: 'ADD_TO_WISHLIST_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllWishlist = () => async (dispatch, getState) => {
  try {
    // Récupérer authToken depuis les cookies 
    const authToken = getCookie('authToken');
    
    if (!authToken) {
      return dispatch({
        type: 'WISHLIST_FETCH_FAIL',
        payload: 'You need to be logged in to view the cart. Please log in or create an account.',
      });
    }

    // Configuration des en-têtes si authToken est disponible
    const config = authToken
      ? {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          withCredentials: true,
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };

    // Déclencher l'action de requête en cours
    dispatch({ type: 'WISHLIST_FETCH_REQUEST' });

    // Faire la requête API pour afficher les produits du panier en fonction de l'utilisateur
    const response = await axios.get(`https://basket-demo2-website-api.onrender.com/api/v1/wishlist/all-wishlist`, config);

    dispatch({
      type: 'WISHLIST_FETCH_SUCCESS',
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: 'WISHLIST_FETCH_FAIL',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const removeFromWishlist = (id) => async (dispatch, getState) => {
    try {
      // Recuperer authToken depuis les cookies 
     const authToken = getCookie('authToken');
    
     if (!authToken) {
         console.log('No valid token');
         return dispatch({
           type: 'REMOVE_FROM_WISHLIST_FAIL',
           payload: 'You need to be logged in to see the wishlist. Please log in or create an account.',
         });
     }
 
     // Configuration des en-têtes
     const config = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`
       }
     };

      dispatch({ type: 'REMOVE_FROM_WISHLIST_REQUEST' });
      const response = await axios.delete(`https://basket-demo2-website-api.onrender.com/api/v1/wishlist/remove-from-wishlist/${id}`, config);
      

      dispatch({ 
          type: 'REMOVE_FROM_WISHLIST_SUCCESS', 
          payload: response.data
      });
    } catch (error) {
      dispatch({ 
          type: 'REMOVE_FROM_WISHLIST_FAIL', 
          payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearWishlist = () => async (dispatch, getState) => {
  try {
    // Recuperer authToken depuis les cookies 
    const authToken = getCookie('authToken');
    
    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'CLEAR_WISHLIST_FAIL',
          payload: 'You need to be logged in to view the wishlist. Please log in or create an account.',
        });
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };

    dispatch({ type: 'CLEAR_WISHLIST_REQUEST' });

    await axios.delete('https://basket-demo2-website-api.onrender.com/api/v1/wishlist/clear-wishlist', config);

    dispatch({ type: 'CLEAR_WISHLIST_SUCCESS' });

    localStorage.removeItem('wishlist');
  } catch (error) {
    dispatch({
      type: 'CLEAR_WISHLIST_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};