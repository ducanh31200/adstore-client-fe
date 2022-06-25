import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import ModalInfo from "../PersonalInfo/ModalInfo/personalInfo";
import useAuth from "../../../store/auth";
import "./style.scss";
import { ContainerModal } from "../ContainerModal";
import useChat from "../../../store/chat";
import chatApi from "../../../api/chat/chat";
import { notifyError, notifySuccess } from "../../../utils/notify";

type Props = {};

const Chat = (props: Props) => {
  const { handleSubmit, reset, register } = useForm();
  const [stateAuth, actionAuth] = useAuth();
  const [stateChat, actionChat] = useChat();
  const [_id, setID] = useState("");
  const [limit, setLimit] = useState(10);
  const [showInfoModal, setInfoModal] = React.useState(false);
  const [chat, setChat] = React.useState<any[]>([]);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  React.useEffect(() => {
    const list = document.getElementById("scrollableDiv");
    list && list.addEventListener("scroll", loadMore);
    return () => {
      list && list.removeEventListener("scroll", loadMore);
    };
  }, []);

  const loadMore = (e: any) => {
    const list = document.getElementById("scrollableDiv");
    if (list && list !== undefined && list.scrollTop === 0) {
      setLimit(limit + limit);
    }
  };
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

  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  React.useEffect(() => {
    const timeoutID = window.setInterval(() => {
      (async () => {
        const list = await actionChat.List();
        setChat(list);
      })();
    }, 1000);
    return () => window.clearTimeout(timeoutID);
  }, []);
  React.useEffect(() => {
    if (_id) {
      const timeoutID = window.setInterval(() => {
        (async () => {
          await actionChat.Get({ _id, limit });

          console.log("limit", limit);
        })();
      }, 1000);

      return () => window.clearTimeout(timeoutID);
    }
  }, [_id]);

  const handleGetMessage = (id: any) => {
    setID(id);
  };
  const submit = async (data: any, e: any) => {
    e.preventDefault();
    await actionChat.SendMessage({ _id, message: data.message });
    reset();
  };
  const handleNew = async (data: any) => {
    const res = await chatApi.new({
      _id,
      message: "Bắt đầu cuộc trò chuyện mới !",
    });
    if (res.status !== 200) notifyError("Tạo cuộc trò chuyện thất bại !");
    else {
      setID(res.data.data);
    }
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
          <Link
            to={stateAuth.data.data.role === "Customer" ? "/" : "/sale"}
            className="text-decoration-none"
          >
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
              <>
                {stateAuth.data.data.role === "Customer"
                  ? chat.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="friend-drawer friend-drawer--onhover"
                        onClick={() => handleGetMessage(item._id)}
                      >
                        <i
                          className="fa-solid fa-user"
                          style={{ fontSize: "45px" }}
                        ></i>
                        <div className="text" style={{ height: "45px" }}>
                          <h6>{item.saler.name}</h6>
                          <p
                            className="text-muted max_line-1"
                            style={{
                              fontWeight:
                                item.last_message.isCustomer || item.seen
                                  ? "normal"
                                  : "bold",
                            }}
                          >
                            {item.last_message.message}
                          </p>
                        </div>
                        <span className="time text-muted small">
                          {formatDate(new Date(item.last_message.createdAt))}
                        </span>
                      </div>
                    ))
                  : chat.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="friend-drawer friend-drawer--onhover"
                        onClick={() => handleGetMessage(item._id)}
                      >
                        <i
                          className="fa-solid fa-user"
                          style={{ fontSize: "45px" }}
                        ></i>
                        <div className="text">
                          <h6>{item.customer.name}</h6>
                          <p
                            className="text-muted max_line-1"
                            style={{
                              fontWeight:
                                !item.last_message.isCustomer || item.seen
                                  ? "normal"
                                  : "bold",
                            }}
                          >
                            {item.last_message.message}
                          </p>
                        </div>
                        <span className="time text-muted small">
                          {" "}
                          {formatDate(new Date(item.last_message.createdAt))}
                        </span>
                      </div>
                    ))}
              </>
            </div>
            <div className="col-md-8 flex flex-column">
              <div className="settings-tray">
                <div className="friend-drawer no-gutters friend-drawer--grey">
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "45px" }}
                  ></i>
                  {stateAuth.data.data.role === "Customer" ? (
                    <div className="text">
                      <h6>{stateChat?.data?.saler?.name}</h6>
                      <p className="text-muted">
                        {stateChat?.data?.saler?.email}
                      </p>
                    </div>
                  ) : (
                    <div className="text">
                      <h6>{stateChat?.data?.customer?.name}</h6>
                      <p className="text-muted">
                        {stateChat?.data?.customer?.email}
                      </p>
                    </div>
                  )}
                  {stateAuth.data.data.role === "Customer" ? (
                    <button
                      type="button"
                      style={{
                        marginLeft: "auto",
                        borderRadius: "12%",
                      }}
                      onClick={handleNew}
                    >
                      Tạo mới
                    </button>
                  ) : (
                    <></>
                  )}
                  <span className="settings-tray--right"></span>
                </div>
              </div>
              <div
                id="scrollableDiv"
                className="chat-panel"
                style={{
                  flex: "1",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  maxHeight: "calc(100vh - 240px)",
                }}
              >
                {stateChat?.data?.messages?.map((item: any, index: any) => (
                  <div key={index}>
                    <div className="row no-gutters">
                      {stateAuth.data.data.role === "Customer" ? (
                        !item.isCustomer ? (
                          <div className="col-md-6">
                            <div
                              style={{
                                backgroundColor: "#eee",
                                width: "fit-content",
                                marginRight: "auto",
                              }}
                              className="chat-bubble chat-bubble--left"
                            >
                              {item.message}
                            </div>
                          </div>
                        ) : (
                          <div className="col-md-6 offset-md-6">
                            <div
                              style={{
                                backgroundColor: "#1da1f2",
                                width: "fit-content",
                                marginLeft: "auto",
                                color: "white",
                              }}
                              className="chat-bubble chat-bubble--right"
                            >
                              {item.message}
                            </div>
                          </div>
                        )
                      ) : item.isCustomer ? (
                        <div className="col-md-6">
                          <div
                            style={{
                              backgroundColor: "#eee",
                              width: "fit-content",
                              marginRight: "auto",
                            }}
                            className="chat-bubble chat-bubble--left"
                          >
                            {item.message}
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-6 offset-md-6">
                          <div
                            style={{
                              backgroundColor: "#1da1f2",
                              width: "fit-content",
                              marginLeft: "auto",
                              color: "white",
                            }}
                            className="chat-bubble chat-bubble--right"
                          >
                            {item.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit(submit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="chat-box-tray">
                      <input
                        type="text"
                        placeholder="Type your message here..."
                        className="px-3"
                        style={{ width: "100%" }}
                        {...register("message")}
                      />
                      <button type="submit" style={{ border: "none" }}>
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
