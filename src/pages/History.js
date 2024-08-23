import { orders } from "../data";
import { endpoint } from "./Categories";

const Order = ({ order }) => {
  const { total, createdAt, orderGoods } = order;
  const [
    {
      good: { name, images },
      price,
      count,
    },
  ] = orderGoods;
  return (
    <div className="div-history">
      <h2>
        Замовлення від{"  "}
        {new Date(+createdAt).getDate().toString().padStart(2, "0")}/
        {new Date(+createdAt).getMonth().toString().padStart(2, "0")}/
        {new Date(+createdAt).getFullYear()}
        {"  "}
        {new Date(+createdAt).getHours().toString().padStart(2, "0")}:
        {new Date(+createdAt).getMinutes().toString().padStart(2, "0")}
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
            <td>{name}</td>
            <td>
              <img src={endpoint + images[0].url} alt={name} height={200} />
            </td>
            <td>{price} грн</td>
            <td>{count} шт.</td>
            <td>{orderGood.total} грн</td>
          </tr>
        ))}
      </table>
      <p>Всього: {total}грн</p>
    </div>
  );
};

export const History = () => {
  return (
    <>
      <h1>Історія замовлень</h1>
      {orders.map((order) => (
        <Order order={order} />
      ))}
    </>
  );
};
