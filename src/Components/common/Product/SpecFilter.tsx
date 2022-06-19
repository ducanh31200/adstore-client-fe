import React from "react";
import { useSearchParams } from "react-router-dom";

export const SpecFilter = ({ spec }: { spec: any }) => {
  let total = 0;
  const [searchParams, setSearchParams] = useSearchParams();

  const spec_name = searchParams.get(`${spec.name}`);

  const handleSetURLQueries = (color: string, check: boolean) => {
    const currentSpecs = searchParams.get(`${spec.name}`);
    if (check) {
      if (currentSpecs) {
        searchParams.set(`${spec.name}`, `${currentSpecs},${color}`);
        setSearchParams(searchParams);
      } else {
        {
          searchParams.set(`${spec.name}`, color);
          setSearchParams(searchParams);
        }
      }
    } else {
      const split = currentSpecs?.split(",");
      const removedColor = split?.filter((item) => item !== color);
      if (removedColor?.length === 0) {
        searchParams.delete(`${spec.name}`);
      } else {
        searchParams.set(`${spec.name}`, removedColor?.join(",") || "");
      }
      setSearchParams(searchParams);
    }
  };
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
            readOnly
            id="all"
            checked={!spec_name}
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
              id={item._id}
              defaultChecked={false}
              onChange={(e) =>
                handleSetURLQueries(item.value, e.target.checked)
              }
            />
            <label className="custom-control-label" htmlFor={item._id}>
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
