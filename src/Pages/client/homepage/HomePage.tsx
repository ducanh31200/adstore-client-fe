import React, { useEffect, useState } from "react";

import "./style.css";
import offer1 from "../../../img/iphone13.jpg";
import offer2 from "../../../img/samsungs22.jpg";

import payment from "../../../img/payments.png";
import { Link } from "react-router-dom";
import CategoryCard from "../../../Components/pages/client/homepage/CategoryCard";
import {
  FAKE_PRODUCT_DATA,
  CAROUSEL_ITEMS,
} from "../../../constants/base.constants";

import useAuth from "../../../store/auth";
import Nav from "../../../Components/common/Nav/nav";
import { Carousel } from "../../../Components/common/Carousel/Carousel";
import categoryApi from "../../../api/category/category";
import { ProductCard } from "../../../Components/common/Product/ProductCard";

import productApi from "../../../api/product/productApi";
import { useForm } from "react-hook-form";
import socialApi from "../../../api/social/socialApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

const HomePage = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [click, setClick] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [listCategory, setListCategory] = useState<Array<any>>([]);
  const [listTopProduct, setListTopProduct] = useState<Array<any>>([]);
  const [listComingSoon, setListComingSoon] = useState<Array<any>>([]);

  React.useEffect(() => {
    (async () => {
      const list = await categoryApi.list();
      setListCategory(list.data.data);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const listTop = await productApi.top({ quantity: 5 });

      setListTopProduct(listTop.data.data);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const listComing = await productApi.comingSoon({ quantity: 5 });
      setListComingSoon(listComing.data.data);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      await actionAuth.getUserAsync();
    })();
  }, [click]);
  const subcribe = async (data: any, e: any) => {
    e.preventDefault();
    const res = await socialApi.add(data.email);
    if (res) {
      notifySuccess("Đăng ký thành công !");
      reset();
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
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
                  : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Nav */}
      <Nav />

      {/* carousel */}
      <div>
        <Carousel carousel_items={CAROUSEL_ITEMS} />
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Category list */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {listCategory.map((item: any, index: number) => (
            <CategoryCard
              key={index}
              _id={item._id}
              image_url={item.image_url}
              products_length={item.products_length}
              name={item.name}
            />
          ))}
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Sản phẩm bán chạy</span>
          </h2>
        </div>
        {/* aaaaaaaaaaaaaaaaaaaaaaaa */}
        <div className="row px-xl-5 pb-3">
          {listTopProduct.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setClick={setClick}
              click={click}
            />
          ))}
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Hàng sắp về</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {listComingSoon.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setClick={setClick}
              click={click}
            />
          ))}
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col">
            <div className="owl-carousel vendor-carousel"></div>
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
              adstore@gmail.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
              67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">
                  Đăng ký để nhận thông báo
                </h5>
                <form onSubmit={handleSubmit(subcribe)}>
                  <div className="form-group">
                    <input
                      type="email"
                      {...register("email")}
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
        <div className="row border-top border-light mx-xl-5 py-4"></div>
      </div>

      <Link to="/" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </Link>
    </div>
  );
};

export default HomePage;
