import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BillApi from "../../../../api/cart/BillApi";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
interface Props {
  closeModal: () => void;
  _id: string;
}

const CancelModal = (props: Props) => {
  const { closeModal, _id } = props;
  const { handleSubmit, reset, register } = useForm();

  const onApply = async (data: any, e: any) => {
    e.preventDefault();
    const payload = Object({
      _id: _id,
      desc: data.desc,
      status: "Cancel",
    });
    // console.log("payload", payload);
    const res = await BillApi.update(payload);
    if (res) {
      reset();
      closeModal();
      notifySuccess("Hủy đơn thành công !");
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
  };

  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>{`Hủy đơn hàng ${_id}`}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <form onSubmit={handleSubmit(onApply)}>
                <div className="formInput">
                  <label>
                    {" "}
                    Lí do: &nbsp;
                    <textarea {...register("desc")} placeholder="Lí do" />
                  </label>
                </div>
                <button style={{ height: "50px", alignItems: "center" }}>
                  Hủy đơn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
