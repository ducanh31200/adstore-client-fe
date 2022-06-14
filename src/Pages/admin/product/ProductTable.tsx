import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useProduct from "../../../store/product";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "code", headerName: "Code", width: 120 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image_url} alt="icon" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "priceformat",
    headerName: "Giá",
    width: 140,
  },
  {
    field: "saleformat",
    headerName: "Giảm giá",
    width: 140,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    width: 80,
  },
  {
    field: "enable",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className={`status ${params.row.enable ? "Approved" : "Soldout"}`}>
          {params.row.enable ? "Còn bán" : "Ngừng kinh doanh"}
        </div>
      );
    },
  },
];

const ProductTable = () => {
  const [listProduct, actionProduct] = useProduct();
  console.log("list", listProduct);
  // const handleDelete = (id: string) => {
  //   setData(data.filter((item: any) => item.id !== id));
  // };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="updateButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Category
        <Link to="/category/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={listProduct.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
export default ProductTable;
