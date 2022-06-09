import "./sidebar.scss";

import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Widget from "../widget/Widget";

const Sidebar = () => {
  //   const { dispatch } = useContext(DarkModeContext);
  return (
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

            <a className="nav-item nav-link">Sign In</a>
            <a className="nav-item nav-link">Sign Up</a>
          </div>
        </div>
      </div>
      <hr />
      <div className="center flex">
        {/* <p className="title">MAIN</p> */}
        {/* <li>
            <i className="fa-solid fa-house-blank"></i>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <i className="fa-solid fa-user"></i>
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <i className="fa-solid fa-cubes"></i>
              <span>Products</span>
            </li>
            <li>
              <i className="fa-solid fa-grid"></i>
              <span>Category</span>
            </li>
          </Link>
          <li>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Orders</span>
          </li>
          <li>
            <i className="fa-solid fa-truck-clock"></i>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <i className="fa-solid fa-chart-line"></i>
            <span>Stats</span>
          </li>
          <li>
            <i className="fa-solid fa-bell"></i>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <i className="fa-solid fa-badge-percent"></i>
            <span>Discount</span>
          </li> */}
        <div className="mb-5">
          <div className="row border-top px-xl-5">
            <div className="d-none d-lg-block">
              <a
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse"
                href="#navbar-vertical"
                style={{
                  height: "65px",
                  marginTop: "-1px",
                  padding: "0 30px",
                }}
              >
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
              </a>
              <nav
                className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                id="navbar-vertical"
              >
                <div
                  className="navbar-nav w-100 overflow-hidden"
                  // style={{ height: "410px" }}
                >
                  <a href="" className="nav-item nav-link">
                    Shoes
                  </a>
                </div>
              </nav>
              <a
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse"
                href="#navbar-vertical2"
                style={{
                  height: "65px",
                  marginTop: "-1px",
                  padding: "0 30px",
                }}
              >
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
              </a>
              <nav
                className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                id="navbar-vertical2"
              >
                <div
                  className="navbar-nav w-100 overflow-hidden"
                  // style={{ height: "410px" }}
                >
                  <a href="" className="nav-item nav-link">
                    Shoes
                  </a>
                </div>
              </nav>
              <a
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse"
                href="#navbar-vertical3"
                style={{
                  height: "65px",
                  marginTop: "-1px",
                  padding: "0 30px",
                }}
              >
                <h6 className="m-0">Categories</h6>
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
                  <a href="" className="nav-item nav-link">
                    Shoes
                  </a>
                </div>
              </nav>
            </div>

            {/* {stateAuth.isLoggedIn === true ? (
                        <div className="wrap_menuAvatar">
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
                              <Link
                                to="/"
                                onClick={openInfoModal}
                                className="menuProfile menuLinkHover"
                              >
                                Thông tin cá nhân
                              </Link>
                              <Link
                                to="/"
                                className="menuProfile menuLinkHover"
                              >
                                Tin nhắn
                              </Link>
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
                      ) : ( */}

            {/* )} */}
          </div>
        </div>
        <div className="flex-1">
          Dau khac
          <div>Dau khac</div>
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
};

export default Sidebar;
