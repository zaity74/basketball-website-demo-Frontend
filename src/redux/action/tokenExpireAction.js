import { userLogout } from "./userActions";

export const tokenExpires = () => async (dispatch) => {
    dispatch(userLogout());
  };