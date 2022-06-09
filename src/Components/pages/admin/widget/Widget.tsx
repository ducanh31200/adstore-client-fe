import "./widget.scss";

type Props = {
  type: any;
};

const Widget = (props: Props) => {
  let data: any;
  const type = props.type;
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <i className="fa-solid fa-user"></i>,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: <i className="fa-solid fa-cart-shopping"></i>,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: <i className="fa-solid fa-sack-dollar"></i>,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
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
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <i className="fa-solid fa-arrow-up"></i>
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
