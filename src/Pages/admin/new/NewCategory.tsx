import React from "react";
import "./new.scss";
import style from "./style.module.css";

import { useForm } from "react-hook-form";
import categoryApi from "../../../api/category/category";
import addimg from "../../../img/addimg.png";
import removeimg from "../../../img/removeimg.png";
import { notifyError, notifySuccess } from "../../../utils/notify";
import Specs from "./specs";

type Props = {
  inputs: any;
  title: any;
};

const NewCategory = (props: Props) => {
  const inputs = props.inputs;
  const title = props.title;
  const [images, setImages] = React.useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = React.useState<any>("");
  const [pickedImages, setPickedImages] = React.useState<Array<any>>([]);
  const { register, handleSubmit, reset } = useForm();

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
    let values: any[] = [];
    let name: any[] = [];
    let temp: any[] = [];
    let specs_model: any[] = [];

    let newArray: any[] = [];
    arr1.forEach((item, index) => {
      item.includes("name") ? name.push(arr2[index]) : temp.push(arr2[index]);
    });
    temp.forEach((item) => {
      const a = item.split(",");
      a.map((item: any) => newArray.push({ value: item }));
      values.push(newArray);
      newArray = [];
    });
    name.forEach((item, index) => {
      if (item) {
        let obj = { name: item, values: values[index] };
        specs_model.push(obj);
      }
    });
    const payload = {
      name: nameCategory,
      specsModel: specs_model,
      image_base64: imagesBase64,
    };
    if (imagesBase64) {
      const res = await categoryApi.create(payload);
      if (res.status === 200) {
        reset();
        handleRemoveImage(0);
        notifySuccess(res.data.msg);
        window.location.reload();
      } else notifyError(res.message);
    } else notifyError("Vui lòng thêm hình ảnh !");
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
                      <img className="left-imageShow" src={item} alt="images" />
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
                  id="product_images"
                  hidden
                  accept="image/*"
                  onChange={handlePickImages}
                />
              </div>
              {inputs.map((input: any, idex: number) => (
                <div className="formInput" key={idex}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    required
                    placeholder={input.label}
                    {...register(`${input.key}`)}
                  />
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
      <label>Specs</label>
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

export default NewCategory;
