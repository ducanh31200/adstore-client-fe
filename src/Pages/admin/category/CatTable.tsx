import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCate from "../../../store/category";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
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
    field: "products_length",
    headerName: "Số lượng sản phẩm",
    width: 230,
  },
];

const CatTable = () => {
  const [category, actionCategory] = useCate();

  const handleDelete = (_id: string) => {
    actionCategory.DeleteCategory(_id);
  };

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
              onClick={() => handleDelete(params.row._id)}
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
        rows={category.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
export default CatTable;
