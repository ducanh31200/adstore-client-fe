import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import { notifyError, notifySuccess } from "../../../utils/notify";
import socialApi from "../../../api/social/socialApi";
interface Props {
  closeModal: () => void;
  mails: Array<string>;
}

const SendMailModal = (props: Props) => {
  const { closeModal, mails } = props;
  const { handleSubmit, reset, register } = useForm();

  const onApply = async (data: any, e: any) => {
    e.preventDefault();
    const payload = {
      emails: mails,
      subject: data.subject,
      message: data.message,
    };
    console.log("payload", payload);
    const res = await socialApi.sendMail(payload);
    if (res) {
      reset();
      closeModal();
      notifySuccess("Nhập hàng thành công !");
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
  };
  const listmail = mails.join(" ; ");
  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Gửi mail</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <form onSubmit={handleSubmit(onApply)}>
                <div className="formInput" style={{ width: "500px" }}>
                  <label>
                    {" "}
                    Email &nbsp; &nbsp; &nbsp;
                    <textarea
                      disabled
                      defaultValue={listmail}
                      style={{ width: "500px" }}
                    />
                  </label>
                  <label>
                    {" "}
                    Tiêu đề &nbsp; &nbsp;
                    <textarea
                      {...register("subject")}
                      placeholder="Tiêu đề"
                      style={{ width: "500px" }}
                    />
                  </label>
                  <label>
                    {" "}
                    Nội dung:
                    <textarea
                      {...register("message")}
                      placeholder="Nội dung"
                      style={{ width: "500px" }}
                    />
                  </label>
                </div>

                <button style={{ height: "50px", alignItems: "center" }}>
                  Gửi mail
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMailModal;
