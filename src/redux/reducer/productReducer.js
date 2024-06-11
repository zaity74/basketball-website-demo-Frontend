// --------------- LIST PRODUCT -----------------------------------------
const productInitialState = {
    product : [],
    loading : false,
    error : null,

}

export const productReducer = (state = productInitialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                product : action.payload,
                error: null,
            }
        case 'FETCH_PRODUCT_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}

// --------------------- PRODUCT DETAILS ---------------------
const productDetailInitialState = {
    productDetail : [],
    loading : false,
    error : null,

}

export const productDetailsReducer = (state = productDetailInitialState, action) => {
    switch (action.type) {
        case 'FETCH_DETAILS_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_DETAILS_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                productDetail : action.payload,
            }
        case 'FETCH_DETAILS_PRODUCT_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}


// ----------------- CREATE PRODUCT ----------------------------------
const createProductState = {
    product : [],
    loading : false,
    error : null,
}
export const createProductReducer = (state = createProductState, action) => {
    switch (action.type) {
        case 'PRODUCT_CREATED_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'PRODUCT_CREATED_SUCCESS':
            return {
                ...state,
                loading: false,
                product : action.payload,
                error: null,
            }
        case 'PRODUCT_CREATED_FAIL':
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        default:
            return state
    }
}

// ----------------- USER PRODUCT STATUS ----------------------------------
const userProductState = {
    userProduct : [],
    loading : false,
    error : null,
}
export const userProductReducer = (state = userProductState, action) => {
    switch (action.type) {
        case 'USER_PRODUCT_STATUS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'USER_PRODUCT_STATUS_SUCCESS':
            return {
                ...state,
                loading: false,
                userProduct : action.payload,
                error: null,
            }
        case 'USER_PRODUCT_STATUS_FAIL':
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        default:
            return state
    }
}


// --------------------- PRODUCT RELATED ---------------------

const productRelatedState = {
    relatedProduct : [],
    loading : false,
    error : null,
}
export const relatedProductReducer = (state = productRelatedState, action) => {
    switch (action.type) {
        case 'RELATED_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'RELATED_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                relatedProduct: action.payload,
                error: null,
            }
        case 'RELATED_PRODUCTS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
