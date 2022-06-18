import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
import useDiscount from "../../../../store/discount";
interface Props {
  closeModal: () => void;
  products: Array<any>;
}

const ModalApplyDiscountPro = (props: Props) => {
  const { closeModal, products } = props;
  const [listDiscount, actionDiscount] = useDiscount();
  const { getValues, setValue, handleSubmit, reset } = useForm();
  React.useEffect(() => {
    (async () => {
      await actionDiscount.GetListDiscount({});
    })();
  }, []);
  const onChange = (e: any) => {
    setValue("_id", e.target.value);
  };
  const onApply = async () => {
    const id_discount = getValues("_id");
    const payload = {
      _id: id_discount,
      products_add: products,
    };
    if (!id_discount) notifyError("Vui lòng chọn mã khuyến mãi !");
    if (products.length !== 0) {
      const res = await actionDiscount.UpdateDiscount(payload);
      if (res) {
        closeModal();
        notifySuccess("Thêm mã thành công !");
        window.location.reload();
      } else notifyError("Xảy ra lỗi vui lòng thử lại !");
    } else notifyError("Vui lòng chọn sản phẩm !");
  };
  const onDelete = async () => {
    const id_discount = getValues("_id");
    const payload = {
      _id: id_discount,
      products_del: products,
    };
    if (!id_discount) notifyError("Vui lòng chọn mã khuyến mãi !");
    if (products.length !== 0) {
      const res = await actionDiscount.UpdateDiscount(payload);
      if (res) {
        closeModal();
        notifySuccess("Thêm mã thành công !");
        window.location.reload();
      } else notifyError("Xảy ra lỗi vui lòng thử lại !");
    } else notifyError("Vui lòng chọn sản phẩm !");
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
              <form style={{ alignItems: "center" }}>
                <div className="select">
                  <label>Mã khuyến mãi : &nbsp;</label>
                  <select onChange={onChange}>
                    <option value={""}>Chọn</option>
                    {listDiscount.data.map((item: any, index: any) => (
                      <option key={index} value={item._id}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => onApply()}
                  style={{ height: "50px" }}
                >
                  Áp dụng mã
                </button>
                <button
                  type="button"
                  onClick={() => onDelete()}
                  style={{ height: "50px" }}
                >
                  Xóa khỏi mã
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApplyDiscountPro;
