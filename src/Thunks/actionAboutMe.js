// import { authSlice } from "../APIpages/api.js"
import { api } from "../APIpages/api.js";
export const actionAboutMe = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (auth.payload) {
    const { id } = auth.payload.sub;
    await dispatch(api.endpoints.getUserById.initiate({ _id: id })); //для зручності має сенс перекласти інформацію про себе в додатковий ключ authReducer
  }
};
