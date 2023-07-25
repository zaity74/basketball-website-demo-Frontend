const mediasStorage = localStorage.getItem("medias")
? JSON.parse(localStorage.getItem("medias"))
: false;

const mediaInitialState = {
    medias : mediasStorage,
    loading : false,
    error : null,
}

export const mediaReducer = (state = mediaInitialState, action) => {
    switch (action.type) {
        case 'FETCH_MEDIA_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_MEDIA_SUCCESS':
            return {
                ...state,
                loading: false,
                medias : action.payload,
            }
        case 'FETCH_MEDIA_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}