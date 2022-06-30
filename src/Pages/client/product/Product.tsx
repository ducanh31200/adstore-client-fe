import { Box, Slider } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import categoryApi from "../../../api/category/category";
import productApi from "../../../api/product/productApi";
import socialApi from "../../../api/social/socialApi";
import Nav from "../../../Components/common/Nav/nav";
import Pagination from "../../../Components/common/Pagination/Pagination";
import PriceFilter from "../../../Components/common/Product/PriceFilter";
import { ProductCard } from "../../../Components/common/Product/ProductCard";
import { SpecFilter } from "../../../Components/common/Product/SpecFilter";
import { FilterColor } from "../../../Components/pages/client/product/FilterColor";

import payment from "../../../img/payments.png";
import useAuth from "../../../store/auth";
import useLocalCart from "../../../store/localCart";
import { notifyError, notifySuccess } from "../../../utils/notify";

const Product = () => {
  const params = useParams<any>();

  const [localCart, actionLocalCart] = useLocalCart();
  const [listProduct, setListProduct] = useState<Array<any>>([]);
  const [listAllProduct, setListAllProduct] = useState<Array<any>>([]);
  const [cat, setCat] = useState<any>();
  const [totalProduct, setTotalProduct] = useState<any>(1);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const { reset, handleSubmit, register } = useForm();
  const limit = 7;
  const [stateAuth] = useAuth();
  const [click, setClick] = useState(0);
  const [sortName, setSortName] = useState("sold");
  const [sortType, setSortType] = useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    !stateAuth.isLoggedIn && actionLocalCart.GetLocalCart();
  }, []);
  React.useEffect(() => {
    (async () => {
      const result = await productApi.list({
        limit: 10000,
      });
      setListAllProduct(result.data.data);
    })();
  }, []);
  // console.log("stateCart", stateCart.count);
  if (Object.keys(params).length !== 0) {
    React.useEffect(() => {
      (async () => {
        const result = await productApi.list({
          category: params.name,
          skip: currentPage * limit,
          limit: limit,
        });
        if (currentPage === 0) {
          setTotalProduct(result.data.count);
        }
        const getCat = await categoryApi.read(params);
        setListProduct(result.data.data);
        setCat(getCat.data.data);
      })();
    }, []);
  } else {
    React.useEffect(() => {
      (async () => {
        const result = await productApi.list({
          sortName: sortName,
          sortType: sortType,
          skip: currentPage * limit,
          limit: limit,
        });
        if (currentPage === 0) {
          setTotalProduct(result.data.count);
        }
        setListProduct(result.data.data);
      })();
    }, [currentPage, click]);
    React.useEffect(() => {
      const filter: any = {};
      for (const entry of searchParams.entries()) {
        if (entry[0] === "colors") filter.colors = entry[1];
        else if (entry[0] === "price") {
          const p = entry[1].split(",");
          filter.max_price = Number(p[1]);
          filter.min_price = Number(p[0]);
        } else if (entry[0] === "search") {
          filter.search = entry[1];
        }
      }
      filter.skip = currentPage * limit;
      filter.limit = limit;
      filter.sortName = sortName;
      filter.sortType = sortType;
      (async () => {
        const result = await productApi.list(filter);
        if (currentPage === 0) {
          setTotalProduct(result.data.count);
        }
        setListProduct(result.data.data);
      })();
    }, [searchParams, currentPage, click]);
  }
  if (Object.keys(params).length !== 0) {
    React.useEffect(() => {
      const filter: any = {};
      const filterSpecs: any = [];
      for (const entry of searchParams.entries()) {
        if (entry[0] === "colors") filter.colors = entry[1];
        else if (entry[0] === "price") {
          const p = entry[1].split(",");
          filter.max_price = Number(p[1]);
          filter.min_price = Number(p[0]);
        } else filterSpecs.push({ name: entry[0], values: entry[1] });
      }
      if (filterSpecs?.length !== 0) {
        filter.specs = filterSpecs;
      }
      filter.skip = currentPage * limit;
      filter.category = params.name;
      filter.limit = limit;
      filter.sortName = sortName;
      filter.sortType = sortType;
      (async () => {
        const result = await productApi.list(filter);
        console.log("result", result);
        if (currentPage === 0) {
          setTotalProduct(result.data.count);
        }
        setListProduct(result.data.data);
      })();
    }, [searchParams, click, currentPage]);
  }
  const handleSort = (name: string, type: number, text: string) => {
    setSortName(name);
    setSortType(type);
    setClick(click + 1);
    const btn = document.getElementById("triggerId");
    btn ? (btn.textContent = text) : {};
  };
  const subcribe = async (data: any, e: any) => {
    e.preventDefault();
    const res = await socialApi.add({ email: data.email });
    if (res) {
      notifySuccess("Đăng ký thành công !");
      reset();
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
  };
  const handleSearch = () => {
    const value = document.getElementById("search-product") as HTMLInputElement;
    if (value.value !== "") {
      searchParams.set("search", value.value);
    } else searchParams.delete("search");
    setSearchParams(searchParams);
  };
  // console.log(listProduct);
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
                  id="search-product"
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <a onClick={handleSearch}>
                      <i className="fa fa-search"></i>
                    </a>
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
                  ? stateAuth.data?.data?.bag_items_length
                  : localCart.count}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Nav */}

      <Nav />

      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Sản phẩm
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/">Trang chủ</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Sản phẩm</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-12">
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">Lọc theo giá</h5>
              <PriceFilter />
            </div>
            <FilterColor listProduct={listAllProduct} />
            {Object.keys(params).length !== 0 ? (
              cat?.specsModel.map((item: any, index: any) => (
                <SpecFilter key={index} spec={item} />
              ))
            ) : (
              <div></div>
            )}
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="dropdown ml-4">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sắp xếp
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="triggerId"
                    >
                      <a
                        onClick={() => handleSort("price", -1, "Giá giảm dần")}
                        className="dropdown-item"
                      >
                        Giá giảm dần
                      </a>
                      <a
                        onClick={() => handleSort("price", +1, "Giá tăng dần")}
                        className="dropdown-item"
                      >
                        Giá tăng dần
                      </a>
                      <a
                        onClick={() => handleSort("sale", -1, "Khuyến mãi")}
                        className="dropdown-item"
                      >
                        Khuyến mãi
                      </a>
                      <a
                        onClick={() => handleSort("sold", -1, "Đang bán chạy")}
                        className="dropdown-item"
                      >
                        Đang bán chạy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {listProduct?.map((item: any, index: any) => (
                <ProductCard
                  key={index}
                  product={item}
                  setClick={setClick}
                  click={click}
                />
              ))}

              <Pagination
                limit={limit}
                total={totalProduct}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </div>
  );
};

export default Product;
