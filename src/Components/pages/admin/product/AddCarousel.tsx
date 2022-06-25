import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";

import style from "./style.module.css";
import addimg from "../../../../img/addimg.png";

import removeimg from "../../../../img/removeimg.png";
import useProduct from "../../../../store/product";
import productApi from "../../../../api/product/productApi";
interface Props {
  closeModal: () => void;
  _id: string;
}

const ModalAddCarousel = (props: Props) => {
  const { closeModal, _id } = props;
  const [listproduct, actionProduct] = useProduct();
  const { handleSubmit, reset } = useForm();
  const [images, setImages] = React.useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = React.useState<any>("");
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);
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
        if (res.data.data.catalogue.length !== 0) {
          toDataUrl(res.data.data.catalogue[0].image_url, function (res: any) {
            const base64 = res.split(",");
            setImagesBase64(base64[1]);
          });
          pickedImages[0] = res.data.data.catalogue[0].image_url;
          setPickedImages(pickedImages);
        } else {
          setImagesBase64("");
          setPickedImages([]);
        }
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

  const onSubmit = async () => {
    const payload = {
      _id: _id,
      image_base64: imagesBase64,
    };
    if (imagesBase64) {
      const res = await actionProduct.AddCarousel(payload);
      console.log("rescata", res);
      if (res) {
        notifySuccess("Thành công");
        handleRemoveImage(0);
        closeModal();
      } else notifyError("Thất bại");
    } else notifyError("Vui lòng thêm hình ảnh !");
  };
  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Thêm ảnh khuyến mãi</h1>
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
                  htmlFor="carousel_images"
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
                  id="carousel_images"
                  hidden
                  accept="image/*"
                  onChange={handlePickImages}
                />
              </div>

              <button style={{ height: "50px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCarousel;
