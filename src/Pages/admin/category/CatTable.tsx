import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalApplyDiscountCat from "../../../Components/pages/admin/category/ApplyDiscountCat";
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
  const [selected, setSelected] = React.useState<any>([]);
  const [showApplyDiscountModal, setApplyDiscountModal] = React.useState(false);
  const openApplyDiscountModal = () => setApplyDiscountModal(true);
  const closeApplyDiscountModal = () => setApplyDiscountModal(false);
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
        <Link
          to={location.pathname}
          className="link"
          onClick={openApplyDiscountModal}
          style={{ marginLeft: "auto" }}
        >
          Áp dụng khuyến mãi
        </Link>
        <Link to="/category/new" className="link">
          Thêm loại hàng
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={category.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows: any = [];
          category.data.map((row) => {
            if (selectedIDs.has(row.id)) selectedRows.push(row._id);
          });
          setSelected(selectedRows);
        }}
      />
      <ContainerModal
        isVisible={showApplyDiscountModal}
        closeModal={closeApplyDiscountModal}
      >
        <ModalApplyDiscountCat
          closeModal={closeApplyDiscountModal}
          categories={selected}
        />
      </ContainerModal>
    </div>
  );
};
export default CatTable;
