import Sidebar from "../../../Components/pages/admin/sidabar/Sidebar";

import "./home.scss";

const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      {/* <div className="homeContainer">
                  <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                  </div>
                </div> */}

      {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
      {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
    </div>
    // </div>
  );
};

export default Dashboard;
