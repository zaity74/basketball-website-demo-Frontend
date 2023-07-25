// On refresh page, user and isLogin are equel to 
//the value in localstorage

const loginTokenStorage = localStorage.getItem("loginToken")
  ? JSON.parse(localStorage.getItem("loginToken"))
  : [];
const loginInfoStorage = localStorage.getItem("loginInfo")
? JSON.parse(localStorage.getItem("loginInfo"))
: false;
const userLoginState = {
    user: loginTokenStorage,
    loading : false,
    error : null,
    isLogin : loginInfoStorage,
}

export const userLoginReducer = (state = userLoginState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                user : action.payload,
                isLogin : true, 
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload,
                isLogin : false, 
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                loading: false,
                user : {},
                isLogin : false, 
            }
        default:
            return state
    }
}



const registerTokenStorage = localStorage.getItem("registerToken")
  ? JSON.parse(localStorage.getItem("registerToken"))
  : [];


const userRegisterState = {
    register: registerTokenStorage,
    loading : false,
    error : null,
    isRegister : false,

}
export const userRegisterReducer = (state = userRegisterState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                isRegister : true, 
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload,
                isRegister : false, 
            }
        case 'REMOVE_REGISTER':
            return {
                ...state,
                loading: false,
                user : {},
                isRegister : false, 
            }
        default:
            return state
    }
}

