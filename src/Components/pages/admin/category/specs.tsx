import "./style.scss";

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
          style={{ width: "190px" }}
          {...register(`name_${id}`)}
          type="text"
          required
          placeholder="Name Spec"
        />
        <textarea
          style={{ width: "230px" }}
          {...register(`values_${id}`)}
          placeholder="Value"
          required
        />
      </div>
    </div>
  );
};

export default Specs;
