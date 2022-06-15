import "./new.scss";
import style from "./style.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { notifyError, notifySuccess } from "../../../utils/notify";
import productApi from "../../../api/product/productApi";
import discountApi from "../../../api/discount/discountApi";
type Props = {
  inputs: any;
  title: any;
};

const NewDiscount = (props: Props) => {
  const inputs = props.inputs;
  const title = props.title;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const payload = {
      code: data.code,
      enable: Boolean(data.enable),
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
      quantity: Number(data.quantity),
      minPrice: Number(data.minPrice),
      maxPrice: Number(data.maxPrice),
      is_percent: Boolean(data.is_percent),
      is_ship: Boolean(data.is_ship),
      is_oic: Boolean(data.is_oic),
      value: Number(data.value),
    };
    console.log(payload);

    const res = await discountApi.create(payload);
    console.log(res);
    if (res.status === 200) {
      notifySuccess("Thêm mã giảm giá thành công !");
      reset();
      window.location.reload();
    } else notifyError(res.response.data.msg);
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputs.map((input: any, index: number) => (
                <div className="formInput" key={index}>
                  <label>{input.label}</label>
                  {input.type === "option" ? (
                    <div className="option">
                      <select {...register(`${input.key}`)}>
                        {/* <option>Chọn</option> */}
                        <option key="1" value="">
                          False
                        </option>
                        <option key="2" value="true">
                          True
                        </option>
                      </select>
                    </div>
                  ) : (
                    <input
                      {...register(`${input.key}`)}
                      type={input.type}
                      placeholder={input.label}
                      required
                    />
                  )}
                </div>
              ))}

              <button style={{ height: "50px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDiscount;
