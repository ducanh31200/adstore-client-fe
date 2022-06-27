import { Box, Slider } from "@mui/material";
import React, { useState } from "react";
import {
  createSearchParams,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import userApi from "../../../api/user/userApi";
import Nav from "../../../Components/common/Nav/nav";
import Pagination from "../../../Components/common/Pagination/Pagination";

import payment from "../../../img/payments.png";
import useAuth from "../../../store/auth";
import useCart from "../../../store/cart";

const Notifications = () => {
  const [list, setList] = useState<any>([{ data: [] }]);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [stateAuth, actionAuth] = useAuth();
  const limit = 10;
  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: any) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  React.useEffect(() => {
    (async () => {
      const result = await userApi.listNotification({
        skip: currentPage * limit,
        limit: limit,
      });
      setList(result.data);
    })();
  }, [currentPage]);
  //   list.data?.map((item: any) => {
  //     console.log(formatDate(new Date(item.createdAt)));
  //   });
  //   console.log(list.data);
  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
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
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-dark pl-2" href="">
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
            <a href="" className="btn border">
              <i className="fas fa-heart text-primary"></i>
              <span className="badge">
                {!stateAuth.isLoggedIn
                  ? 0
                  : stateAuth.data?.data?.notifications_length
                  ? stateAuth.data?.data?.notifications_length
                  : 0}
              </span>
            </a>
            <Link to="/cart" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">
                {stateAuth.isLoggedIn
                  ? stateAuth.data?.data?.bag_items_length
                  : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Nav */}

      <Nav />

      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Thông báo
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/ ">Home</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>
      {stateAuth.isLoggedIn ? (
        <div>
          <table
            className="content-table"
            style={{ width: "50%", margin: "0 auto" }}
          >
            <thead>
              <tr>
                <th key="1">STT</th>
                <th key="2">Thông báo</th>
                <th key="3">Thời gian</th>
              </tr>

              <div></div>
            </thead>
            <tbody>
              {list?.data?.reverse().map((item: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.message}</td>
                  <td>{formatDate(new Date(item.createdAt))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            limit={limit}
            total={
              stateAuth.data?.data?.notifications_length == 0 ||
              stateAuth.data?.data?.notifications_length == undefined
                ? 0
                : stateAuth.data?.data?.notifications_length
            }
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />{" "}
        </div>
      ) : (
        <div></div>
      )}

      <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <a href="" className="text-decoration-none">
              <h1 className="mb-4 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border border-white px-3 mr-1">
                  AD
                </span>
                Store
              </h1>
            </a>
            <p></p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>TP.HCM
              VN
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              info@example.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
              67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Đăng ký</h5>
                <form action="">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control border-0 py-4"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-block border-0 py-3"
                      type="submit"
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-top border-light mx-xl-5 py-4">
          <div className="col-md-6 px-xl-0"></div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src={payment} alt="" />
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </div>
  );
};

export default Notifications;
