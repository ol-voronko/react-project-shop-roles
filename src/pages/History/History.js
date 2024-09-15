import { api } from "../../APIpages/api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { OrderHistory } from "./OrderHistory";

const { useGetUserHistoryQuery } = api;

export const History = () => {
  const { isLoading, data } = useGetUserHistoryQuery();
  console.log(isLoading, data);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const { OrderFind } = data;
  if (OrderFind.length === 0) {
    return (
      <>
        <p>Замовлень поки що не було,але це легко виправити</p>
        <Link to="/">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
            За покупками
          </Button>
        </Link>
      </>
    );
  }
  return (
    <>
      <h1>Історія замовлень</h1>
      {OrderFind.map((order) => (
        <OrderHistory key={order.createdAt} order={order} />
      ))}
    </>
  );
};
