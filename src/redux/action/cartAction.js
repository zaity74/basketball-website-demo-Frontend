import axios from 'axios';

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const addToCart = (id, params) => async (dispatch, getState) => {
  try {
    const { qty } = params;

    // Récupérer le authToken d'authentification depuis les cookies
    const authToken = getCookie('authToken');

    // Si il est vide c'est que l'utilisateur n'est pas connecté
    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'ADD_TO_CART_FAIL',
          payload: 'You need to be logged in to add a product to the cart. Please log in or create an account.',
        });
    }

    // Envoie du cookie dans le header Authorization
    const config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization' : `Bearer ${authToken}`
      }
    };

    // Corps de la requête
    const body = {
      qty
    };

    // Déclencher l'action de requête en cours
    dispatch({ type: 'ADD_TO_CART_REQUEST' });

    // Faire la requête API pour ajouter un produit au panier
    const response = await axios.post(
      `http://localhost:3300/api/v1/cart/add-to-cart/${id}`,
      body,
      config
    );

    // Succès, retourner les données dans action.payload
    dispatch({
      type: 'ADD_TO_CART_SUCCESS',
      payload: response.data
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().addToCart.cartItems));
  } catch (error) {
    dispatch({
      type: 'ADD_TO_CART_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCartItems = () => async (dispatch, getState) => {
  try {
    // Récupérer authToken depuis les cookies 
    const authToken = getCookie('authToken');
    
    if (!authToken) {
      console.log('il n ya pas de token iciii heuuu');
      return dispatch({
        type: 'CART_FETCH_FAIL',
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
    dispatch({ type: 'CART_FETCH_REQUEST' });

    // Faire la requête API pour afficher les produits du panier en fonction de l'utilisateur
    const response = await axios.get(`http://localhost:3300/api/v1/cart/all`, config);

    dispatch({
      type: 'CART_FETCH_SUCCESS',
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: 'CART_FETCH_FAIL',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const decreaseCartItem = (id) => async (dispatch, getState) => {
  try {
     // Recuperer authToken depuis les cookies 
     const authToken = getCookie('authToken');
    
     if (!authToken) {
         console.log('No valid token');
         return dispatch({
           type: 'DECREASE_CART_FAIL',
           payload: 'You need to be logged in to view the cart. Please log in or create an account.',
         });
     }
 
     // Configuration des en-têtes
     const config = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`
       }
     };

    dispatch({ type: 'DECREASE_CART_REQUEST' });

    // Effectuer la requête pour diminuer la quantité dans le backend (si nécessaire)
    const response = await axios.put(`http://localhost:3300/api/v1/cart/decrease/${id}`,{}, config);

    dispatch({ 
      type: 'DECREASE_CART_SUCCESS', 
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'DECREASE_CART_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const increaseCartItem = (id) => async (dispatch, getState) => {
  try {

    // Recuperer authToken depuis les cookies 
    const authToken = getCookie('authToken');
    
    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'CART_FETCH_FAIL',
          payload: 'You need to be logged in to view the cart. Please log in or create an account.',
        });
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };

    dispatch({ type: 'INSCREASE_CART_REQUEST' });

    // Effectuer la requête pour diminuer la quantité dans le backend (si nécessaire)
    const response = await axios.put(`http://localhost:3300/api/v1/cart/increase/${id}`,{}, config);

    dispatch({ 
      type: 'INCREASE_CART_SUCCESS', 
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'INCREASE_CART_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
  

export const removeCart = (id) => async (dispatch, getState) => {
    try {
      // Recuperer authToken depuis les cookies 
     const authToken = getCookie('authToken');
    
     if (!authToken) {
         console.log('No valid token');
         return dispatch({
           type: 'CART_FETCH_FAIL',
           payload: 'You need to be logged in to view the cart. Please log in or create an account.',
         });
     }
 
     // Configuration des en-têtes
     const config = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${authToken}`
       }
     };

      dispatch({ type: 'REMOVE_FROM_CART_REQUEST' });
      const response = await axios.delete(`http://localhost:3300/api/v1/cart/remove-to-cart/${id}`, config);
      

      dispatch({ 
          type: 'REMOVE_FROM_CART_SUCCESS', 
          payload: response.data
      });
    } catch (error) {
      dispatch({ 
          type: 'REMOVE_FROM_CART_FAIL', 
          payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const clearCart = () => async (dispatch, getState) => {
  try {
    // Recuperer authToken depuis les cookies 
    const authToken = getCookie('authToken');
    
    if (!authToken) {
        console.log('No valid token');
        return dispatch({
          type: 'CART_FETCH_FAIL',
          payload: 'You need to be logged in to view the cart. Please log in or create an account.',
        });
    }

    // Configuration des en-têtes
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };

    dispatch({ type: 'CLEAR_CART_REQUEST' });

    await axios.delete('http://localhost:3300/api/v1/cart/clear', config);

    dispatch({ type: 'CLEAR_CART_SUCCESS' });

    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: 'CLEAR_CART_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};