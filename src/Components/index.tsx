import { List } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DFRole } from "../Constant/DFRole";
import CategoryManage from "../Pages/admin/category/CategoryManagement";
import Dashboard from "../Pages/admin/dashboard/Dashboard";
import DiscountManage from "../Pages/admin/discount/DiscountManagement";
import NewCategory from "../Pages/admin/new/NewCategory";
import NewDiscount from "../Pages/admin/new/NewDiscount";
import NewProduct from "../Pages/admin/new/NewProduct";
import ProductManage from "../Pages/admin/product/ProductManagement";
import UserManagement from "../Pages/admin/user/UserManagement";
import Bill from "../Pages/client/bill/Bill";
import Cart from "../Pages/client/cart/Cart";
import Contact from "../Pages/client/contact/Contact";
import HomePage from "../Pages/client/homepage/HomePage";
import Notifications from "../Pages/client/notification/Notification";
import Product from "../Pages/client/product/Product";
import ProductDetail from "../Pages/client/product/ProductDetail";
import {
  categoryInputs,
  discountInputs,
  productInputs,
} from "../route/formSource";
import { defaultRoute } from "./defaultRoute";
import CategoryDetail from "./pages/admin/category/CategoryDetail";
import { PrivateRoute } from "./PrivateRoute";

interface IRoute {
  exact: Boolean;
  path: string;
  child: React.ReactChild | any;
}

interface IPrivateRoute {
  exact: Boolean;
  path: string;
  child: React.ReactChild | any;
  private?: Boolean;
  option: boolean;
  roleRoute?: Array<string>;
}

const routes: Array<IRoute> = [
  {
    child: (
      <>
        <HomePage />
      </>
    ),
    path: defaultRoute.homepage,
    exact: true,
  },
  {
    child: (
      <>
        <Product />
      </>
    ),
    path: defaultRoute.product,
    exact: true,
  },
  {
    child: (
      <>
        <Product />
      </>
    ),
    path: defaultRoute.productCategory,
    exact: true,
  },
  {
    child: (
      <>
        <ProductDetail />
      </>
    ),
    path: defaultRoute.productDetail,
    exact: true,
  },
  {
    child: (
      <>
        <Cart />
      </>
    ),
    path: defaultRoute.cart,
    exact: true,
  },
  {
    child: (
      <>
        <Contact />
      </>
    ),
    path: defaultRoute.contact,
    exact: true,
  },
];

const routesPrivate: Array<IPrivateRoute> = [
  {
    child: <Dashboard />,
    path: defaultRoute.dashboard,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <ProductManage />,
    path: defaultRoute.productManage,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <Bill />,
    path: defaultRoute.bill,
    exact: true,
    option: true,
    roleRoute: [DFRole.Customer],
  },
  {
    child: <Notifications />,
    option: true,
    roleRoute: [DFRole.Customer],
    path: defaultRoute.notification,
    exact: true,
  },
  {
    child: <NewProduct inputs={productInputs} title="Add New Product" />,
    path: defaultRoute.newProduct,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <CategoryManage />,
    path: defaultRoute.categoryManage,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <NewCategory inputs={categoryInputs} title="Add New Category" />,
    path: defaultRoute.newCategory,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <CategoryDetail _id="62a701e0ad91633459e66d84" />,
    path: defaultRoute.viewCategory,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <UserManagement />,
    path: defaultRoute.userManage,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <DiscountManage />,
    path: defaultRoute.discountManage,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
  {
    child: <NewDiscount inputs={discountInputs} title="Add New Discount" />,
    path: defaultRoute.newDiscount,
    exact: true,
    option: true,
    roleRoute: [DFRole.Admin],
  },
];

const renderPrivateRoute = (routes: Array<IPrivateRoute>) => {
  return routes.map((r, i) => {
    if (r.exact) {
      return (
        <Route
          path={r.path}
          key={i}
          element={
            <PrivateRoute roleRoute={r?.roleRoute} option={r.option}>
              {r.child}
            </PrivateRoute>
          }
        />
      );
    } else {
      return (
        <PrivateRoute
          path={r.path}
          key={i}
          option={r.option}
          roleRoute={r?.roleRoute}
        >
          {r.child}
        </PrivateRoute>
      );
    }
  });
};

const renderRoute = (routes: Array<IRoute>) => {
  return routes.map((r, i) => {
    if (r.exact) {
      return <Route path={r.path} key={i} element={r.child}></Route>;
    } else {
      return <Route path={r.path} key={i} element={r.child}></Route>;
    }
  });
};

const RouterRender = () => {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoute(routes)}
        {renderPrivateRoute(routesPrivate)}
        <Route path="*"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterRender;
