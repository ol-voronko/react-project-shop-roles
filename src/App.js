import createHistory from "history/createBrowserHistory";
import React from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import { Button } from "@mui/material";
import "./App.css";

import { PageMain } from "./pages/Categories";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageCategory } from "./pages/CategoryOne/PageCategory.js";
import { PageGood } from "./pages/PageGood";
import { History } from "./pages/History";
import { AdminPage } from "./pages/AdminPage/AdminPage.js";
import Header from "./pages/Header";
import { Cart, CartEmpty } from "./pages/CartPage/Cart";
// import { Order } from "./pages/AdminPage/Order.js";
// import { Orders } from "./pages/Orders.js";
import { api } from "./APIpages/api.js";
import { store } from "./APIpages/store.js";
import { RoutesList } from "./pages/Routes/RoutesList.js";
// import { ProtectedRoute } from "./pages/ProtectedRoute.js";
import { GoodsSearch } from "./pages/GoodsSearch.js";

const history = createHistory();

console.log(api);
const { useGetRootCatsQuery } = api;

const Aside = () => {
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
const Footer = () => <footer>created by me,August 2024</footer>;

console.log(api);
store.subscribe(() => console.log(store.getState()));
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <main>
          <Aside />
          <RoutesList />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
