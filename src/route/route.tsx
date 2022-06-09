import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./privateRoute";
import HomePage from "../Pages/homepage/HomePage";
import Product from "../Pages/product/Product";
import ProductDetail from "../Pages/product/ProductDetail";
import Cart from "../Pages/cart/Cart";
import Bill from "../Pages/cart/Bill";
import Contact from "../Pages/contact/Contact";

function Router() {
  return (
    <Switch>
      <PrivateRoute path="/" component={HomePage} exact />
      <PrivateRoute path="/product" component={Product} exact />
      <PrivateRoute path="/product/:name" component={Product} exact />
      <PrivateRoute
        path="/product/:category/:id"
        component={ProductDetail}
        exact
      />
      <PrivateRoute path="/cart" component={Cart} exact />
      <PrivateRoute path="/bill" component={Bill} exact />
      <PrivateRoute path="/contact" component={Contact} exact />
    </Switch>
  );
}

export default Router;
