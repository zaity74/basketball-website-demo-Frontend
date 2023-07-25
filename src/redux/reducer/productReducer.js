// ========= LIST PRODUCT ===============================
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
                erro: null,
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

// ========= PRODUCT DETAILS ===============================
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