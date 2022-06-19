import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
import useDiscount from "../../../../store/discount";
import useProduct from "../../../../store/product";
import { lineHeight } from "@mui/system";
interface Props {
  closeModal: () => void;
  code: string;
}

const ModalImportProduct = (props: Props) => {
  const { closeModal, code } = props;
  const { handleSubmit, reset, register } = useForm();
  const [, actionProduct] = useProduct();

  const onApply = async (data: any, e: any) => {
    e.preventDefault();
    const payload = [];
    payload.push({
      code: code,
      color: data.color,
      quantity: Number(data.quantity),
      price: Number(data.price),
    });
    console.log("payload", payload);
    const res = await actionProduct.ImportProduct({ data: payload });
    if (res) {
      reset();
      closeModal();
      notifySuccess("Nhập hàng thành công !");
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
  };

  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Apply Discount</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <form onSubmit={handleSubmit(onApply)}>
                <div className="formInput">
                  <label style={{ lineHeight: "1px" }}>
                    {" "}
                    Màu &nbsp;
                    <input
                      {...register("color")}
                      type="text"
                      placeholder="Màu"
                    />
                  </label>
                  <label style={{ textAlign: "center", width: "200px" }}>
                    {" "}
                    Số lượng &nbsp;
                    <input
                      {...register("quantity")}
                      type="text"
                      placeholder="Số lượng"
                    />
                  </label>
                  <label style={{ lineHeight: "1px" }}>
                    {" "}
                    Giá &nbsp;
                    <input
                      {...register("price")}
                      type="text"
                      placeholder="Giá"
                    />
                  </label>
                </div>

                <button style={{ height: "50px", alignItems: "center" }}>
                  Nhập hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImportProduct;
