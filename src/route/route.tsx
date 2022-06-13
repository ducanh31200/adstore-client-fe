import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./privateRoute";
import HomePage from "../Pages/client/homepage/HomePage";
import Product from "../Pages/client/product/Product";
import ProductDetail from "../Pages/client/product/ProductDetail";
import Cart from "../Pages/client/cart/Cart";
import Bill from "../Pages/client/cart/Bill";
import Contact from "../Pages/client/contact/Contact";
import Dashboard from "../Pages/admin/dashboard/Dashboard";
import List from "../Pages/admin/user/User";
import NewProduct from "../Pages/admin/new/NewProduct";
import { categoryInputs, productInputs } from "./formSource";
import NewCategory from "../Pages/admin/new/NewCategory";
import CatManage from "../Pages/admin/category/CatTable";
import CategoryManage from "../Pages/admin/category/CategoryManage";
import ProductManage from "../Pages/admin/product/ProductManage";

function Router() {
  return (
    <Switch>
      <PrivateRoute path="/" component={HomePage} exact />
      <PrivateRoute path="/products" component={Product} exact />
      <PrivateRoute path="/products/:name" component={Product} exact />
      <PrivateRoute
        path="/products/:category/:id"
        component={ProductDetail}
        exact
      />
      <PrivateRoute path="/cart" component={Cart} exact />
      <PrivateRoute path="/bill" component={Bill} exact />
      <PrivateRoute path="/contact" component={Contact} exact />
      <PrivateRoute path="/listuser" component={List} exact />
      <PrivateRoute path="/category/new" exact>
        <NewCategory inputs={categoryInputs} title="Add New Category" />
      </PrivateRoute>
      <PrivateRoute path="/dashboard" component={Dashboard} exact />
      <PrivateRoute path="/categoryManage" component={CategoryManage} exact />
      <PrivateRoute path="/productManage" component={ProductManage} exact />
      <PrivateRoute path="/product/new" exact>
        <NewProduct inputs={productInputs} title="Add New Product" />
      </PrivateRoute>
    </Switch>
  );
}

export default Router;
