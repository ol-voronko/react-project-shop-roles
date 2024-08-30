import { useParams } from "react-router-dom";
import { api } from "../APIpages/api";
import { CardGood } from "./PageCategory";

const { useGoodsSearchQuery } = api;
export const GoodsSearch = () => {
  const { search } = useParams();
  const { isLoading, data } = useGoodsSearchQuery(search);
  if (isLoading) {
    return <h3>Loading...please wait</h3>;
  }
  const { GoodFind } = data;

  return (
    <div>
      <h3>Знайдено за Вашим запитом</h3>
      <div className="category-all">
        {GoodFind.map((good) => (
          <CardGood good={good} />
        ))}
      </div>
    </div>
  );
};
