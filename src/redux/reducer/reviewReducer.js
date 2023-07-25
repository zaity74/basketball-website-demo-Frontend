// ========= LIST FAVORIS  ===============================
const reviewFromStorage = localStorage.getItem("review")
  ? JSON.parse(localStorage.getItem("review"))
  : [];

const reviewState = {
  loading: false,
  review: reviewFromStorage,
  error: null,
};

export const reviewReducer = (state = reviewState, action) => {
    switch (action.type) {
        case 'FETCH_REVIEW_REQUEST':
            return {
            ...state,
            loading: false,
            };
        case 'FETCH_REVIEW_SUCCESS':
            return {
                ...state,
                review: action.payload,
                loading: true,
            };
 
        case 'FETCH_REVIEW_FAILURE':
            return {
            ...state,
            error: action.payload,
            };
        case 'REVIEW_REMOVE':
            return {};
        case 'REVIEW_REMOVE_FAILURE':
            return {
                ...state,
                error: action.payload
            };
      default:
        return state;
    }
  };