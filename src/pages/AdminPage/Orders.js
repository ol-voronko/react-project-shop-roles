import { Button, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shadows from "@mui/material/styles/shadows";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { feedClear } from "../../APIpages/reducers/feedReducer";
import { selectAllFeeds, selectFeedIsLoading } from "../../APIpages/selectors";
import { actionGetMoreOrders } from "../../Thunks/actionGetMoreOrders";
import {
  createDateOFOrder,
  createTimeOfOrder,
} from "../History/OrderHistory.js";

const Order = ({ order }) => {
  const { total, createdAt, _id } = order;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",

          boxShadow: shadows[10],
          width: "90%",
          marginLeft: "0",
        }}
      >
        <Typography variant="h6" color="info.dark">
          Замовлення № {_id} від {"  "}
          {createDateOFOrder(createdAt)}
          {"  "}
          {createTimeOfOrder(createdAt)}
        </Typography>
        <div className="order-description-admin">
          <Typography variant="h6" color="text.secondary">
            Загальна сума : {total} грн
          </Typography>
          <Button component={Link} to={`/admin/order/${_id}`}>
            Детальніше
          </Button>
        </div>
      </Card>
    </>
  );
};
export const Orders = () => {
  const dispatch = useDispatch();

  const feeds = useSelector(selectAllFeeds);
  const feedisLoading = useSelector(selectFeedIsLoading);

  const divRef = useRef();

  const onScrollHandler = (ev) => {
    // const a = window.innerHeight + Math.round(window.scrollY);
    const divRefY = divRef.current.getBoundingClientRect().y;
    if (divRefY <= window.innerHeight && !feedisLoading) {
      dispatch(actionGetMoreOrders());
    }
  };

  useEffect(() => {
    dispatch(actionGetMoreOrders());

    window.addEventListener("scroll", onScrollHandler);
    return () => {
      window.removeEventListener("scroll", onScrollHandler);
      dispatch(feedClear());
    };
  }, []);

  return (
    <div className="orders-admin">
      {feeds.map((order) => (
        <Order key={order._id} order={order} />
      ))}
      {feedisLoading && <h4>Loading...wait...</h4>}
      <div ref={divRef} style={{ height: "5px" }}></div>
    </div>
  );
};
