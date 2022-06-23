import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import ModalInfo from "../PersonalInfo/ModalInfo/personalInfo";
import useAuth from "../../../store/auth";
import "./style.scss";
import { ContainerModal } from "../ContainerModal";
type Props = {};

const Chat = (props: Props) => {
  const [stateAuth, actionAuth] = useAuth();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  return (
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
          <Link to="/admin" className="text-decoration-none">
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
              <a onClick={openInfoModal} className="menuProfile menuLinkHover">
                Thông tin cá nhân
              </a>
              <a className="menuProfile menuLinkHover">Tin nhắn</a>
              <div className="lineMenu"></div>
              <a
                href="/"
                className="menuProfile menuLinkHover text-red-500 font-bold"
                onClick={handleLogout}
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="Chat">
          <div className="row no-gutters h-100">
            <div className="col-md-4 border-right">
              <div className="settings-tray">
                <span className="settings-tray--right"></span>
              </div>
              <div className="search-box">
                <div className="input-wrapper">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input placeholder="Search here" type="text" />
                </div>
              </div>

              <div className="friend-drawer friend-drawer--onhover">
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "45px" }}
                ></i>
                <div className="text">
                  <h6>hello</h6>
                  <p className="text-muted">123</p>
                </div>
                <span className="time text-muted small">13:21</span>
              </div>
            </div>
            <div className="col-md-8 flex flex-column">
              <div className="settings-tray">
                <div className="friend-drawer no-gutters friend-drawer--grey">
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "45px" }}
                  ></i>

                  <div className="text">
                    <h6>hii</h6>
                    {/* <p className="text-muted">
                      Layin' down the law since like before Christ...
                    </p> */}
                  </div>
                  {stateAuth.data.role === "Customer" ? (
                    <button
                      type="submit"
                      style={{
                        marginLeft: "auto",
                        borderRadius: "12%",
                      }}
                    >
                      {/* Send */}
                      Tạo mới
                    </button>
                  ) : (
                    <></>
                  )}
                  <span className="settings-tray--right"></span>
                </div>
              </div>
              <div
                className="chat-panel"
                style={{
                  flex: "1",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 240px)",
                }}
              >
                <div className="row no-gutters">
                  <div className="col-md-3 offset-md-9">
                    <div className="chat-bubble chat-bubble--right">33333</div>
                  </div>
                </div>
                <div className="row no-gutters">
                  <div className="col-md-3">
                    <div className="chat-bubble chat-bubble--left">22222</div>
                  </div>
                </div>

                <div className="row no-gutters">
                  <div className="col-md-3 offset-md-9">
                    <div className="chat-bubble chat-bubble--right">33333</div>
                  </div>
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="chat-box-tray">
                      <input
                        type="text"
                        placeholder="Type your message here..."
                        className="px-3"
                        style={{ width: "100%" }}
                      />
                      <button type="submit" style={{ border: "none" }}>
                        {/* Send */}
                        <i
                          className="fa-solid fa-circle-arrow-up"
                          style={{ fontSize: "30px", margin: 0 }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
    </div>
  );
};

export default Chat;
