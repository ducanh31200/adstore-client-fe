import React, { useState } from "react";
import product1 from "../../../img/iphone13.jpg";
import product2 from "../../../img/samsungs22.jpg";
import product3 from "../../../img/laptopasus.jpg";
import product4 from "../../../img/macbook.jpg";
import payment from "../../../img/payments.png";
import user from "../../../img/user.jpg";
import StarRatingComponent from "react-star-rating-component";
import { Link, useParams } from "react-router-dom";
import Nav from "../../../Components/common/Nav/nav";
import productApi from "../../../api/product/productApi";
import { IProduct } from "../../../model/product.model";
import { moneyFormater } from "../../../utils/moneyFormater";
import useCart from "../../../store/cart";
import { notifyError, notifySuccess } from "../../../utils/notify";
type Props = {};
const ProductDetail = (props: Props) => {
  const params = useParams<any>();
  const [stateCart, actionCart] = useCart();
  const { name, id } = params;
  const initProduct: IProduct = {
    quantity: 0,
    colors: [],
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
  const [product, setProduct] = useState(initProduct);
  const [comment, setComment] = useState(initProduct);
  if (id) {
    React.useEffect(() => {
      (async () => {
        const result = await productApi.read({
          _id: id,
        });
        const comment = await productApi.comment({
          _id: id,
        });
        setComment(comment.data.data);
        setProduct(result.data.data);
      })();
    }, []);
  }
  const [click, setClick] = useState(0);
  React.useEffect(() => {
    (async () => {
      await actionCart.GetCart();
    })();
  }, [click]);
  const handleAddtoCart = async () => {
    const value = (document.getElementById("quantity") as HTMLInputElement)
      .value;
    if (product.quantity >= Number(value)) {
      const res = await actionCart.PushCart({ _id: id, quantity: value });
      if (res) {
        setClick(click + 1);
        notifySuccess("Thêm vào giỏ hàng thành công !");
      } else notifyError("Thêm vào giỏ hàng thất bại, vui lòng thử lại !");
    } else notifyError("Số lượng sản phẩm còn lại không đủ !");
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
            Shop Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Product Detail</p>
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
                <div
                  className="carousel-item active"
                  style={{ width: "550px", height: "400px" }}
                >
                  <img
                    className="w-100 h-100 object-cover"
                    src={product1}
                    alt="Image"
                  />
                </div>
                <div
                  className="carousel-item "
                  style={{ width: "550px", height: "400px" }}
                >
                  <img
                    className="w-100 h-100 object-cover"
                    src={product2}
                    alt="Image"
                  />
                </div>
                <div
                  className="carousel-item"
                  style={{ width: "550px", height: "400px" }}
                >
                  <img
                    className="w-100 h-100 object-cover"
                    src={product3}
                    alt="Image"
                  />
                </div>
                <div
                  className="carousel-item"
                  style={{ width: "550px", height: "400px" }}
                >
                  <img
                    className="w-100 h-100 object-cover"
                    src={product4}
                    alt="Image"
                  />
                </div>
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
              <small className="pt-1">(50 Reviews)</small>
            </div>
            <div className="justify-content-center">
              <h6>{moneyFormater(product.price - product.sale)}</h6>

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
            <div className="d-flex mb-3">
              <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
              <form>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-1"
                    name="size"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-1"
                  ></label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-2"
                    name="size"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-2"
                  ></label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-3"
                    name="size"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-3"
                  ></label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-4"
                    name="size"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-4"
                  ></label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-5"
                    name="size"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-5"
                  ></label>
                </div>
              </form>
            </div>
            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
              <form>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-1"
                    name="color"
                  />
                  <label className="custom-control-label" htmlFor="color-1">
                    Black
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-2"
                    name="color"
                  />
                  <label className="custom-control-label" htmlFor="color-2">
                    White
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-3"
                    name="color"
                  />
                  <label className="custom-control-label" htmlFor="color-3">
                    Red
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-4"
                    name="color"
                  />
                  <label className="custom-control-label" htmlFor="color-4">
                    Blue
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-5"
                    name="color"
                  />
                  <label className="custom-control-label" htmlFor="color-5">
                    Green
                  </label>
                </div>
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
                  max={product.quantity}
                  className="form-control bg-secondary text-center"
                  defaultValue="1"
                />
              </div>
              <button
                className="btn btn-primary px-3"
                onClick={() => handleAddtoCart()}
              >
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>
            <div className="d-flex pt-2">
              <p className="text-dark font-weight-medium mb-0 mr-2">
                Share on:
              </p>
              <div className="d-inline-flex">
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
                  <i className="fab fa-pinterest"></i>
                </a>
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
                Description
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                Information
              </a>
              <a
                className="nav-item nav-link"
                data-toggle="tab"
                href="#tab-pane-3"
              >
                Reviews (0)
              </a>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Product Description</h4>
                <p>{product.desc}</p>
                <p></p>
              </div>
              <div className="tab-pane fade" id="tab-pane-2">
                <h4 className="mb-3">Additional Information</h4>
                <p></p>

                <table
                  className="content-table"
                  style={{ width: "50%", margin: "0 auto" }}
                >
                  <thead>
                    <tr>
                      <th key="1"></th>
                      <th key="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((item, index) => (
                      <tr>
                        <td>{product.specs[index].name}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-4">1 review for "Iphone 13"</h4>
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-4">Leave a review</h4>
                    <small>
                      Your email address will not be published. Required fields
                      are marked *
                    </small>
                    <div className="d-flex my-3">
                      <p className="mb-0 mr-2">Your Rating * :</p>
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={5}
                        editing={true}
                      />
                    </div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="message">Your Review *</label>
                        <textarea
                          id="message"
                          cols={30}
                          rows={5}
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <input
                          type="submit"
                          value="Leave Your Review"
                          className="btn btn-primary px-3"
                        />
                      </div>
                    </form>
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
            <span className="px-2">You May Also Like</span>
          </h2>
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
                  <h5 className="font-weight-bold text-dark mb-4">
                    Newsletter
                  </h5>
                  <form action="">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 py-4"
                        placeholder="Your Name"
                        required
                      />
                    </div>
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
    </div>
  );
};

export default ProductDetail;
