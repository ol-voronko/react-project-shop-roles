import { BACKEND_HOSTNAME } from "../../APIpages/api";

export const createDateOFOrder = (data) => {
  let date = new Date(+data).getDate().toString().padStart(2, "0");
  let month = (new Date(+data).getMonth() + 1).toString().padStart(2, "0");
  let year = new Date(+data).getFullYear();
  let dataOfOrder = `${date}/${month}/${year}`;
  return dataOfOrder;
};
export const createTimeOfOrder = (data) => {
  let hours = new Date(+data).getHours().toString().padStart(2, "0");
  let minutes = new Date(+data).getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const OrderHistory = ({ order }) => {
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
                src={`http://${BACKEND_HOSTNAME}/${orderGood.good.images[0].url}`}
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
