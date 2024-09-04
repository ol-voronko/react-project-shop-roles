// селектор для auth

export const selectAuthToken = (state) => {
  return state.auth.token;
};

export const selectUserRole = (state) => {
  if (state.auth.payload) {
    return state.auth.payload.sub.acl[state.auth.payload.sub.acl.length - 1];
  } else {
    return null;
  }
};

// селектор для помилки
export const selectAuthError = (state) => {
  return state.auth.error;
};

// селектор для cart
export const selectCart = (state) => state.cartPage.cart;

// селектор для скролу

export const selectFeedCount = (state) => state.feed.feed.length;

export const selectAllFeeds = (state) => state.feed.feed;

export const selectFeedIsLoading = (state) => state.feed.isLoading;
