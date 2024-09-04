import { api } from "../APIpages/api";
import { feedAdd, setFeedIsLoading } from "../APIpages/reducers/feedReducer";

export const actionGetMoreOrders = () => async (dispatch, getState) => {
  const feedCount = getState().feed.feed.length;

  console.log(getState());
  try {
    dispatch(setFeedIsLoading(true));
    const response = await dispatch(
      api.endpoints.getAllOrders.initiate(feedCount)
    );

    dispatch(feedAdd(response.data.OrderFind));
  } finally {
    dispatch(setFeedIsLoading(false));
  }

  console.log(getState());
};
