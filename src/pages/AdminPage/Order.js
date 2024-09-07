import { Link, useParams } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { api } from "../../APIpages/api";
import { createDateOFOrder, createTimeOfOrder } from "../History";

const { useGetOrderByIdQuery } = api;

export const Order = () => {
  const { _id } = useParams();
  const { isLoading, data } = useGetOrderByIdQuery({ _id });
  console.log(data);
  console.log(isLoading, data, _id);
  if (isLoading) {
    return <h3>Loading...wait a little...</h3>;
  }
  const {
    OrderFindOne: {
      owner: { login },
      total,
      createdAt,
      orderGoods,
    },
  } = data;
  return (
    <div
      div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "2vh",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          width: "95%",
          marginLeft: "0",
          padding: "20px",
        }}
      >
        <Typography variant="h5" color="info.dark">
          Замовлення № {_id} від {"  "}
          {createDateOFOrder(createdAt)}
          {"  "}
          {createTimeOfOrder(createdAt)}
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ alignSelf: "center", color: "primary.dark" }}
        >
          Замовник: {login}
        </Typography>
        <table>
          <tr>
            <th>Назва товару</th>

            <th>Ціна,грн</th>
            <th>Кількість,шт</th>
            <th>Вартість,грн</th>
          </tr>
          {orderGoods.map((orderGood) => (
            // <div className="order-description-admin">
            <tr>
              <td>
                <Typography variant="h6" color="text.secondary" component="div">
                  {orderGood.goodName}
                </Typography>
              </td>
              <td>
                <Typography variant="h6" color="text.secondary" component="div">
                  {orderGood.price}
                </Typography>
              </td>
              <td>
                <Typography variant="h6" color="text.secondary" component="div">
                  {orderGood.count}
                </Typography>
              </td>
              <td>
                <Typography variant="h6" color="text.secondary" component="div">
                  {orderGood.price * orderGood.count}
                </Typography>
              </td>
            </tr>
            // </div>
          ))}
        </table>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            alignSelf: "flex-end",
            color: "primary.dark",
          }}
        >
          Загальна сума : {total} грн
        </Typography>
        {/* <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}> */}
        <Button
          component={Link}
          to={`/admin/orders`}
          sx={{ alignSelf: "flex-end", fontSize: "1.2rem", fontWeight: "700" }}
        >
          Назад
        </Button>
      </Card>
    </div>
  );
};
