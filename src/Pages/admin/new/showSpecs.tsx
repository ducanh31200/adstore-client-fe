import React from "react";

type Props = {
  register: any;
  id: number;
  name: string;
  values: any;
};

const ShowSpecs = ({ register, id, name, values }: Props) => {
  return (
    <div className="formInput">
      <div className="specs-input">
        <input
          //   {...register(`spec${id}`)}
          type="text"
          value={name}
          disabled
          placeholder="Name Spec"
        />
        <div className="select">
          <select {...register(`value${id}`)}>
            <option value={""}>Chọn</option>
            {values.map((item: any, index: any) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShowSpecs;
