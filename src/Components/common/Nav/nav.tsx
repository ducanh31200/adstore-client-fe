import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import categoryApi from "../../../api/category/category";
import { getFromLocalStorage } from "../../../helper/base.helpers";
import ModalSignIn from "../../../Pages/client/SignIn/ModalSignIn";
import ModalSignUp from "../../../Pages/client/SignUp/ModalSignUp/SignUp";
import useAuth from "../../../store/auth";
import { ContainerModal } from "../ContainerModal";
import ModalInfo from "../PersonalInfo/ModalInfo/personalInfo";

const Nav = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [showSignInModal, setSignInModal] = React.useState(false);
  const openSignInModal = () => setSignInModal(true);
  const closeSignInModal = () => setSignInModal(false);
  const [showSignUpModal, setSignUpModal] = React.useState(false);
  const openSignUpModal = () => setSignUpModal(true);
  const closeSignUpModal = () => setSignUpModal(false);
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const [listCategory, setListCategory] = useState<Array<any>>([]);
  const token = getFromLocalStorage("accessToken");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      (async () => {
        await actionAuth.getUserAsync();
      })();
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const list = await categoryApi.list();
      // console.log(list);
      setListCategory(list.data.data);
    })();
  }, []);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  const handleShowInfo = () => {
    openInfoModal();
    const info = actionAuth.getUserAsync();
  };

  const location = useLocation();
  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
          >
            <h6 className="m-0">Loại hàng</h6>
            <i className="fa fa-angle-down text-dark"></i>
          </a>
          <nav
            className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
            id="navbar-vertical"
            style={{ width: "calc(100% - 30px)", zIndex: "10" }}
          >
            <div className="navbar-nav w-100 overflow-hidden">
              {listCategory.map((item, index) => (
                <a
                  href={`/products/${item.name}`}
                  key={index}
                  className="nav-item nav-link"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href="" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  AD
                </span>
                Store
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <Link
                  to="/"
                  className={`nav-item nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Trang chủ
                </Link>
                <Link
                  to="/products"
                  className={`nav-item nav-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                >
                  Sản phẩm
                </Link>

                <Link
                  to="/contact"
                  className={`nav-item nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  Hỗ trợ
                </Link>
              </div>
              <div className="navbar-nav ml-auto py-0">
                {stateAuth.isLoggedIn === true ? (
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
                          to={location.pathname}
                          onClick={handleShowInfo}
                          className="menuProfile menuLinkHover"
                        >
                          Thông tin cá nhân
                        </Link>
                        <Link to="/bill" className="menuProfile menuLinkHover">
                          Đơn hàng
                        </Link>
                        <Link to="/chat" className="menuProfile menuLinkHover">
                          Tin nhắn
                        </Link>
                        <div className="lineMenu"></div>
                        <Link
                          to={location.pathname}
                          className="menuProfile menuLinkHover !text-red-500 font-bold"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <a className="nav-item nav-link" onClick={openSignInModal}>
                      Sign In
                    </a>
                    <a className="nav-item nav-link" onClick={openSignUpModal}>
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <ContainerModal isVisible={showSignInModal} closeModal={closeSignInModal}>
        <ModalSignIn
          closeModal={closeSignInModal}
          openSignUpModal={openSignUpModal}
        />
      </ContainerModal>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
      <ContainerModal isVisible={showSignUpModal} closeModal={closeSignUpModal}>
        <ModalSignUp
          closeModal={closeSignUpModal}
          openSignInModal={openSignInModal}
        />
      </ContainerModal>
    </div>
  );
};

export default Nav;
