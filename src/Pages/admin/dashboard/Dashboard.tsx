import React from "react";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalInfo from "../../../Components/common/PersonalInfo/ModalInfo/personalInfo";
import Chart from "../../../Components/pages/admin/chart/Chart";
import Sidebar from "../../../Components/pages/admin/sidabar/Sidebar";
import Widget from "../../../Components/pages/admin/widget/Widget";
import useAuth from "../../../store/auth";

import "./home.scss";

const Dashboard = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",

      amount: 785,
      stock: "10",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",

      amount: 900,
      stock: "0",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",

      amount: 35,
      stock: "10",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",

      amount: 920,
      stock: "10",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",

      amount: 2000,
      stock: "10",
      status: "Pending",
    },
  ];
  return (
    <div className="home">
      <div className="sidebar">
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
          <div className="row align-items-center px-xl-5">
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
              <div>
                <a href="" className="btn border">
                  <i className="fas fa-heart text-primary"></i>
                  <span className="badge">0</span>
                </a>
                <a href="" className="btn border">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span className="badge">0</span>
                </a>
              </div>
            </div>
            <div
              className="wrap_menuAvatar"
              style={{ marginTop: "10px", marginLeft: "auto" }}
            >
              <i className="fa-solid fa-user " />
              &emsp;
              <span>
                {stateAuth.data.data?.name
                  ? stateAuth.data.data.name
                  : stateAuth.data.data?.email
                  ? stateAuth.data.data.email.substring(
                      0,
                      stateAuth.data.data.email.lastIndexOf("@")
                    )
                  : stateAuth.data.data?.phone}
              </span>
              <div className="wrap_contentHover">
                <div className="contentHover py-[16px]">
                  <a
                    onClick={openInfoModal}
                    className="menuProfile menuLinkHover"
                  >
                    Thông tin cá nhân
                  </a>
                  <a className="menuProfile menuLinkHover">Tin nhắn</a>
                  <div className="lineMenu"></div>
                  <a
                    className="menuProfile menuLinkHover text-red-500 font-bold"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="center flex">
          <div className="mb-5">
            <div className="row border-top pr">
              <div className="d-none d-lg-block" style={{ width: "175px" }}>
                <Link
                  to="/listuser"
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-user i"></i>
                  <h6 className="m-0">Người dùng</h6>
                </Link>
                <a
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  href="#navbar-vertical2"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-box i"></i>
                  <h6 className="m-0">Hàng hóa</h6>
                  <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav
                  className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                  id="navbar-vertical2"
                >
                  <div className="navbar-nav w-100 overflow-hidden">
                    <Link to="/categoryManage" className="nav-item nav-link">
                      Loại hàng
                    </Link>
                    <Link to="/productManage" className="nav-item nav-link">
                      Sản phẩm
                    </Link>
                    <Link to="/discountManage" className="nav-item nav-link">
                      Khuyến mãi
                    </Link>
                  </div>
                </nav>
                <a
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  href="#navbar-vertical3"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-chart-line i"></i>
                  <h6 className="m-0">Thống kê</h6>
                  <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav
                  className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                  id="navbar-vertical3"
                >
                  <div
                    className="navbar-nav w-100 overflow-hidden"
                    // style={{ height: "410px" }}
                  >
                    <Link to="/revenue" className="nav-item nav-link">
                      Doanh thu
                    </Link>
                    <Link to="/billManage" className="nav-item nav-link">
                      Đơn hàng
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="homeContainer">
              <div className="widgets">
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
              </div>
            </div>
            <Chart title="Doanh thu 6 tháng qua" aspect={2 / 1} />
            <div className="chart">
              {" "}
              <div className="title">Sản phẩm bán chạy</div>
              <table className="content-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng đã bán</th>
                    <th>Số lượng trong kho</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td className="cellWrapper">
                        <img className="image" src={item.img}></img>
                        {item.product}
                      </td>
                      <td>{item.amount}</td>
                      <td>{item.stock}</td>
                      <td className={`status ${item.status}`}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bottom"></div>
      </div>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
    </div>
  );
};

export default Dashboard;
