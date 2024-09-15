import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../CommonPages/Login";
import { Register } from "../CommonPages/Register";
import { PageCategory } from "../CategoryOne/PageCategory";
import { PageGood } from "../GoodPage/PageGood.js";
import { GoodsSearch } from "../CommonPages/GoodsSearch";
import { AdminPage } from "../AdminPage/AdminPage";
import { PageMain } from "../PageMain/PageMain.js";
import { History } from "../History/History.js";
import { Cart } from "../CartPage/Cart";
import { Page404 } from "../CommonPages/AsideFooter404.js";

export const RoutesList = () => (
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
