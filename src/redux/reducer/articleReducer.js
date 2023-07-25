const articleInitialState = {
    article : [],
    loading : false,
    error : null,

}

// ========= LIST ARTICLE ===============================

export const articleReducer = (state = articleInitialState, action) => {
    switch (action.type) {
        case 'FETCH_ARTICLES_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_ARTICLES_SUCCESS':
            return {
                ...state,
                loading: false,
                article : action.payload,
            }
        case 'FETCH_ARTICLES_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}

// ========= PRODUCT ARTICLE ===============================
const articleDetailInitialState = {
    articleDetail : [],
    loading : false,
    error : null,

}

export const articleDetailsReducer = (state = articleDetailInitialState, action) => {
    switch (action.type) {
        case 'FETCH_DETAILS_ARTICLE_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_DETAILS_ARTICLE_SUCCESS':
            return {
                ...state,
                loading: false,
                articleDetail : action.payload,
            }
        case 'FETCH_DETAILS_ARTICLE_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}