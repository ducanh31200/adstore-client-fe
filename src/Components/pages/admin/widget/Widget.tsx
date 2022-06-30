import React, { useState } from "react";
import { Link } from "react-router-dom";
import revenueApi from "../../../../api/revenue/revenueApi";
import useBill from "../../../../store/bill";
import useBillManagement from "../../../../store/billManagement";
import useUser from "../../../../store/user";
import { moneyFormater } from "../../../../utils/moneyFormater";
import "./widget.scss";

type Props = {
  type: any;
};

const Widget = (props: Props) => {
  let data: any;
  const type = props.type;
  //temporary
  const [listUser, actionUser] = useUser();
  const [listBill, actionBill] = useBillManagement();
  const [revenue, setRevenue] = useState(0);
  const [importCosts, setImportCosts] = useState(0);

  switch (type) {
    case "user":
      React.useEffect(() => {
        (async () => {
          await actionUser.GetListUser({});
        })();
      }, []);
      data = {
        count: listUser.count,
        title: "Người dùng",
        isMoney: false,
        label: "Xem chi tiết",
        link: "/admin/user",
        icon: <i className="fa-solid fa-user"></i>,
      };
      break;
    case "order":
      React.useEffect(() => {
        (async () => {
          await actionBill.GetListBill({});
        })();
      }, []);
      data = {
        count: listBill.count,
        title: "Đơn hàng",
        isMoney: false,
        label: "Xem chi tiết",
        link: "/admin/bill",
        icon: <i className="fa-solid fa-cart-shopping"></i>,
      };
      break;
    case "earning":
      React.useEffect(() => {
        (async () => {
          const res = await revenueApi.list({
            type: "bill",
          });
          if (res) {
            let total = 0;
            res?.data?.data?.graph?.map((item: any) => {
              total = total + item.total;
            });
            console.log("total", total);
            setRevenue(total);
          }
        })();
      }, []);
      data = {
        count: moneyFormater(revenue),
        title: "Doanh thu",
        isMoney: true,
        label: "Xem chi tiết",
        link: "/admin/revenue",
        icon: <i className="fa-solid fa-sack-dollar"></i>,
      };
      break;
    case "balance":
      React.useEffect(() => {
        (async () => {
          const res = await revenueApi.list({
            type: "import",
          });
          if (res) {
            let total = 0;
            res?.data?.data?.graph?.map((item: any) => {
              total = total + item.total;
            });
            console.log("total", total);
            setImportCosts(total);
          }
        })();
      }, []);
      data = {
        count: moneyFormater(importCosts),
        title: "Nhập hàng",
        isMoney: true,
        label: "Xem chi tiết",
        link: "/admin/revenue",
        icon: <i className="fa-solid fa-coins"></i>,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">
          <Link to={data.link}>{data.label}</Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <i className="fa-solid fa-arrow-up"></i>
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
