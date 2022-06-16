import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { moneyFormater } from "../../../utils/moneyFormater";
import { useSearchParams } from "react-router-dom";

function valuetext(value: number) {
  return moneyFormater(value);
}

const minDistance = 100000;

export default function PriceFilter() {
  const [value2, setValue2] = React.useState<number[]>([2000000, 20000000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const price = searchParams.get("price");
  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };
  const onDone = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) return;
    else {
      searchParams.set("price", `${value[0]},${value[1]}`);
      setSearchParams(searchParams);
    }
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        min={0}
        max={100000000}
        getAriaLabel={() => "Minimum distance shift"}
        value={value2}
        step={100000}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        disableSwap
        onChangeCommitted={onDone}
      />
    </Box>
  );
}
