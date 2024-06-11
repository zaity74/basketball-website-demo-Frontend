// ========= LIST CATEGORY ===============================
const categoryInitialState = {
    category : [],
    loading : false,
    error : null,

}
export const categoryReducer = (state = categoryInitialState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                category : action.payload,
            }
        case 'FETCH_CATEGORY_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}

// ========= CREATE CATEGORY ===============================
const createCategoryState = {
    category : [],
    loading : false,
    error : null,

}
export const createCategoryReducer = (state = createCategoryState, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'CREATE_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                category : action.payload,
            }
        case 'CREATE_CATEGORY_FAIL':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}