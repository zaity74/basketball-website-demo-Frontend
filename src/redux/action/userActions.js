import axios from 'axios';


export const userLogin = (email, password, access) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST'})
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.post(`https://basket-demo2-website-api.onrender.com/api/v1/users/login`, {
      password,
      email,
    }, config);
    // Récupérer le jeton d'authentification
    const { token } = response.data;

    document.cookie = `authToken=${token}; path=/`;
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      });
    localStorage.setItem('loginToken', JSON.stringify(getState().userLogin.user));
    localStorage.setItem('loginInfo', JSON.stringify(getState().userLogin.isLogin));
    // window.location.href = '/';
    

  } catch (error) {
    dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response && error.response.data ? error.response.data : error.message
    })
  }
};

export const userRegister = (firstname, lastname, email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_REQUEST' });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await axios.post('https://basket-demo2-website-api.onrender.com/api/v1/users/register', {
            firstname,
            lastname,
            email,
            password,
        }, config);

        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: 'REGISTER_FAILURE',
            payload: error.response && error.response.data ? error.response.data : error.message,
        });
        console.log('SHOW ERROR :', error);
    }
};


export const userLogout = () => async (dispatch) =>{
  localStorage.removeItem('loginToken')
  localStorage.removeItem('loginInfo')
  dispatch({
    type: 'USER_LOGOUT'
  })
}

export const forgotPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST'})
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.post(`https://basket-demo2-website-api.onrender.com/api/v1/users/forgot-password`, {
      email,
    }, config);

    dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: response.data
      });
    

  } catch (error) {
    dispatch({
        type: 'FORGOT_PASSWORD_FAILURE',
        payload: error.response.data && error.response.data
    })
    console.log('SHOW ERROR :', error);
  }
};

