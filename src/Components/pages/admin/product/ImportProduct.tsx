import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
import useDiscount from "../../../../store/discount";
import useProduct from "../../../../store/product";
import { lineHeight } from "@mui/system";
import productApi from "../../../../api/product/productApi";
interface Props {
  closeModal: () => void;
  code: string;
}

const ModalImportProduct = (props: Props) => {
  const { closeModal, code } = props;
  const { handleSubmit, reset, register, setValue } = useForm();
  const [listproduct, actionProduct] = useProduct();
  const [product, setProduct] = React.useState<any>({});
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
  React.useEffect(() => {
    (async () => {
      if (code) {
        const res = await productApi.read({ code });
        console.log("res", res.data.data);
        setProduct(res.data.data);
        setValue("color", "Chọn");
      }
    })();
  }, [code, listproduct]);

  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Nhập hàng</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <form onSubmit={handleSubmit(onApply)}>
                <div className="formInput">
                  <label style={{ lineHeight: "1px" }}>
                    {" "}
                    Màu &nbsp;
                    <div className="select" style={{ width: "300px" }}>
                      <select {...register("color")} id="selectColor">
                        <option value="Chọn">Chọn</option>
                        {product?.colors?.map((item: any, index: any) => (
                          <option key={index} value={item.color}>
                            {item.color}
                          </option>
                        ))}
                      </select>
                    </div>
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
