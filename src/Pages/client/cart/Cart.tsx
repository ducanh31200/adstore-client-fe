import React, { useState } from "react";
import product1 from "../../../img/iphone13.jpg";
import emptyCart from "../../../img/emptyCart.png";

import payment from "../../../img/payments.png";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../../Components/common/Nav/nav";
import useCart from "../../../store/cart";
import { moneyFormater } from "../../../utils/moneyFormater";
import useAuth from "../../../store/auth";
import BillApi from "../../../api/cart/BillApi";
import useBill from "../../../store/bill";
import { changePhoneAsync } from "../../../store/auth/auth.action";
import { notifyError, notifySuccess } from "../../../utils/notify";
import useLocalCart from "../../../store/localCart";

type Props = {};

const Cart = (props: Props) => {
  const navigate = useNavigate();
  const [stateAuth, actionAuth] = useAuth();
  const [localCart, actionLocalCart] = useLocalCart();
  const [stateBill, actionBill] = useBill();
  const [stateChange, setStateChange] = useState(0);
  const [statePayment, setStatePayment] = useState(true);
  let formatPhone = "0";
  React.useEffect(() => {
    !stateAuth.isLoggedIn && actionLocalCart.GetLocalCart();
  }, []);
  React.useEffect(() => {
    if (stateAuth.isLoggedIn) {
      const province = (document.getElementById("province") as HTMLInputElement)
        .value;
      const district = (document.getElementById("district") as HTMLInputElement)
        .value;
      const address = (document.getElementById("address") as HTMLInputElement)
        .value;
      const address_ship: any = {};
      address_ship.province = province;
      address_ship.district = district;
      address_ship.address = address;

      (async () => {
        await actionBill.Calc({
          address: address_ship.province === "" ? undefined : address_ship,
        });
      })();
    }
  }, []);
  React.useEffect(() => {
    if (!stateAuth.isLoggedIn && localCart.data) {
      const discountCode = (
        document.getElementById("couponcode") as HTMLInputElement
      ).value;
      const province = (document.getElementById("province") as HTMLInputElement)
        .value;
      const district = (document.getElementById("district") as HTMLInputElement)
        .value;
      const address = (document.getElementById("address") as HTMLInputElement)
        .value;
      const address_ship: any = {};
      address_ship.province = province;
      address_ship.district = district;
      address_ship.address = address;

      (async () => {
        const res = await actionBill.Calc({
          bag: localCart.data,
          address: address_ship,
          discountCode: discountCode,
        });
      })();
    }
  }, [localCart, stateChange]);

  React.useEffect(() => {
    (async () => {
      stateAuth.isLoggedIn && (await actionAuth.getUserAsync());
    })();
  }, [stateChange]);

  React.useEffect(() => {
    if (stateAuth.isLoggedIn) {
      const cart: any = [];
      const discountCode = (
        document.getElementById("couponcode") as HTMLInputElement
      ).value;
      const province = (document.getElementById("province") as HTMLInputElement)
        .value;
      const district = (document.getElementById("district") as HTMLInputElement)
        .value;
      const address = (document.getElementById("address") as HTMLInputElement)
        .value;
      const address_ship: any = {};
      address_ship.province = province;
      address_ship.district = district;
      address_ship.address = address;
      stateBill.data?.bag_details.map((item: any) => {
        cart.push({
          product: item.product,
          quantity: item.quantity,
          color: item.color,
        });
      });
      (async () => {
        await actionBill.Calc({
          bag: cart[0].product === "" || cart.length == 0 ? undefined : cart,
          discountCode: discountCode,
          address: address_ship.province === "" ? undefined : address_ship,
        });
      })();
    }
  }, [stateChange]);
  const handleOrder = async () => {
    console.log("first");
    const cart: any = [];
    const discountCode = (
      document.getElementById("couponcode") as HTMLInputElement
    ).value;
    const province = (document.getElementById("province") as HTMLInputElement)
      .value;
    const district = (document.getElementById("district") as HTMLInputElement)
      .value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    const name = (document.getElementById("nameUser") as HTMLInputElement)
      .value;

    let phone = (document.getElementById("phoneUser") as HTMLInputElement)
      .value;
    const address_ship: any = {};
    address_ship.province = province;
    address_ship.district = district;
    address_ship.address = address;
    stateBill.data?.bag_details.map((item: any) => {
      cart.push({
        product: item.product,
        quantity: item.quantity,
        color: item.color,
      });
    });

    // const payload = {
    //   bag: cart,
    //   phone: phone,
    //   name: name,
    //   discountCode: discountCode,
    //   address: address_ship,
    //   cod: statePayment,
    // };
    if (phone === "") notifyError("Vui l??ng nh???p s??? ??i???n tho???i !");
    else if (
      address_ship.address === "" ||
      address_ship.district === "" ||
      address_ship.province === ""
    )
      notifyError("Vui l??ng nh???p ?????a ch??? giao h??ng !");
    else {
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      const res = phoneRegex.test(phone);
      if (res) {
        if (phone[0] === "0") {
          const head = "+84";
          const number = phone.slice(1);
          phone = head.concat(number);
        }
      } else {
        notifyError("S??? ??i???n tho???i ch??a ????ng, vui l??ng nh???p l???i !");
      }
      const url: any = await actionBill.Create({
        bag: cart,
        phone: phone,
        name: name,
        discountCode: discountCode,
        address: address_ship,
        cod: statePayment,
      });
      if (url) {
        if (!stateAuth.isLoggedIn) localStorage.removeItem("cart");
        if (!statePayment) window.location.href = url.data;
        else navigate("/success");
        notifySuccess("T???o ????n h??ng th??nh c??ng !");
        setStateChange(stateChange + 1);
      } else {
        notifyError("C?? l???i x???y ra, vui l??ng th??? l???i !");
      }
    }
  };
  const handleQuantity = (_id: string, color: any, change: number) => {
    stateBill.data?.bag_details.map((item: any) => {
      if (item.product === _id && item.color === color) {
        item.quantity = item.quantity + change;
      }
    });
    if (!stateAuth.isLoggedIn) {
      const newlist = localCart.data?.map((item: any) => {
        if (item.product === _id && item.color === color) {
          item.quantity = item.quantity + change;
        }
        return item;
      });
      const cart = newlist?.filter((item: any) => item.quantity !== 0);
      actionLocalCart.PushLocalCart({
        data: cart?.length === 0 ? undefined : cart,
        count: localCart.count + change,
      });
    }
    setStateChange(stateChange + 1);
  };
  const handleRemove = (_id: any, color: any) => {
    stateBill.data?.bag_details.map((item: any) => {
      if (item.product === _id && item.color === color) {
        item.quantity = 0;
      }
    });
    if (!stateAuth.isLoggedIn) {
      const newlist = localCart.data?.map((item: any) => {
        if (item.product === _id && item.color === color) {
          localCart.count = localCart.count - item.quantity;
          item.quantity = 0;
        }
        return item;
      });
      const cart = newlist?.filter((item: any) => item.quantity !== 0);
      actionLocalCart.PushLocalCart({
        data: cart?.length === 0 ? undefined : cart,
        count: localCart.count,
      });
    }
    setStateChange(stateChange + 1);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block"></div>
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
                  ? stateAuth.data.data.bag_items_length
                  : localCart.count}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Nav />

      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Gi??? h??ng
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/">Trang ch???</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Gi??? h??ng</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            {(stateBill.data.bag_details.length === 1 &&
              stateBill.data.bag_details[0].quantity === 0) ||
            stateBill.data.bag_details.length === 0 ? (
              <img src={emptyCart} style={{ marginLeft: "300px" }}></img>
            ) : (
              <table className="table table-bordered text-center mb-0">
                <thead className="bg-secondary text-dark">
                  <tr>
                    <th>STT</th>
                    <th>S???n ph???m</th>
                    <th>M??u</th>
                    <th>Gi??</th>
                    <th>Gi???m gi??</th>
                    <th>S??? l?????ng</th>
                    <th>T???ng c???ng</th>
                    <th>X??a</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {stateBill.data.bag_details.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">
                        <img
                          src={item.image_url}
                          alt=""
                          style={{ width: "100px" }}
                        />{" "}
                        {item.name}
                      </td>
                      <td className="align-middle">{item.color}</td>
                      <td className="align-middle">
                        {moneyFormater(item.price)}
                      </td>
                      <td className="align-middle">{`${item.sale}%`}</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() =>
                                handleQuantity(item.product, item.color, -1)
                              }
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            value={item.quantity}
                            readOnly
                            type="text"
                            // disabled
                            className="form-control form-control-sm bg-secondary text-center"
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() =>
                                handleQuantity(item.product, item.color, 1)
                              }
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {moneyFormater(
                          item.quantity * item.price * (1 - item.sale / 100)
                        )}
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleRemove(item.product, item.color)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">?????a ch??? giao h??ng</h4>
              <form
                onSubmit={handleSubmit}
                onBlur={() => setStateChange(stateChange + 1)}
              >
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>H??? v?? t??n</label>
                    <input
                      id="nameUser"
                      required
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        stateAuth.isLoggedIn ? stateAuth.data?.data?.name : ""
                      }
                    />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>E-mail</label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        stateAuth.isLoggedIn ? stateAuth.data?.data?.email : ""
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>S??? ??i???n tho???i</label>
                    <input
                      id="phoneUser"
                      required
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        !stateAuth.isLoggedIn
                          ? ""
                          : stateAuth.data?.data?.phone === "" ||
                            stateAuth.data?.data?.phone === undefined
                          ? "Ch??a c??"
                          : formatPhone.concat(
                              stateAuth.data?.data?.phone?.slice(3)
                            )
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>T???nh/Th??nh ph???</label>
                    <input
                      required
                      id="province"
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        stateAuth.isLoggedIn
                          ? stateAuth.data?.data?.address?.province
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Huy???n/Qu???n</label>
                    <input
                      required
                      id="district"
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        stateAuth.isLoggedIn
                          ? stateAuth.data?.data?.address?.district
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>?????a ch???</label>
                    <input
                      required
                      id="address"
                      className="form-control"
                      type="text"
                      placeholder=""
                      defaultValue={
                        stateAuth.isLoggedIn
                          ? stateAuth.data?.data?.address?.address
                          : ""
                      }
                    />
                  </div>
                  {/* <button
                    className="btn btn-primary"
                    style={{ marginLeft: "auto" }}
                    onClick={() => setStateChange(stateChange + 1)}
                  >
                    C???p nh???t th??ng tin
                  </button> */}
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4">
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="input-group">
                <input
                  id="couponcode"
                  type="text"
                  className="form-control p-4"
                  placeholder="Coupon Code"
                  required
                />
                <div className="input-group-append">
                  <button
                    onClick={() => setStateChange(stateChange + 1)}
                    className="btn btn-primary"
                  >
                    ??p d???ng m?? khuy???n m??i
                  </button>
                </div>
              </div>
            </form>

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                id="radioCod"
                type="radio"
                name="checkedPayment"
                defaultChecked
                onChange={() => setStatePayment(true)}
              />
              <label htmlFor="radioCod">
                <img
                  style={{ height: "60px", width: "212px" }}
                  src="https://pic.onlinewebfonts.com/svg/img_462168.png"
                />
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                id="radioVnpay"
                type="radio"
                name="checkedPayment"
                onChange={() => setStatePayment(false)}
              />
              <label htmlFor="radioVnpay">
                <img
                  className="w-50 h-50"
                  src="https://www.dso.vn/uploads/55/cong-ty/vnpay/logo-vnpay.png"
                />
              </label>
            </div>

            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">H??a ????n</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">T???m t??nh</h6>
                  <h6 className="font-weight-medium">
                    {moneyFormater(stateBill.data.total)}
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Ph?? giao h??ng</h6>
                  <h6 className="font-weight-medium">
                    {moneyFormater(stateBill.data.ship)}
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Khuy???n m??i</h6>
                  <h6 className="font-weight-medium">
                    {moneyFormater(stateBill.data.discount)}
                  </h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">T???ng c???ng</h5>
                  <h5 className="font-weight-bold">
                    {moneyFormater(
                      stateBill.data.total +
                        stateBill.data.ship -
                        stateBill.data.discount
                    )}
                  </h5>
                </div>
                <a
                  className="btn btn-block btn-primary my-3 py-3"
                  onClick={() => handleOrder()}
                >
                  Thanh to??n
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              adstore@gmail.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
              67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">????ng k??</h5>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control border-0 py-4"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-block border-0 py-3"
                      type="submit"
                    >
                      ????ng k??
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

export default Cart;
