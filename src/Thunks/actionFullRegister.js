import { actionFullLogin } from "./actionFullLogin";
import { api } from "../APIpages/api";
import { authSlice } from "../APIpages/reducers/authReducer";

export const actionFullRegister =
  (login, password, nick) => async (dispatch) => {
    const response = await dispatch(
      api.endpoints.register.initiate({ login, password, nick })
    );
    if (response.error) {
      dispatch(authSlice.actions.setAuthError(`User ${login} already exists`));
    } else {
      dispatch(actionFullLogin(login, password));
    }
  };
