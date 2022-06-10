import "./new.scss";
import style from "./style.module.css";
import React, { useState } from "react";
import Specs from "./specs";
import { useForm } from "react-hook-form";

type Props = {
  inputs: any;
  title: any;
};

const New = (props: Props) => {
  const inputs = props.inputs;
  const title = props.title;
  const [images, setImages] = React.useState<Array<any>>([]);
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);

  const { register, handleSubmit } = useForm();

  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    [].forEach.call(files, function (file: any) {
      if (/image\/.*/.test(file.type)) {
        setPickedImages((images) => [
          ...images,
          (URL || webkitURL).createObjectURL(file),
        ]);
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

  const onSubmit = (data: any) => {
    console.log(data);

    const specs = [].map((item) => {
      value: item;
    });
    // const payload = {name: data.name,specs,immg_}
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {}
          <div className="left">
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
                        src={item}
                        alt="images"
                        className="rounded-[10px] h-full w-full object-cover"
                      />
                      <div className="absolute rounded-[50%] top-[-10px] right-[-10px] h-[30px] w-[30px] bg-red-600 cursor-pointer">
                        <img
                          src="/icons/ic_close.png"
                          alt="remove"
                          className="rounded-[50%] h-full w-full object-cover"
                          onClick={function () {
                            handleRemoveImage(index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {pickedImages.length < 10 && (
                    <label
                      className="col-span-1 h-[200px] w-full flex items-center justify-center rounded-[10px] cursor-pointer bg-gray-100 hover:opacity-50 active:scale-95"
                      htmlFor="product_images"
                    >
                      <div className="w-[100px] h-[100px]">
                        <img
                          src="/icons/ic_add_image.png"
                          alt="add_image"
                          className="w-full h-full"
                        />
                      </div>
                    </label>
                  )}
                </div>
              ) : (
                <label
                  className="h-[150px] w-[150px] opacity-30 cursor-pointer"
                  htmlFor="product_images"
                >
                  <img
                    src="/icons/ic_add_image.png"
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
                <label htmlFor="file">
                  Image: <i className="fa-solid fa-folder-arrow-up"></i>
                </label>
                <input
                  type="file"
                  // name={name}
                  id="product_images"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handlePickImages}
                />
              </div>
              {inputs.map((input: any, idex: number) => (
                <div className="formInput" key={idex}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <ExtendableInputs register={register} />

              <button style={{ height: "50px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtendableInputs = ({ register }: { register: any }) => {
  const [inputCount, setInputCount] = React.useState(1);

  const handleAddInput = () => setInputCount(inputCount + 1);
  // const handleAddInput = () => setInputCount(inputCount + 1);

  return (
    <div className="">
      {[...Array(inputCount)].map((_, index) => (
        <Specs register={register} id={index + 1} key={index} />
      ))}
      {/* <Specs /> */}
      <button type="button" onClick={handleAddInput}>
        Thêm
      </button>
    </div>
  );
};

export default New;
