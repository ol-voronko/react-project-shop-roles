import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Typography } from "@mui/material";
// import { orders } from "../data";
import shadows from "@mui/material/styles/shadows";
import { api } from "../APIpages/api";
import { useEffect, useRef } from "react";
import {
  selectAllFeeds,
  selectFeedCount,
  selectFeedIsLoading,
} from "../APIpages/selectors";
import { useDispatch } from "react-redux";
import { actionGetMoreOrders } from "../Thunks/actionGetMoreOrders";
import { Height } from "@mui/icons-material";

const { useGetAllOrdersQuery } = api;

const Order = ({ order }) => {
  const { owner, total, createdAt, _id } = order;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          //boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          boxShadow: shadows[10],
          width: "90%",
          marginLeft: "0",
        }}
      >
        <Typography variant="h6" color="info.dark">
          Замовлення № {_id} від {"  "}
          {new Date(+createdAt).getDate().toString().padStart(2, "0")}/
          {new Date(+createdAt).getMonth().toString().padStart(2, "0")}/
          {new Date(+createdAt).getFullYear()}
          {"  "}
          {new Date(+createdAt).getHours().toString().padStart(2, "0")}:
          {new Date(+createdAt).getMinutes().toString().padStart(2, "0")}
        </Typography>
        <div className="order-description-admin">
          {/* <Typography variant="h6" color="text.secondary">
            Замовник: {owner.login}
          </Typography> */}
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
  const feedCount = useSelector(selectFeedCount);
  const feeds = useSelector(selectAllFeeds);
  const feedisLoading = useSelector(selectFeedIsLoading);
  // const { isLoading, data } = useGetAllOrdersQuery(feedCount);
  const divRef = useRef();

  const onScrollHandler = (ev) => {
    const a = window.innerHeight + Math.round(window.scrollY);
    // if (a >= document.body.offsetHeight) {
    //   // if (!isLoading) {
    //   dispatch(actionGetMoreOrders());
    //   // }
    //}
    const divRefY = divRef.current.getBoundingClientRect().y;
    if (divRefY <= window.innerHeight && !feedisLoading) {
      dispatch(actionGetMoreOrders());
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => {
      window.removeEventListener("scroll", onScrollHandler);
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
