const gamesInitialState = {
    games : [],
    ranking: [],
    loading : false,
    error : null,

}

// ========= LIST GAMES ===============================

export const gamesReducer = (state = gamesInitialState, action) => {
    switch (action.type) {
        case 'FETCH_GAMES_CALENDAR_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_GAMES_CALENDAR_SUCCESS':
            return {
                ...state,
                loading: false,
                games : action.payload,
            }
        case 'FETCH_GAMES_CALENDAR_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        case 'FETCH_RANKING_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_RANKING_SUCCESS':
            return {
                ...state,
                loading: false,
                ranking : action.payload,
            }
        case 'FETCH_RANKING_FAILURE':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default:
            return state
    }
}