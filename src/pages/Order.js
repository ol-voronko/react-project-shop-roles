import { Link } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { order } from "../data";

export const Order = ({}) => {
  const { owner, total, createdAt, _id, orderGoods } = order;

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
          {new Date(+createdAt).getDate().toString().padStart(2, "0")}/
          {new Date(+createdAt).getMonth().toString().padStart(2, "0")}/
          {new Date(+createdAt).getFullYear()}
          {"  "}
          {new Date(+createdAt).getHours().toString().padStart(2, "0")}:
          {new Date(+createdAt).getMinutes().toString().padStart(2, "0")}
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ alignSelf: "center", color: "primary.dark" }}
        >
          Замовник: {owner.login}
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
          to={`/admin/order/:${_id}`}
          sx={{ alignSelf: "flex-end", fontSize: "1.2rem", fontWeight: "700" }}
        >
          Щось зробити
        </Button>
      </Card>
    </div>
  );
};
