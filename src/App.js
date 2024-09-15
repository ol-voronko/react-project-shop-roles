import createHistory from "history/createBrowserHistory";
import React from "react";
import {  Router } from "react-router-dom";
import "./App.css";
import Header from "./pages/CommonPages/Header.js";
import { Aside, Footer } from "./pages/CommonPages/AsideFooter404";
import { api } from "./APIpages/api.js";
import { store } from "./APIpages/store.js";
import { RoutesList } from "./pages/Routes/RoutesList.js";

const history = createHistory();

console.log(api);

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
