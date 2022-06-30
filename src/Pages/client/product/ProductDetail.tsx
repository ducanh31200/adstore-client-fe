import React, { useState } from "react";
import payment from "../../../img/payments.png";
import StarRatingComponent from "react-star-rating-component";
import { Link, useLocation, useParams } from "react-router-dom";
import Nav from "../../../Components/common/Nav/nav";
import productApi from "../../../api/product/productApi";
import { IProduct } from "../../../model/product.model";
import { moneyFormater } from "../../../utils/moneyFormater";
import useCart from "../../../store/cart";
import { notifyError, notifySuccess } from "../../../utils/notify";
import useAuth from "../../../store/auth";
import { ProductCard } from "../../../Components/common/Product/ProductCard";
import useLocalCart from "../../../store/localCart";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
} from "react-share";
type Props = {};
const ProductDetail = (props: Props) => {
  const params = useParams<any>();
  const [stateCart, actionCart] = useCart();
  const [stateAuth, actionAuth] = useAuth();
  const { name, id } = params;
  const initProduct: IProduct = {
    quantity: 0,
    colors: [
      {
        color: "",
        image_url: "",
        quantity: 0,
      },
    ],
    enable: true,
    _id: "",
    name: "",
    code: "",
    image_url: "",
    category: "",
    desc: "",
    specs: [],
    price: 0,
    sale: 0,
    total_rate: 0,
  };
  const location = useLocation();
  const [localCart, actionLocalCart] = useLocalCart();
  const [listHint, setListHint] = useState<Array<any>>([]);
  const [product, setProduct] = useState(initProduct);
  const [comment, setComment] = useState(initProduct);
  const [colorState, setColorState] = useState("");
  const [colorIndexState, setColorIndexState] = useState(0);
  const currentSlide = 0;
  if (id) {
    React.useEffect(() => {
      !stateAuth.isLoggedIn && actionLocalCart.GetLocalCart();
    }, []);
    React.useEffect(() => {
      (async () => {
        const result = await productApi.read({
          _id: id,
        });
        const comment = await productApi.comment({
          _id: id,
        });
        let list: any[] = [];
        stateAuth.isLoggedIn
          ? (list = stateAuth.data?.data?.bag_products)
          : (list = []);
        list.push(id);
        console.log(list);
        const listHint = await productApi.hint({
          products: list,
          quantity: 5,
        });
        if (colorState === "") setColorState(result.data.data.colors[0].color);
        setListHint(listHint.data?.data);
        setComment(comment.data.data);
        setProduct(result.data.data);
      })();
    }, [id]);
  }
  const [click, setClick] = useState(0);
  React.useEffect(() => {
    stateAuth.isLoggedIn &&
      (async () => {
        await actionAuth.getUserAsync();
      })();
  }, [click]);

  const handleAddtoCart = async () => {
    let added: number = 0;
    if (stateAuth.isLoggedIn) {
      stateCart.data.filter((item) => {
        if (item.product._id === id && item.color === colorState)
          added = item.quantity;
      });
    } else {
      localCart?.data?.map((item) => {
        if (item.product === id && item.color === colorState) {
          added = item.quantity;
        }
      });
    }
    const value = (document.getElementById("quantity") as HTMLInputElement)
      .value;
    if (product.colors[colorIndexState].quantity >= Number(value) + added) {
      if (stateAuth.isLoggedIn) {
        const res = await actionCart.PushCart({
          _id: id,
          quantity: Number(value),
          color: colorState,
        });
        if (res) {
          setClick(click + 1);
          notifySuccess("Thêm vào giỏ hàng thành công !");
        } else notifyError("Thêm vào giỏ hàng thất bại, vui lòng thử lại !");
      } else {
        {
          let cart: any = [];
          if (localCart.data) {
            let check = true;
            cart = localCart.data.map((item) => {
              if (item.product === id && item.color === colorState) {
                item.quantity = item.quantity + Number(value);
                check = false;
              }
              return item;
            });
            check &&
              cart.push({
                product: id,
                quantity: 1,
                color: colorState,
              });
          } else {
            cart = [
              {
                product: id,
                quantity: Number(value),
                color: colorState,
              },
            ];
          }
          actionLocalCart.PushLocalCart({
            data: cart,
            count: localCart.count + Number(value),
          });
          notifySuccess("Thêm vào giỏ hàng thành công !");
        }
      }
    } else notifyError("Số lượng sản phẩm còn lại không đủ !");
  };
  const list_specs: any = [];
  for (const [key, value] of Object.entries(product.specs)) {
    list_specs.push({ name: key, value: value });
  }

  const handleGetValue = (e: any) => {
    const value = e.target.value;
    const idcolor = e.target.id;
    setColorIndexState(Number(idcolor.split("color_")[1]));
    setColorState(value);
  };

  console.log("stateAuth.data.data", stateAuth.data.data);
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
            Chi tiết sản phẩm
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/">Trang chủ</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Chi tiết sản phẩm</p>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner border">
                {product.colors.map((item: any, index: number) => (
                  <div
                    style={{ width: "550px", height: "400px" }}
                    key={index}
                    className={`carousel-item ${
                      currentSlide === index ? "active" : ""
                    }`}
                  >
                    <img
                      className="w-100 h-100 object-cover"
                      src={item.image_url}
                      alt="Image"
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <i className="fa fa-2x fa-angle-left text-dark"></i>
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <i className="fa fa-2x fa-angle-right text-dark"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.name}</h3>
            <div className="d-flex mb-3">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={product.total_rate + 1}
                editing={false}
              />
              <small className="pt-1">()</small>
            </div>
            <div className="justify-content-center">
              <h6>
                {moneyFormater((product.price * (100 - product.sale)) / 100)}
              </h6>

              {product.sale !== 0 && (
                <h6
                  className="text-muted"
                  style={{ textDecoration: "line-through" }}
                >
                  {moneyFormater(product.price)}
                </h6>
              )}
            </div>
            <p className="mb-4"></p>

            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">Màu:</p>
              <form>
                {product.colors.map((item, index) => (
                  <div key={index}>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`color_${index}`}
                        value={item.color}
                        defaultChecked={index === 0}
                        name="color"
                        onClick={handleGetValue}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`color_${index}`}
                      >
                        {item.color.charAt(0).toUpperCase() +
                          item.color.slice(1).toLowerCase()}
                      </label>
                    </div>
                    <p>{product.colors[index].quantity} Sản phẩm</p>
                  </div>
                ))}
              </form>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div
                className="input-group quantity mr-3"
                style={{ width: "130px" }}
              >
                <input
                  type="number"
                  onKeyDown={(e: any) => {
                    e.preventDefault();
                  }}
                  id="quantity"
                  min="1"
                  max={product.colors[colorIndexState].quantity}
                  className="form-control bg-secondary text-center"
                  defaultValue="1"
                />
              </div>
              <button
                className="btn btn-primary px-3"
                onClick={() => handleAddtoCart()}
              >
                <i className="fa fa-shopping-cart mr-1"></i> Thêm vào giỏ
              </button>
            </div>
            <div className="d-flex pt-2" style={{ alignItems: "center" }}>
              <p className="text-dark font-weight-medium mb-0 mr-2">
                Share on:
              </p>
              <div className="d-inline-flex">
                <FacebookShareButton
                  url={`https://ad-store-10b73.web.app/${location.pathname}`}
                  quote={"Sản phẩm của AD Store"}
                  hashtag="#ADStore"
                >
                  <FacebookIcon round={true} size={35}></FacebookIcon>
                </FacebookShareButton>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
              <a
                className="nav-item nav-link active"
                data-toggle="tab"
                href="#tab-pane-1"
              >
                Mô tả
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                Thông số
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-3"
              >
                Đánh giá
              </a>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Mô tả</h4>
                <p>{product.desc}</p>
                <p></p>
              </div>
              <div className="tab-pane fade" id="tab-pane-2">
                <h4 className="mb-3">Thông số kĩ thuạt</h4>
                <p></p>

                <table
                  className="content-table"
                  style={{ width: "50%", margin: "0 auto" }}
                >
                  <thead>
                    <tr>
                      <th key="1">Thông số kỹ thuật</th>
                      <th key="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list_specs.map((item: any, index: any) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                  <div className="col-md-6">
                    {/* <h4 className="mb-4">1 review for "Iphone 13"</h4>
                    <div className="media mb-4">
                      <img
                        src={user}
                        alt="Image"
                        className="img-fluid mr-3 mt-1"
                        style={{ width: "45px" }}
                      />
                      <div className="media-body">
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={5}
                          editing={true}
                        />
                        <p></p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Có thể bạn sẽ thích</span>
          </h2>
        </div>

        <div className="row px-xl-5 pb-3">
          {listHint?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setClick={setClick}
              click={click}
            />
          ))}
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
        </div>

        <Link to="/" className="btn btn-primary back-to-top">
          <i className="fa fa-angle-double-up"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
