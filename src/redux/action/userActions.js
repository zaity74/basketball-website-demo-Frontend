import axios from 'axios';


export const userLogin = (email, password, access) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST'})
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.post('/api/v1/users/login', {
      password,
      email,
    }, config);
    // Récupérer le jeton d'authentification
    const { token, isAdmin } = response.data;

    document.cookie = `authToken=${token}; path=/`;
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      });
    localStorage.setItem('loginToken', JSON.stringify(getState().userLogin.user));
    localStorage.setItem('loginInfo', JSON.stringify(getState().userLogin.isLogin));
    window.location.href = '/';
    

  } catch (error) {
    dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Votre mot de passe ou identifiant est incorrect'
    })
  }
};

export const userRegister = (firstname, lastname, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST'})
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const response = await axios.post('/api/v1/users/register', {
        firstname,
        lastname,
        email,
        password
      }, config);
  
      console.log('REGISTER :',response.data)
  
  
      dispatch({
          type: 'REGISTER_SUCCESS',
          payload: response.data
        });
      
  
    } catch (error) {
      dispatch({
          type: 'REGISTER_FAILURE',
          payload: error.message
      })
    }
};

export const userLogout = () => async (dispatch) =>{
  localStorage.removeItem('loginToken')
  localStorage.removeItem('loginInfo')
  dispatch({
    type: 'USER_LOGOUT'
  })
}


