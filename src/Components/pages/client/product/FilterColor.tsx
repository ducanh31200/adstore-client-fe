import React from "react";
import { useSearchParams } from "react-router-dom";

export const FilterColor = ({ listProduct }: { listProduct: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const color = searchParams.get("colors");

  let total_quantity = 0;
  const listColor: any = [];
  const listColorFilter: any = [];
  listProduct.map((item: any, index: any) => {
    item.colors.map((i: any, j: any) => {
      const colorUpcase =
        i.color.charAt(0).toUpperCase() + i.color.slice(1).toLowerCase();
      if (!listColor.includes(colorUpcase)) {
        listColor.push(colorUpcase);
        listColorFilter.push({
          label: colorUpcase,
          id: `color-${i.color}`,
          quantity: i.quantity,
          value: i.color,
        });
        if (i.quantity) total_quantity = total_quantity + i.quantity;
      } else {
        listColorFilter[listColor.indexOf(colorUpcase)].quantity =
          listColorFilter[listColor.indexOf(colorUpcase)].quantity + i.quantity;
        if (i.quantity) total_quantity = total_quantity + i.quantity;
      }
    });
  });

  const handleSetURLQueries = (color: string, check: boolean) => {
    const currentColors = searchParams.get("colors");
    if (check) {
      if (currentColors) {
        searchParams.set("colors", `${currentColors};${color}`);
        setSearchParams(searchParams);
      } else {
        {
          searchParams.set("colors", color);
          setSearchParams(searchParams);
        }
      }
    } else {
      const split = currentColors?.split(";");
      const removedColor = split?.filter((item) => item !== color);

      if (removedColor?.length === 0) {
        searchParams.delete("colors");
      } else {
        searchParams.set("colors", removedColor?.join(";") || "");
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="border-bottom mb-4 pb-4">
      <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
      <form>
        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="color-all"
            readOnly
            checked={!color}
          />
          <label className="custom-control-label" htmlFor="color-all">
            All
          </label>
        </div>
        {listColorFilter.map((item: any, index: any) => (
          <div
            key={index}
            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
          >
            <input
              defaultChecked={false}
              type="checkbox"
              className="custom-control-input"
              id={item.id}
              onChange={(e) =>
                handleSetURLQueries(item.value, e.target.checked)
              }
            />
            <label className="custom-control-label" htmlFor={item.id}>
              {item.label}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};
