import { api } from "../../APIpages/api";
import { Link } from "react-router-dom";

const { useGetRootCatsQuery } = api;
export const Aside = () => {
  const { isLoading, data } = useGetRootCatsQuery();
  console.log(isLoading, data);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <aside>
      <ul>
        {data.CategoryFind.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const Page404 = () => <h1>404</h1>;
export const Footer = () => <footer>created by O.Voronko,August 2024</footer>;
