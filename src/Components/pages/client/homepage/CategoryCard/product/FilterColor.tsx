import React from "react";
import { useSearchParams } from "react-router-dom";

export const FilterColor = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const color = searchParams.get("colors");

  const colorFilter = [
    {
      label: "All Color",
      id: "color-all",
      quantity: 1000,
      defaultChecked: true,
      value: "",
    },
    {
      label: "Black",
      id: "color-1",
      quantity: 150,
      defaultChecked: false,
      value: "Black",
    },
    {
      label: "White",
      id: "color-2",
      quantity: 295,
      defaultChecked: false,
      value: "White",
    },
    {
      label: "Red",
      id: "color-3",
      quantity: 246,
      defaultChecked: false,
      value: "Red",
    },
    {
      label: "Blue",
      id: "color-4",
      quantity: 1000,
      defaultChecked: false,
      value: "Blue",
    },
    {
      label: "Green",
      id: "color-5",
      quantity: 1000,
      defaultChecked: false,
      value: "Green",
    },
  ];

  const handleSetURLQueries = (color: string, check: boolean) => {
    const currentColors = searchParams.get("colors");
    if (check) {
      if (currentColors) {
        searchParams.set("colors", `${currentColors},${color}`);
        setSearchParams(searchParams);
      } else {
        {
          searchParams.set("colors", color);
          setSearchParams(searchParams);
        }
      }
    } else {
      const split = currentColors?.split(",");
      const removedColor = split?.filter((item) => item !== color);

      if (removedColor?.length === 0) {
        searchParams.delete("colors");
      } else {
        searchParams.set("colors", removedColor?.join(",") || "");
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="border-bottom mb-4 pb-4">
      <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
      <form>
        {colorFilter.map((item, index) => (
          <div
            key={index}
            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
          >
            {index === 0 ? (
              <input
                type="checkbox"
                className="custom-control-input"
                id={item.id}
                readOnly
                checked={!color}
              />
            ) : (
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked={item.defaultChecked}
                id={item.id}
                onChange={(e) =>
                  handleSetURLQueries(item.value, e.target.checked)
                }
              />
            )}
            <label className="custom-control-label" htmlFor={item.id}>
              {item.label}
            </label>
            <span className="badge border font-weight-normal">
              {item.quantity}
            </span>
          </div>
        ))}
      </form>
    </div>
  );
};
