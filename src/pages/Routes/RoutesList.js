import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../Login";
import { Register } from "../Register";
import { PageCategory } from "../CategoryOne/PageCategory";
import { PageGood } from "../PageGood";
import { GoodsSearch } from "../GoodsSearch";
import { AdminPage } from "../AdminPage/AdminPage";
import { PageMain } from "../Categories";
import { History } from "../History";
import { Cart } from "../CartPage/Cart";
import { Page404 } from "../../App";
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
