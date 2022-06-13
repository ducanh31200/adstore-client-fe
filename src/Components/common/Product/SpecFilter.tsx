import React from "react";
import { Link } from "react-router-dom";

export const SpecFilter = ({ spec }: { spec: any }) => {
  let total = 0;
  spec.values.forEach((item: any) => {
    total = total + item.products_length;
  });

  return (
    <div className="mb-5">
      <h5 className="font-weight-semi-bold mb-4">Filter by {spec.name}</h5>
      <form>
        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            defaultChecked
            id="all"
          />
          <label className="custom-control-label" htmlFor="all">
            All
          </label>
          <span className="badge border font-weight-normal">{total}</span>
        </div>
        {spec.values.map((item: any, index: any) => (
          <div
            key={index}
            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id={index}
            />
            <label className="custom-control-label" htmlFor={index}>
              {item.value}
            </label>
            <span className="badge border font-weight-normal">
              {item.products_length}
            </span>
          </div>
        ))}
      </form>
    </div>
  );
};
