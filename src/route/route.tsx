import { Route, Routes } from "react-router-dom";

import CategoryDetail from "../Components/pages/admin/category/CategoryDetail";
import CategoryManage from "../Pages/admin/category/CategoryManagement";
import Dashboard from "../Pages/admin/dashboard/Dashboard";
import DiscountManage from "../Pages/admin/discount/DiscountManagement";
import NewCategory from "../Pages/admin/new/NewCategory";
import NewDiscount from "../Pages/admin/new/NewDiscount";
import NewProduct from "../Pages/admin/new/NewProduct";
import ProductManage from "../Pages/admin/product/ProductManagement";
import List from "../Pages/admin/user/UserManagement";
import Bill from "../Pages/client/bill/Bill";

import Cart from "../Pages/client/cart/Cart";
import Contact from "../Pages/client/contact/Contact";
import HomePage from "../Pages/client/homepage/HomePage";
import Product from "../Pages/client/product/Product";
import ProductDetail from "../Pages/client/product/ProductDetail";
import { categoryInputs, discountInputs, productInputs } from "./formSource";
import { PrivateRoute } from "./privateRoute";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:name"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:category/:id"
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/bill"
        element={
          <PrivateRoute>
            <Bill />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />
      <Route
        path="/listuser"
        element={
          <PrivateRoute>
            <List />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/new"
        element={
          <PrivateRoute>
            <NewCategory inputs={categoryInputs} title="Add New Category" />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/categoryManage"
        element={
          <PrivateRoute>
            <CategoryManage />
          </PrivateRoute>
        }
      />
      <Route
        path="/productManage"
        element={
          <PrivateRoute>
            <ProductManage />
          </PrivateRoute>
        }
      />
      <Route
        path="/discountManage"
        element={
          <PrivateRoute>
            <DiscountManage />
          </PrivateRoute>
        }
      />
      <Route
        path="/discount/new"
        element={
          <PrivateRoute>
            <NewDiscount inputs={discountInputs} title="Add New Discount" />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/new"
        element={
          <PrivateRoute>
            <NewProduct inputs={productInputs} title="Add New Product" />
          </PrivateRoute>
        }
      />
      <Route
        path="/categoryManage/view"
        element={
          <PrivateRoute>
            <CategoryDetail />
          </PrivateRoute>
        }
      />

      {/* <PrivateRoute path="/products" element={<Product />} />
      <PrivateRoute path="/products/:name" element={<Product />} />
      <PrivateRoute
        path="/products/:category/:id"
        element={<ProductDetail />}
      />
      <PrivateRoute path="/cart" element={<Cart />} />
      <PrivateRoute path="/bill" element={<Bill />} />
      <PrivateRoute path="/contact" element={<Contact />} />
      <PrivateRoute path="/listuser" element={<List />} />
      <PrivateRoute path="/category/new">
        <NewCategory inputs={categoryInputs} title="Add New Category" />
      </PrivateRoute>
      <PrivateRoute path="/dashboard" element={<Dashboard />} />
      <PrivateRoute path="/categoryManage" element={<CategoryManage />} />

      <PrivateRoute path="/productManage" element={<ProductManage />} />
      <PrivateRoute path="/product/new">
        <NewProduct inputs={productInputs} title="Add New Product" />
      </PrivateRoute>
      <PrivateRoute path="/discount/new">
        <NewDiscount inputs={discountInputs} title="Add New Discount" />
      </PrivateRoute>
      <PrivateRoute path="/categoryManage/view">
        <CategoryDetail _id="62a701e0ad91633459e66d84" />
      </PrivateRoute> */}
    </Routes>
  );
}

export default Router;
