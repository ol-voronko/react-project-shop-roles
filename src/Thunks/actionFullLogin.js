import { actionAboutMe } from "./actionAboutMe.js";
import { api } from "../APIpages/api.js";
import { authSlice } from "../APIpages/api.js";

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.login.initiate({ login, password })
  ); //найцікавіше - як отримати з api звичайний thunk
  console.log(token);
  if (token?.data?.login) {
    dispatch(authSlice.actions.login(token.data.login));
    await dispatch(actionAboutMe()); //запит на інформацію о поточном користувачі
  } else {
    dispatch(
      authSlice.actions.setAuthError("Невірно вказані логін або пароль")
    );
  }
};
