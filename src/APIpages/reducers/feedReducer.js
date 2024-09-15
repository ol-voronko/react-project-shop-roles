import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: { feed: [], isLoading: false },
  reducers: {
    feedAdd(state, { payload }, isLoading) {
      const filtred = payload.filter(
        (el) => !state.feed.find((feed) => feed._id === el._id)
      );
      state.feed = [...state.feed, ...filtred];
      state.isLoading = isLoading;
    },
    feedClear(state) {
      state.feed = [];
      state.isLoading = false;
    },
    setFeedIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { feedAdd, setFeedIsLoading, feedClear } = feedSlice.actions;
