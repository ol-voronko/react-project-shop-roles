import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import createHistory from "history/createBrowserHistory";
import React from "react";

import { Link, Route, Router, Switch } from "react-router-dom";
import { Button } from "@mui/material";
import "./App.css";

import { PageMain } from "./pages/Categories";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageCategory } from "./pages/PageCategory";
import { PageGood } from "./pages/PageGood";
import { History } from "./pages/History";
import { AdminPage } from "./pages/AdminPage/AdminPage.js";
import Header from "./pages/Header";
import { Cart, CartEmpty } from "./pages/CartPage/Cart";
// import { Order } from "./pages/AdminPage/Order.js";
// import { Orders } from "./pages/Orders.js";
import { api } from "./APIpages/api.js";
import { store } from "./APIpages/store.js";
import { ProtectedRoute } from "./pages/ProtectedRoute.js";
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
const Page404 = () => <h1>404</h1>;
const Footer = () => <footer>created by me,August 2024</footer>;
const RoutesList = () => (
  <Switch>
    <Route path="/" component={PageMain} exact />
    <Route path="/cart" component={Cart} />
    <ProtectedRoute
      path="/history"
      user={["user"]}
      fallback={"/login"}
      component={History}
    />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/category/:_id" component={PageCategory} />
    <Route path="/good/:_id" component={PageGood} />
    <Route path="/goods/:search" component={GoodsSearch} />
    <ProtectedRoute
      path="/admin"
      user={["admin"]}
      fallback={"/"}
      component={AdminPage}
    />
    <Route path="*" component={Page404} />
  </Switch>
);
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
