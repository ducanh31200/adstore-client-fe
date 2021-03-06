import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import useUser from "../../../../store/user";
import { ContainerModal } from "../../../common/ContainerModal";
import ModalApplyDiscountUser from "./ApplyDiscountUser";

export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Họ và tên",
    width: 150,
  },
  {
    field: "birth",
    headerName: "Ngày sinh",
    width: 110,
  },

  {
    field: "gender",
    headerName: "Giới tính",
    width: 60,
  },
  {
    field: "addressformat",
    headerName: "Địa chỉ",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 150,
  },
  {
    field: "role",
    headerName: "Quyền truy cập",
    width: 140,
  },
  {
    field: "self_cancel",
    headerName: "Số lần hủy đơn",
    width: 140,
    editable: true,
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
];
const Datatable = () => {
  const [listUser, actionUser] = useUser();
  const [showApplyDiscountModal, setApplyDiscountModal] = React.useState(false);
  const openApplyDiscountModal = () => setApplyDiscountModal(true);
  const closeApplyDiscountModal = () => setApplyDiscountModal(false);
  const [selected, setSelected] = React.useState<any>([]);
  const handleChange = (_id: string, enable: boolean) => {
    actionUser.ChangeStatusUser(_id, enable);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
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
        Danh sách người dùng
        <Link
          to={location.pathname}
          className="link"
          style={{ marginLeft: "auto" }}
          onClick={openApplyDiscountModal}
        >
          Áp dụng khuyến mãi
        </Link>
      </div>
      <DataGrid
        rows={listUser.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows: any = [];
          listUser.data.map((row) => {
            if (selectedIDs.has(row.id)) selectedRows.push(row._id);
          });
          setSelected(selectedRows);
        }}
      />
      <ContainerModal
        isVisible={showApplyDiscountModal}
        closeModal={closeApplyDiscountModal}
      >
        <ModalApplyDiscountUser
          closeModal={closeApplyDiscountModal}
          users={selected}
        />
      </ContainerModal>
    </div>
  );
};

export default Datatable;
