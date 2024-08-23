import { Link } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { orders } from "../data";
import shadows from "@mui/material/styles/shadows";

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
          <Button component={Link} to={`/admin/order/${_id}`} sx={{}}>
            Детальніше
          </Button>
        </div>
      </Card>
    </>
  );
};
export const Orders = () => {
  return (
    <div className="orders-admin">
      {orders.map((el) => (
        <Order order={el} />
      ))}
    </div>
  );
};
