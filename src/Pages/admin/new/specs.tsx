import "./new.scss";
import style from "./style.module.css";
import React, { useState } from "react";

type Props = {
  register: any;
  id: number;
};

const Specs = ({ register, id }: Props) => {
  return (
    <div>
      <label>Specs</label>
      <input {...register(`name_${id}`)} type="text" placeholder="Name Specs" />
      <input {...register(`values_${id}`)} type="text" placeholder="Value" />
    </div>
  );
};

export default Specs;
