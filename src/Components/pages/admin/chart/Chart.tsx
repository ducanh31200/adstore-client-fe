import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useState } from "react";
import revenueApi from "../../../../api/revenue/revenueApi";
import { moneyFormater } from "../../../../utils/moneyFormater";

type Props = {
  aspect: any;
  title: any;
};

const Chart = (props: Props) => {
  const title = props.title;
  const aspect = props.aspect;
  const [dateEnd, setDateEnd] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [step, setStep] = useState("");
  const [dataChart, setDataChart] = useState({ graph: [], products: [] });
  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }

  function formatDay(date: any) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  function formatMonth(date: any) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1)].join("-");
  }
  function formatYear(date: any) {
    return [date.getFullYear()];
  }
  React.useEffect(() => {
    (async () => {
      const res = await revenueApi.list({
        type: "bill",
        dateStart: dateStart,
        dateEnd: dateEnd,
        step: step,
      });
      setDataChart(res?.data?.data);
    })();
  }, [dateEnd, dateStart, step]);
  const onDateStart = (e: any) => {
    const value = e.target.value;
    console.log("value", value);
    setDateStart(value);
  };
  const onDateEnd = (e: any) => {
    const value = e.target.value;
    setDateEnd(value);
  };
  const handleShowSpecs = (e: any) => {
    const value = e.target.value;
    setStep(value);
  };
  const data = [{}];
  dataChart.graph.map((item: any, index: any) => {
    if (step === "second" || step === "day")
      data.push({ name: formatDay(new Date(item.time)), Total: item.total });
    else if (step === "month")
      data.push({ name: formatMonth(new Date(item.time)), Total: item.total });
    else
      data.push({ name: formatYear(new Date(item.time)), Total: item.total });
  });
  const rows = [
    {
      id: -1,
      product: "",
      img: "",

      amount: 0,
      stock: 0,
      total: moneyFormater(0),
    },
  ];
  dataChart.products.map((item: any, index: number) => {
    rows.push({
      id: index + 1,
      product: item.name,
      img: item.image_url,

      amount: item.sold,
      stock: item.quantity,
      total: moneyFormater(item.total),
    });
  });
  console.log("data", dataChart);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <label style={{ marginRight: "20px" }} htmlFor="dateStart">
        {" "}
        Ngày bắt đầu : &nbsp;
        <input onChange={onDateStart} id="dateStart" type="date"></input>
      </label>
      <label style={{ marginRight: "20px" }} htmlFor="dateEnd">
        {" "}
        Ngày kết thúc :&nbsp;
        <input onChange={onDateEnd} id="dateEnd" type="date"></input>
      </label>
      <label style={{ marginRight: "20px" }} htmlFor="step">
        {" "}
        Thống kê theo :&nbsp;
        <select id="step" onChange={handleShowSpecs}>
          <option>Chọn</option>

          <option key="1" value="second">
            Từng sản phẩm
          </option>
          <option key="2" value="day">
            Ngày
          </option>
          <option key="3" value="month">
            Tháng
          </option>
          <option key="4" value="year">
            Năm
          </option>
        </select>
      </label>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="chart">
        <div className="title">Sản phẩm bán chạy</div>
        <table className="content-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng đã bán</th>
              <th>Số lượng trong kho</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => {
              if (item.id > 0)
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td className="cellWrapper">
                      <img className="image" src={item.img}></img>
                      {item.product}
                    </td>
                    <td>{item.amount}</td>
                    <td>{item.stock}</td>
                    <td>{item.total}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart;
