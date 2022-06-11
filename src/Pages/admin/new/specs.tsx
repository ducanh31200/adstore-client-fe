import "./new.scss";
import style from "./style.module.css";
import React, { useState } from "react";

type Props = {
  register: any;
  id: number;
};

const Specs = ({ register, id }: Props) => {
  return (
    <div className="formInput">
      <div className="specs-input">
        <input
          {...register(`name_${id}`)}
          type="text"
          placeholder="Name Spec"
        />
        <input {...register(`values_${id}`)} type="text" placeholder="Value" />
      </div>
    </div>
  );
};

export default Specs;
