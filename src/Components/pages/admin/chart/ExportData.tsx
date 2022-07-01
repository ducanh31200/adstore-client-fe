import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.scss";
import useDiscount from "../../../../store/discount";
import axios from "axios";
interface Props {
  closeModal: () => void;
  dateStart: number;
  dateEnd: number;
}

const ExportData = (props: Props) => {
  const { closeModal, dateStart, dateEnd } = props;
  const [listDiscount, actionDiscount] = useDiscount();
  const { getValues, setValue, register, handleSubmit } = useForm();
  const [stateReset, setStateReset] = useState(false);
  React.useEffect(() => {
    (async () => {
      await actionDiscount.GetListDiscount({});
    })();
  }, []);
  const handleReset = () => {
    setStateReset(!stateReset);
  };
  const submit = async (sm: any, e: any) => {
    const data = {
      email_or_phone: sm.email_or_phone,
      password: sm.password,
      dateStart: dateStart,
      dateEnd: dateEnd,
      reset: stateReset,
    };
    var results = await axios({
      url: "https://adstoresv-hint.herokuapp.com/model/build",
      data: data,
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    console.log(results);
    if (results.status === 200) {
      if (results.data.success === "Fail") notifyError(results.data.msg);
      else notifySuccess(results.data.msg);
    }
  };
  return (
    <div className="new">
      <div className="newContainer" style={{ backgroundColor: "white" }}>
        <div className="top">
          <h1>Xuất dữ liệu</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <form
                onSubmit={handleSubmit(submit)}
                style={{ alignItems: "center" }}
              >
                <div className="formInput">
                  <label style={{ lineHeight: "1px" }}>
                    Email/Phone: &nbsp;
                    <input
                      {...register("email_or_phone")}
                      type="text"
                      placeholder="Email/Phone"
                      required
                    />
                  </label>
                  <label style={{ textAlign: "center" }}>
                    Mật khẩu: &nbsp;
                    <input
                      {...register("password")}
                      type="text"
                      placeholder="Password"
                      required
                    />
                  </label>
                  <label style={{ textAlign: "center" }}>
                    Tạo lại: &nbsp;
                    <input
                      {...register("reset")}
                      type="radio"
                      defaultChecked
                      value="false"
                      name="reset"
                      onChange={handleReset}
                    />
                    Không
                    <input
                      {...register("reset")}
                      type="radio"
                      value="true"
                      name="reset"
                      onChange={handleReset}
                    />
                    Có
                  </label>
                </div>
                <button style={{ height: "50px" }}>Gửi dữ liệu</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
