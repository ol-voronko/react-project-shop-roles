import { endpoint } from "./Categories";
import { api } from "../APIpages/api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const { useGetUserHistoryQuery } = api;

const createDateOFOrder = (data) => {
  let date = new Date(+data).getDate().toString().padStart(2, "0");
  let month = (new Date(+data).getMonth() + 1).toString().padStart(2, "0");
  let year = new Date(+data).getFullYear();
  let dataOfOrder = `${date}/${month}/${year}`;
  return dataOfOrder;
};
const createTimeOfOrder = (data) => {
  let hours = new Date(+data).getHours().toString().padStart(2, "0");
  let minutes = new Date(+data).getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Order = ({ order }) => {
  const { total, createdAt, orderGoods } = order;

  return (
    <div className="div-history">
      <h2>
        Замовлення від{"  "}
        {createDateOFOrder(createdAt)}
        {"  "}
        {createTimeOfOrder(createdAt)}
      </h2>
      <table>
        <tr>
          <th>Назва товару</th>
          <th>Зображення</th>
          <th>Ціна</th>
          <th>Кількість</th>
          <th>Вартість</th>
        </tr>
        {orderGoods.map((orderGood) => (
          <tr>
            <td>{orderGood.good.name}</td>
            <td>
              <img
                src={endpoint + orderGood.good.images[0].url}
                alt={orderGood.good.name}
                height={200}
              />
            </td>
            <td>{orderGood.price} грн</td>
            <td>{orderGood.count} шт.</td>
            <td>{orderGood.total} грн</td>
          </tr>
        ))}
      </table>
      <p>Всього: {total}грн</p>
    </div>
  );
};

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
        <Order key={order.createdAt} order={order} />
      ))}
    </>
  );
};
