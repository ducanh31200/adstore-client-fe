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
import useAuth from "../../../store/auth";
import { ProductCard } from "../../../Components/common/Product/ProductCard";
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
  const [product, setProduct] = useState(initProduct);
  const [comment, setComment] = useState(initProduct);
  const [colorState, setColorState] = useState(product.colors[0].color);
  const [colorIndexState, setColorIndexState] = useState(0);

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
    }, [id]);
  }
  const [click, setClick] = useState(0);
  React.useEffect(() => {
    (async () => {
      await actionAuth.getUserAsync();
    })();
  }, [click]);
  const [listHint, setListHint] = useState<Array<any>>([]);
  React.useEffect(() => {
    (async () => {
      const list = stateAuth.data.data.bag_products;
      list.push(id);
      console.log("list", list);
      const listHint = await productApi.hint({
        products: list,
        quantity: 5,
      });

      setListHint(listHint.data?.data);
    })();
  }, [click, id]);
  // console.log("listHint", listHint);
  const handleAddtoCart = async () => {
    let added: number = 0;
    let item_quantity = stateCart.data.filter((item, index) => {
      if (item.product._id === id) added = item.quantity;
    });
    if (item_quantity) {
      added = 0;
    }
    const value = (document.getElementById("quantity") as HTMLInputElement)
      .value;
    console.log("item_quantity", item_quantity[0]?.quantity);
    if (product.colors[colorIndexState].quantity >= Number(value) + added) {
      const res = await actionCart.PushCart({
        _id: id,
        quantity: Number(value),
        color: colorState,
      });
      if (res) {
        setClick(click + 1);
        notifySuccess("Thêm vào giỏ hàng thành công !");
      } else notifyError("Thêm vào giỏ hàng thất bại, vui lòng thử lại !");
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

  // console.log(colorState);
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
                  : 0}
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

            <div className="d-flex mb-4">
              <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
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
                    <p>{product.colors[index].quantity} Products</p>
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
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
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

        <Link to="/" className="btn btn-primary back-to-top">
          <i className="fa fa-angle-double-up"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
