import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import socialApi from "../../../api/social/socialApi";
import Nav from "../../../Components/common/Nav/nav";
import payment from "../../../img/payments.png";
import useAuth from "../../../store/auth";
import useLocalCart from "../../../store/localCart";
import { notifyError, notifySuccess } from "../../../utils/notify";
const Contact = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [localCart, actionLocalCart] = useLocalCart();
  const { register, reset, handleSubmit } = useForm();
  React.useEffect(() => {
    (() => {
      if (!stateAuth.isLoggedIn) actionLocalCart.GetLocalCart();
    })();
  }, []);
  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const result = await socialApi.support({
      email: data.email,
      name: data.name,
      subject: data.subject,
      message: data.message,
    });

    if (result) {
      notifySuccess("Gửi phản hồi thành công !");
      reset();
    } else notifyError("Gửi phản hồi thất bại !");
  };
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

      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Contact Us
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/">Home</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Contact</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Hỗ trợ</span>
          </h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-9 mb-5">
            <div className="contact-form">
              <div id="success"></div>
              <form
                onSubmit={handleSubmit(submit)}
                name="sentMessage"
                id="contactForm"
              >
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                    {...register("name")}
                  />

                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    {...register("email")}
                    required
                  />

                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    required
                    {...register("subject")}
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea
                    className="form-control"
                    rows={6}
                    id="message"
                    placeholder="Message"
                    {...register("message")}
                    data-validation-required-message="Please enter your message"
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div>
                  <button
                    className="btn btn-primary py-2 px-4"
                    type="submit"
                    id="sendMessageButton"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <h5 className="font-weight-semi-bold mb-3">Liên hệ</h5>
            <p></p>
            <div className="d-flex flex-column mb-3">
              <h5 className="font-weight-semi-bold mb-3">AD Store</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary mr-3"></i>DVB
                Street,TD, HCMC, VN
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope text-primary mr-3"></i>
                adstore@example.com
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
                67890
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <Link to="/" className="text-decoration-none">
              <h1 className="mb-4 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border border-white px-3 mr-1">
                  AD
                </span>
                Store
              </h1>
            </Link>
            <p></p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>TP.HCM
              VN
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              adstore@example.com
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
      </div>

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </div>
  );
};

export default Contact;
