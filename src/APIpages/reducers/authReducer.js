import { createSlice } from "@reduxjs/toolkit";

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, payload: null, error: null },
  reducers: {
    login(state, { payload: token }) {
      //другий параметр - об'єкт екшона, token потрапляє в ключ payload
      // console.log('LOGIN', state, token)
      const payload = jwtDecode(token);
      if (payload) {
        state.payload = payload;
        state.token = token;
      }
    },
    logout(state) {
      state.payload = null;
      state.token = null;
    },
    setAuthError(state, { payload: error }) {
      state.error = error;
    },
  },
});
