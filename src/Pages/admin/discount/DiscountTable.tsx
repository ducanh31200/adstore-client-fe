import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useDiscount from "../../../store/discount";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "code",
    headerName: "Code",
    width: 100,
  },
  {
    field: "dateStart",
    headerName: "Ngày bắt đầu",
    width: 115,
  },
  {
    field: "dateEnd",
    headerName: "Ngày kết thúc",
    width: 115,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    width: 70,
  },
  {
    field: "enable",
    headerName: "Trạng thái",
    width: 125,
    renderCell: (params: any) => {
      return (
        <div className={`status ${params.row.enable}`}>
          {params.row.enable ? "Khả dụng" : "Không khả dụng"}
        </div>
      );
    },
  },
  {
    field: "is_oic",
    headerName: "Đối tượng",
    width: 155,
    renderCell: (params: any) => {
      return (
        <div className={`status ${!params.row.enable}`}>
          {params.row.is_oic ? "Giới hạn người dùng" : "Tất cả"}
        </div>
      );
    },
  },
  {
    field: "is_oid",
    headerName: "Số lần dùng",
    width: 130,
    renderCell: (params: any) => {
      return (
        <div className={`status ${!params.row.enable}`}>
          {params.row.is_oid ? "1 ngày 1 lần" : "Không giới hạn"}
        </div>
      );
    },
  },
  {
    field: "is_percent",
    headerName: "Loại khuyến mãi",
    width: 120,
    renderCell: (params: any) => {
      return (
        <div>{params.row.is_percent ? "Theo phần trăm" : "Theo giá trị"}</div>
      );
    },
  },
  {
    field: "is_ship",
    headerName: "Khuyến mãi giao hàng",
    width: 100,
    renderCell: (params: any) => {
      return <div>{params.row.is_ship ? "Phí giao hàng" : "Giá đơn hàng"}</div>;
    },
  },
  {
    field: "maxPriceformat",
    headerName: "Giá trị tối đa",
    width: 160,
  },
  {
    field: "minPriceformat",
    headerName: "Giá trị tối thiểu của đơn hàng",
    width: 160,
  },
  {
    field: "valueformat",
    headerName: "Giá trị khuyến mãi",
    width: 160,
  },
];

const DiscountTable = () => {
  const [listDiscount, actionDiscount] = useDiscount();
  const handleEnable = (_id: string) => {
    actionDiscount.UpdateDiscount({ _id: _id, enable: true });
    listDiscount.data.map((item, index) => {
      if (item._id === _id) item.enable = false;
    });
  };
  const handleChange = (_id: string, enable: boolean) => {
    actionDiscount.ChangeStatusDiscount(_id, enable);
    console.log("_id", _id);
    listDiscount.data.map((item, index) => {
      if (item._id === _id) item.enable = false;
    });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div
              className={params.row.enable ? "deleteButton" : "enableButton"}
              onClick={() => handleChange(params.row._id, params.row.enable)}
            >
              {params.row.enable ? "Disable" : "Enable"}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Discount
        <Link to="/discount/new" className="link">
          Add New
        </Link>
      </div>
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          className="datagrid"
          rows={listDiscount.data}
          columns={userColumns.concat(actionColumn)}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
      </Box>
    </div>
  );
};
export default DiscountTable;
