import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../../../Components/pages/client/homepage/CategoryCard";

import useAuth from "../../../store/auth";
import Nav from "../../../Components/common/Nav/nav";
import useLocalCart from "../../../store/localCart";
import "./style.css";
const Failure = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [localCart, actionLocalCart] = useLocalCart();
  React.useEffect(() => {
    (() => {
      if (!stateAuth.isLoggedIn) actionLocalCart.GetLocalCart();
    })();
  }, []);
  return (
    <div>
      {" "}
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            {/* <div className="d-inline-flex align-items-center">
          <a className="text-dark" href="">
            FAQs
          </a>
          <span className="text-muted px-2">|</span>
          <a className="text-dark" href="">
            Help
          </a>
          <span className="text-muted px-2">|</span>
          <a className="text-dark" href="">
            Support
          </a>
        </div> */}
          </div>

          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a
                className="text-dark px-2"
                href="https://www.facebook.com/anh.doduc.312/"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="text-dark px-2"
                href="https://www.instagram.com/duc.anhhh3/"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="text-dark pl-2"
                href="https://www.youtube.com/channel/UCbxYQOD3UTWawQQlC0JWGjg"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link to="/" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  AD
                </span>
                Store
              </h1>
            </Link>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
            <Link to="/notification" className="btn border">
              <i className="fas fa-heart text-primary"></i>
              <span className="badge">
                {!stateAuth.isLoggedIn
                  ? 0
                  : stateAuth.data?.data?.notifications_length
                  ? stateAuth.data?.data?.notifications_length
                  : 0}
              </span>
            </Link>

            <Link to="/cart" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">
                {stateAuth.isLoggedIn
                  ? stateAuth.data.data.bag_items_length
                  : localCart.count}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <div className="payment1">
              <div className="payment_header1">
                <div className="check1">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </div>
              </div>
              <div className="content1">
                <h1>Tạo đơn hàng thất bại !</h1>
                <p>
                  Đã có lỗi xảy ra trong quá trình tạo đơn, vui lòng thử lại !
                </p>
                <Link to="/">Trở về trang chủ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failure;
