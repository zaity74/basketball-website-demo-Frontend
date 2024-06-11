// Library
import axios from 'axios'; 
export const listeCalendar = () => async (dispatch) => {
    try {
      // Get the data from the API
      dispatch({ type: 'FETCH_GAMES_CALENDAR_REQUEST' });
      const response = await axios.get(`http://localhost:3300/api/v1/games/calendar`);
  
      // Success, return data into action.payload
      dispatch({
        type: 'FETCH_GAMES_CALENDAR_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      // Error, can't return data
      dispatch({
        type: 'FETCH_GAMES_CALENDAR_FAILURE',
        payload: error.message,
      });
    }
  };

export const listeRanking = () => async (dispatch) => {
  try {
    // Get the data from the API
    dispatch({ type: 'FETCH_RANKING_REQUEST' });
    const response = await axios.get(`http://localhost:3300/api/v1/games/ranking`);

    // Success, return data into action.payload
    dispatch({
      type: 'FETCH_RANKING_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    // Error, can't return data
    dispatch({
      type: 'FETCH_RANKING_FAILURE',
      payload: error.message,
    });
  }
};