import React, { useState } from "react";
import product1 from "../../../img/iphone13.jpg";
import emptyCart from "../../../img/emptyCart.png";

import payment from "../../../img/payments.png";
import { Link } from "react-router-dom";
import Nav from "../../../Components/common/Nav/nav";
import useCart from "../../../store/cart";
import { moneyFormater } from "../../../utils/moneyFormater";
import useAuth from "../../../store/auth";

type Props = {};

const Cart = (props: Props) => {
  const [stateAuth, actionAuth] = useAuth();
  const [stateCart, actionCart] = useCart();
  const [diffAddr, setDiffAddr] = useState(false);
  const [stateChange, setStateChange] = useState(0);
  React.useEffect(() => {
    (async () => {
      await actionCart.GetCart();
    })();
  }, [stateChange]);
  React.useEffect(() => {
    (async () => {
      await actionCart.GetCart();
    })();
  }, []);
  // console.log(diffAddr);
  const handleChange = (_id: any) => {
    const value = (document.getElementById("quantity") as HTMLInputElement)
      .value;
    setStateChange(stateChange + 1);
    console.log(value);
    console.log(_id);
  };

  stateCart.data.map((item) => {
    console.log("id", item.product._id);
  });
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
              <span className="badge">0</span>
            </a>
            <a href="" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">{stateCart.count}</span>
            </a>
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
            Shopping Cart
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shopping Cart</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            {stateCart.count === 0 ? (
              <img src={emptyCart} style={{ marginLeft: "300px" }}></img>
            ) : (
              <table className="table table-bordered text-center mb-0">
                <thead className="bg-secondary text-dark">
                  <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Giảm giá</th>
                    <th>Số lượng</th>
                    <th>Tổng cộng</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {stateCart.data.map((item, index) => (
                    <tr key={index}>
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">
                        <img
                          src={item.product.colors[0].image_url}
                          alt=""
                          style={{ width: "100px" }}
                        />{" "}
                        {item.product.name}
                      </td>
                      <td className="align-middle">
                        {moneyFormater(item.product.price)}
                      </td>
                      <td className="align-middle">
                        {moneyFormater(item.product.sale)}
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "70px" }}
                        >
                          <input
                            type="number"
                            onKeyDown={(e: any) => {
                              e.preventDefault();
                            }}
                            id={`quantity_${item.product._id}`}
                            min="1"
                            max={50}
                            className="form-control bg-secondary text-center"
                            defaultValue={item.quantity}
                            onChange={() => handleChange(item.product._id)}
                          />
                        </div>
                      </td>
                      <td className="align-middle">
                        {moneyFormater(item.quantity * item.product.price)}
                      </td>
                      <td className="align-middle">
                        <button className="btn btn-sm btn-primary">
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Địa chỉ giao hàng</h4>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Họ và tên</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    defaultValue={
                      stateAuth.isLoggedIn ? stateAuth.data?.data?.name : ""
                    }
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    defaultValue={
                      stateAuth.isLoggedIn ? stateAuth.data?.data?.email : ""
                    }
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Số điện thoại</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    defaultValue={
                      stateAuth.isLoggedIn ? stateAuth.data?.data?.phone : ""
                    }
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Tỉnh/Thành phố</label>
                  <input
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
                <div className="col-md-6 form-group">
                  <label>Huyện/Quận</label>
                  <input
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
                <div className="col-md-6 form-group">
                  <label>Địa chỉ</label>
                  <input
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

                {/*----ship-----*/}
                <div className="col-md-12 form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      onClick={() => setDiffAddr(!diffAddr)}
                      id="shipto"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shipto"
                      data-toggle="collapse"
                      data-target="#shipping-address"
                    >
                      Giao hàng ở địa chỉ khác
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse mb-4" id="shipping-address">
              <h4 className="font-weight-semi-bold mb-4">Địa chỉ giao hàng</h4>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Họ và tên</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Số điện thoại</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Tỉnh/Thành phố</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Huyện/Quận</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Địa chỉ</label>
                  <input className="form-control" type="text" placeholder="" />
                </div>

                {/*----ship-----*/}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <form className="mb-5" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">$160</h5>
                </div>
                <button className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </button>
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
                <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-dark mb-2" href="index.html">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </a>
                  <a className="text-dark mb-2" href="shop.html">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </a>
                  <a className="text-dark mb-2" href="detail.html">
                    <i className="fa fa-angle-right mr-2"></i>Shop Detail
                  </a>
                  <a className="text-dark mb-2" href="cart.html">
                    <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                  </a>
                  <a className="text-dark mb-2" href="checkout.html">
                    <i className="fa fa-angle-right mr-2"></i>Checkout
                  </a>
                  <a className="text-dark" href="contact.html">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-dark mb-2" href="index.html">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </a>
                  <a className="text-dark mb-2" href="shop.html">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </a>
                  <a className="text-dark mb-2" href="detail.html">
                    <i className="fa fa-angle-right mr-2"></i>Shop Detail
                  </a>
                  <a className="text-dark mb-2" href="cart.html">
                    <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                  </a>
                  <a className="text-dark mb-2" href="checkout.html">
                    <i className="fa fa-angle-right mr-2"></i>Checkout
                  </a>
                  <a className="text-dark" href="contact.html">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
                <form action="">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control border-0 py-4"
                      placeholder="Your Name"
                    />
                  </div>
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
                      Subscribe Now
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
