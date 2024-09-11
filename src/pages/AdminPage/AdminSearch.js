import { useParams } from "react-router-dom";
import { api } from "../../APIpages/api";
import { CardOneGoodAdmin } from "./AdminGoods";

const { useGoodsSearchQuery } = api;

export const AdminSearch = () => {
  const { search } = useParams();
  const { isLoading, data } = useGoodsSearchQuery(search);

  if (isLoading) {
    return <h3>Loading...please wait</h3>;
  }
  const { GoodFind } = data;
  return (
    <div>
      <h3>Знайдено за Вашим запитом</h3>
      {GoodFind.map((good) => (
        <CardOneGoodAdmin good={good} />
      ))}
    </div>
  );
};
