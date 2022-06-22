import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BillApi from "../../../../api/cart/BillApi";
import useBillManagement from "../../../../store/billManagement";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
interface Props {
  closeModal: () => void;
  _id: string;
}

const UpdateBill = (props: Props) => {
  const { closeModal, _id } = props;
  const [listBill, actionBill] = useBillManagement();
  const { handleSubmit, reset, register, setValue } = useForm();
  const handleShowSpecs = (e: any) => {
    if (e.target.index !== 0) {
      const value = e.target.value;
      setValue("status", value);
    }
  };
  const onApply = async (data: any, e: any) => {
    e.preventDefault();
    const payload = Object({
      _id: _id,
      desc: data.desc,
      status: data.status,
    });
    if (data.status === "Chọn") {
      notifyError("Chọn trạng thái đơn hàng !");
      return;
    }
    const res = await actionBill.UpdateBill(payload);
    if (res) {
      reset();
      closeModal();
      notifySuccess("Cập nhật đơn thành công !");
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
              <form
                onSubmit={handleSubmit(onApply)}
                style={{ display: "flex" }}
              >
                <div className="formInput">
                  <label>
                    {" "}
                    Trạng thái: &nbsp;
                    <select onChange={handleShowSpecs}>
                      <option>Chọn</option>

                      <option key="1" value="Preparing">
                        Preparing
                      </option>
                      <option key="2" value="Delivering">
                        Delivering
                      </option>
                      <option key="3" value="Done">
                        Done
                      </option>
                      <option key="4" value="Cancel">
                        Cancelled
                      </option>
                    </select>
                  </label>
                  <label>
                    {" "}
                    Lí do: &nbsp;
                    <textarea
                      style={{ marginLeft: "43px" }}
                      {...register("desc")}
                      placeholder="Lí do"
                    />
                  </label>
                </div>
                <button style={{ height: "50px", marginTop: "40px" }}>
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBill;
