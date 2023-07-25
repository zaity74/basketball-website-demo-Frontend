// ========= LIST ARTICLE ===============================
const sizeInitialState = {
    size : [],
    loading : false,
    error : null,

}
export const sizeReducer = (state = sizeInitialState, action) => {
    switch (action.type) {
        case 'FETCH_SIZE_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SIZE_SUCCESS':
            return {
                ...state,
                loading: false,
                size : action.payload,
            }
        case 'FETCH_SIZE_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}
