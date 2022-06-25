import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";

import style from "./style.module.css";
import addimg from "../../../../img/addimg.png";

import removeimg from "../../../../img/removeimg.png";
import productApi from "../../../../api/product/productApi";
import useProduct from "../../../../store/product";
interface Props {
  closeModal: () => void;
  openAddColorModel: () => void;
  _id: string;
}

const ModalUpdateColor = (props: Props) => {
  const { closeModal, _id, openAddColorModel } = props;
  const [listproduct, actionProduct] = useProduct();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [images, setImages] = React.useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = React.useState<any>("");
  const [product, setProduct] = React.useState<any>({});
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);
  console.log("id", _id);

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
        const res = await productApi.read({ _id });
        console.log("res", res.data.data);
        setProduct(res.data.data);
        setValue("color", "Chọn");
        setImagesBase64("");
        setPickedImages([]);
      }
    })();
  }, [_id, listproduct]);
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
    setImagesBase64("");
    setImages(newImagesFiles);
  };

  const onSubmit = async (data: any) => {
    const payload = {
      _id: _id,
      color: data.color,
      image_base64: imagesBase64,
    };
    if (imagesBase64) {
      const res = await actionProduct.UpdateColor(payload);
      console.log("res", res);
      if (res) {
        reset();
        handleRemoveImage(0);
        closeModal();
        notifySuccess(res.msg);
      } else notifyError(res.message);
    } else notifyError("Vui lòng thêm hình ảnh !");
  };
  const handleOpenAdd = () => {
    closeModal();
    openAddColorModel();
  };

  const handleShowColors = (e: any) => {
    if (e.target.index !== 0) {
      const value = e.target.value;
      const color = product.colors.filter((item: any) => item.color === value);
      toDataUrl(color[0].image_url, function (res: any) {
        const base64 = res.split(",");
        setImagesBase64(base64[1]);
      });
      console.log("color", color);
      pickedImages[0] = color[0].image_url;
      setPickedImages(pickedImages);
      //   setCurrentCate(value);
    }
  };
  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Add Color</h1>
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
                  htmlFor="updated_color_image"
                >
                  <img src={addimg} alt="add_image" className="w-full h-full" />
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
                  id="updated_color_image"
                  hidden
                  accept="image/*"
                  onChange={handlePickImages}
                />
              </div>
              <label>
                Màu: &nbsp;
                <div className="select" style={{ width: "300px" }}>
                  <select
                    {...register("color")}
                    id="selectColor"
                    onChange={handleShowColors}
                  >
                    <option value="Chọn">Chọn</option>
                    {product?.colors?.map((item: any, index: any) => (
                      <option key={index} value={item.color}>
                        {item.color}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <button
                className="btn btn-primary btn-sign-up btn-sign-up"
                style={{ height: "50px" }}
                type="button"
                onClick={handleOpenAdd}
              >
                Thêm màu
                <i className="fa-solid fa-angle-left angle-left"></i>
              </button>
              <button style={{ height: "50px" }}>Sửa màu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateColor;
