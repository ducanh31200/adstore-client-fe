import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import categoryApi from "../../../../api/category/category";
import productApi from "../../../../api/product/productApi";
import addimg from "../../../../img/addimg.png";
import removeimg from "../../../../img/removeimg.png";
import useAuth from "../../../../store/auth";
import useProductDetail from "../../../../store/productDetail";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./new.scss";
import style from "./style.module.css";

const ProductDetailManagement = () => {
  const params = useParams<any>();
  const _id = params._id as string;
  const [images, setImages] = React.useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = React.useState<any>("");
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);
  const [listSpecs, setListSpecs] = useState<Array<any>>([]);
  const [productDetail, actionProductDetail] = useProductDetail();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [currentCate, setCurrentCate] = React.useState<any>(undefined);
  const [product, setProduct] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const [stateAuth, actionAuth] = useAuth();

  const handleBack = () => {
    navigate("/admin/product");
  };

  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };

  console.log("currentCate", currentCate);
  // console.log("data", productDetail.data);

  React.useEffect(() => {
    (async () => {
      if (currentCate) {
        const list = await categoryApi.read({ name: currentCate });

        if (list.data) {
          setListSpecs(list.data.data.specsModel);
        }
      }
    })();
  }, [currentCate]);

  function toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  React.useEffect(() => {
    (async () => {
      if (_id) {
        await actionProductDetail.ReadProduct({ _id });
      }
    })();
  }, [_id]);

  React.useEffect(() => {
    return () => {
      actionProductDetail.setProduct(undefined);
    };
  }, []);

  React.useEffect(() => {
    if (!!productDetail.data) {
      setCurrentCate(productDetail.data.category);
      setValue("category", productDetail.data.category);
      setValue("name", productDetail.data.name);
      toDataUrl(productDetail.data.image_url, function (res: any) {
        const base64 = res.split(",");
        setImagesBase64(base64[1]);
      });

      pickedImages[0] = productDetail.data.image_url;
      setPickedImages(pickedImages);

      const specs = [];
      for (const [key, value] of Object.entries(productDetail.data)) {
        specs.push({ key, value });
      }
      setProduct(specs);
    }
  }, [productDetail.data]);

  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    [].forEach.call(files, function (file: any) {
      if (/image\/.*/.test(file.type)) {
        setPickedImages((images) => [
          ...images,
          (URL || webkitURL).createObjectURL(file),
        ]);
        getBase64(file, (result: any) => {
          const base64 = result.split(",");
          setImagesBase64(base64[1]);
        });
      }
    });
    setImages([...images, ...Object.values(files)]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = pickedImages.filter((_, i) => i !== index); // string url, not files
    const newImagesFiles = images.filter((_, i) => i !== index); // these are files
    setPickedImages(newImages);
    setImages(newImagesFiles);
    // setValue(name, newImagesFiles);
  };

  const handleShowSpecs = (e: any) => {
    if (e.target.index !== 0) {
      setValue("category", e.target.value);
      const value = e.target.value;
      setCurrentCate(value);
    }
  };

  const onSubmit = async (data: any) => {
    // console.log(data);
    let arr1 = Object.keys(data);
    let specs: { [k: string]: any } = {};
    const indexName = arr1.filter((item) => item.toString().startsWith("spec"));
    const indexValue = arr1.filter((item) =>
      item.toString().startsWith("value")
    );
    indexName.forEach((item, index) => {
      if (data[indexValue[index]]) {
        specs[data[item]] = data[indexValue[index]];
      }
    });

    const payload = {
      _id: params._id as string,
      name: data.name,
      code: data.code,
      desc: data.desc,
      specs: specs,
      price: data.price,
      sale: data.sale,
      image_base64: imagesBase64,
    };
    console.log("payload", payload);
    if (imagesBase64) {
      const res = await productApi.update(payload);
      if (res.status === 200) {
        notifySuccess("Chỉnh sửa sản phẩm thành công !");
        reset();
        handleRemoveImage(0);
        navigate("/admin/product");
      } else notifyError(res.message);
    } else notifyError("Vui lòng thêm hình ảnh !");
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
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Quản lý sản phẩm</h1>
          </div>
          <div className="bottom">
            {}
            <div className="left">
              Image:
              <div className={`${style.listImage}`}>
                {pickedImages.length > 0 ? (
                  <div
                    id="images_preview"
                    className={`grid grid-cols-5 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2`}
                  >
                    {pickedImages.map((item, index) => (
                      <div
                        className="col-span-1 h-[200px] w-full rounded-[10px] border relative"
                        key={index}
                      >
                        <img
                          className="left-imageShow"
                          src={item}
                          alt="images"
                          // className="rounded-[10px] h-full w-full object-cover"
                        />
                        <div className="absolute rounded-[50%] top-[-10px] right-[-10px] h-[30px] w-[30px] bg-red-600 cursor-pointer">
                          <img
                            className="left-imageAdd"
                            src={removeimg}
                            alt="remove"
                            // className="rounded-[50%] h-full w-full object-cover"
                            onClick={function () {
                              handleRemoveImage(index);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <label
                    className="h-[150px] w-[150px] opacity-30 cursor-pointer"
                    htmlFor="product_images"
                  >
                    <img
                      src={addimg}
                      alt="add_image"
                      className="w-full h-full"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="right">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formInput">
                  <input
                    type="file"
                    // name={name}
                    id="product_images"
                    hidden
                    accept="image/*"
                    onChange={handlePickImages}
                  />
                </div>
                {product.map((input: any, index: number) => (
                  <div key={index}>
                    {input.key === "name" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <input
                          type="text"
                          defaultValue={input.value}
                          placeholder={input.key}
                          {...register(`${input.key}`)}
                        />
                      </div>
                    ) : input.key === "code" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <input
                          type="text"
                          defaultValue={input.value}
                          placeholder={input.key}
                          {...register(`${input.key}`)}
                        />
                      </div>
                    ) : input.key === "price" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <input
                          type="text"
                          defaultValue={input.value}
                          placeholder={input.key}
                          {...register(`${input.key}`)}
                        />
                      </div>
                    ) : input.key === "sale" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <input
                          type="text"
                          defaultValue={input.value}
                          placeholder={input.key}
                          {...register(`${input.key}`)}
                        />
                      </div>
                    ) : input.key === "desc" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <textarea
                          defaultValue={input.value}
                          placeholder={input.key}
                          {...register(`${input.key}`)}
                        />
                      </div>
                    ) : input.key === "category" ? (
                      <div className="formInput">
                        <label>{input.key}</label>
                        <input
                          type="text"
                          disabled
                          defaultValue={input.value}
                          placeholder={input.key}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
                <SpecsCategory
                  setValue={setValue}
                  register={register}
                  listSpecs={listSpecs}
                  listDetail={productDetail.data?.specs}
                />
                <button style={{ height: "50px" }}>Cập nhật</button>
                <button
                  type="button"
                  className="button"
                  onClick={handleBack}
                  style={{ height: "50px" }}
                >
                  Trờ về
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecsCategory = ({
  register,
  listSpecs,
  setValue,
  listDetail,
}: {
  register: any;
  setValue: any;
  listSpecs: any;
  listDetail: any;
}) => {
  const [arr, setArr] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (listDetail) {
      const specs = [];
      for (const [key, value] of Object.entries(listDetail)) {
        specs.push({ name: key, value });
      }
      setArr(specs);
    }
  }, [listDetail]);

  React.useEffect(() => {
    return () => {
      setArr([]);
    };
  }, []);

  return (
    <div className="">
      <label>Specs</label>
      {listSpecs.map((item: any, index: any) => {
        setValue(`spec${index + 1}`, item.name);
        return (
          <ShowSpecsDetail
            register={register}
            id={index + 1}
            key={index}
            name={item.name}
            values={item.values}
            list={arr[index]?.value}
          />
        );
      })}
    </div>
  );
};

const ShowSpecsDetail = ({
  register,
  id,
  name,
  values,
  list,
}: {
  register: any;
  id: any;
  name: any;
  values: any;
  list: any;
}) => {
  return (
    <div className="formInput">
      <div className="specs-input">
        <input
          //   {...register(`spec${id}`)}
          type="text"
          value={name}
          disabled
          placeholder="Name Spec"
        />

        <div className="select">
          <select {...register(`value${id}`)}>
            <option value={list}>{list}</option>
            {values.map((item: any, index: any) => {
              if (item.value !== list)
                return (
                  <option key={index} value={item.value}>
                    {item.value}
                  </option>
                );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailManagement;
