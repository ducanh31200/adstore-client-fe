import "./style.scss";
import style from "./style.module.css";
import React, { useState } from "react";
import Specs from "./specs";
import { useForm } from "react-hook-form";
import _ from "lodash";
import addimg from "../../../../img/addimg.png";
import removeimg from "../../../../img/removeimg.png";
import useCatDetail from "../../../../store/CategoryDetail";
import { useNavigate, useParams } from "react-router";
import categoryApi from "../../../../api/category/category";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import useAuth from "../../../../store/auth";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../common/ContainerModal";
import ModalInfo from "../../../common/PersonalInfo/ModalInfo/personalInfo";

type Props = {};

const CategoryDetail = (props: Props) => {
  const params = useParams<any>();
  const _id = params._id as string;
  console.log("params", params);
  const [stateAuth, actionAuth] = useAuth();
  const [catDetail, actionCatDetail] = useCatDetail();
  const [listDetail, setListDetail] = useState<any>([]);
  const [listSpecs, setListSpecs] = useState<any>();
  const [images, setImages] = React.useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = React.useState<any>("");
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  React.useEffect(() => {
    (async () => {
      if (_id) {
        await actionCatDetail.ReadCat({ _id });
      }
    })();
  }, [_id]);

  React.useEffect(() => {
    return () => {
      actionCatDetail.setCate(undefined);
    };
  }, []);
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
    if (!!catDetail.data) {
      if (catDetail.data.image_url) setPickedImages([catDetail.data.image_url]);
      const list = [];
      toDataUrl(catDetail.data.image_url, function (res: any) {
        const base64 = res.split(",");
        setImagesBase64(base64[1]);
      });
      for (const [key, value] of Object.entries(catDetail.data)) {
        if (key !== "specsModel" && key !== "image_url")
          list.push({ name: key, value: value });
      }

      setValue("name", catDetail.data.name);
      console.log("list");
      console.log("catDetail", catDetail.data);
      setListDetail(list);
      setListSpecs(catDetail.data.specsModel);
    }
  }, [catDetail.data]);

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

  const onSubmit = async (data: any) => {
    const nameCategory = data.name;
    delete data.name;
    var arr1 = Object.keys(data);
    var arr2 = Object.values(data);
    let name: any[] = [];
    let temp: any[] = [];
    let specs_model: any[] = [];

    arr1.forEach((item, index) => {
      item.includes("name") ? name.push(arr2[index]) : temp.push(arr2[index]);
    });

    name.forEach((item, index) => {
      let obj = { name: item, values: temp[index] };
      specs_model.push(obj);
    });
    const payload = {
      _id,
      name: nameCategory,
      specsModel: specs_model,
      image_base64: imagesBase64,
    };
    console.log("payload", payload);
    if (imagesBase64) {
      const res = await categoryApi.update(payload);
      if (res.status === 200) {
        reset();
        handleRemoveImage(0);
        notifySuccess(res.data.msg);
        navigate("/admin/category");
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
            <h1>--------</h1>
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
                        />
                        <div className="absolute rounded-[50%] top-[-10px] right-[-10px] h-[30px] w-[30px] bg-red-600 cursor-pointer">
                          <img
                            className="left-imageAdd"
                            src={removeimg}
                            alt="remove"
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

                {listDetail?.map((item: any, index: any) =>
                  item.name === "name" ? (
                    <div className="formInput" key={index}>
                      <label>Tên loại hàng</label>
                      <input
                        style={{ width: "170px" }}
                        type="text"
                        {...register("name")}
                        defaultValue={item.value}
                        required
                      />
                    </div>
                  ) : item.name === "products_length" ? (
                    <div
                      className="formInput"
                      key={index}
                      style={{ width: "150px" }}
                    >
                      <label>Số sản phẩm</label>
                      <input type="text" defaultValue={item.value} disabled />
                    </div>
                  ) : (
                    <></>
                  )
                )}

                <ListCategory
                  register={register}
                  list={listSpecs}
                  setValue={setValue}
                />
                {/* <ExtendableInputs register={register} /> */}

                <button style={{ height: "50px" }}>Send</button>
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

const ListCategory = ({
  register,
  list,
  setValue,
}: {
  register: any;
  list: any;
  setValue: any;
}) => {
  React.useEffect(() => {
    if (list) {
      list.map((item: any, index: number) => {
        const specs: any = [];
        item.values.map((i: any) => {
          specs.push(i.value);
        });

        setValue(`values_${index}`, specs.join(";"));
        item.specs = specs.join(";");
      });
    }
  }, [list]);
  console.log("list", list);
  return (
    <div>
      <label>Thông số</label>
      {list &&
        list.map((item: any, index: any) => (
          <div className="formInput">
            <div className="specs-input">
              <input
                style={{ width: "190px" }}
                type="text"
                {...register(`name_${index}`)}
                defaultValue={item.name}
                placeholder="Name Spec"
              />
              <textarea
                style={{ width: "230px" }}
                {...register(`values_${index}`)}
                defaultValue={item.specs}
                placeholder="Value"
              />
            </div>
          </div>
        ))}
      <ExtendableInputs register={register} initialLength={list?.length || 0} />
    </div>
  );
};

const ExtendableInputs = ({
  register,
  initialLength,
}: {
  register: any;
  initialLength: number;
}) => {
  const [inputCount, setInputCount] = React.useState(0);

  // React.useEffect(() => {
  //   if (initialLength > 0) setInputCount(initialLength);
  // }, [initialLength]);

  const handleAddInput = () => setInputCount(inputCount + 1);
  const handleSubInput = () => setInputCount(inputCount - 1);
  // const handleAddInput = () => setInputCount(inputCount + 1);

  return (
    <div className="">
      {[...Array(inputCount)].map((_, index) => (
        <Specs register={register} id={index + initialLength} key={index} />
      ))}
      {/* <Specs /> */}
      <button type="button" onClick={handleAddInput}>
        Thêm
      </button>
      <button
        style={{ marginLeft: "20px" }}
        type="button"
        disabled={inputCount === 0}
        onClick={handleSubInput}
      >
        Xóa
      </button>
    </div>
  );
};

export default CategoryDetail;
