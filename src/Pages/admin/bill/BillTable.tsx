import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import useBillManagement from "../../../store/billManagement";
import ModalApplyDiscountUser from "../../../Components/pages/admin/datatable/ApplyDiscountUser";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import BillDetailModal from "../../../Components/pages/client/Bill/BillDetailModal";
import CancelModal from "../../../Components/pages/client/Bill/CancelModal";
import UpdateBill from "../../../Components/pages/admin/bill/UpdateBill";

export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "_id", headerName: "Mã đơn hàng", width: 210 },
  {
    field: "name",
    headerName: "Họ và tên",
    width: 150,
  },

  {
    field: "phoneformat",
    headerName: "Số điện thoại",
    width: 130,
  },

  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "addressformat",
    headerName: "Địa chỉ",
    width: 300,
  },
  {
    field: "discountformat",
    headerName: "Giảm giá",
    width: 130,
  },
  {
    field: "shipformat",
    headerName: "Phí ship",
    width: 130,
  },
  {
    field: "totalformat",
    headerName: "Tổng tiền",
    width: 130,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 140,
  },
  {
    field: "paid",
    headerName: "Thanh toán",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div className={`status ${params.row.paid}`}>
          {params.row.paid ? "Đã thanh toán" : "Chưa thanh toán"}
        </div>
      );
    },
  },
  {
    field: "verify",
    headerName: "Xác thực",
    width: 125,
    renderCell: (params: any) => {
      return (
        <div className={`status ${params.row.verify}`}>
          {params.row.verify ? "Đã xác thực" : "Chưa xác thực"}
        </div>
      );
    },
  },
];
const BillTable = () => {
  const [listBill, actionBill] = useBillManagement();
  const [showUpdateBillModal, setUpdateBillModal] = React.useState(false);
  const openUpdateBillModal = () => setUpdateBillModal(true);
  const closeUpdateBillModal = () => setUpdateBillModal(false);
  const [showApplyDiscountModal, setApplyDiscountModal] = React.useState(false);
  const openApplyDiscountModal = () => setApplyDiscountModal(true);
  const closeApplyDiscountModal = () => setApplyDiscountModal(false);
  const [showBillDetailModal, setBillDetailModal] = React.useState(false);
  const openBillDetailModal = () => setBillDetailModal(true);
  const closeBillDetailModal = () => setBillDetailModal(false);
  const [IDBill, setIDBill] = React.useState("");

  const handleReadBill = (_id: any) => {
    setIDBill(_id);
    openBillDetailModal();
  };
  const handleUpdateBill = (_id: any) => {
    setIDBill(_id);
    openUpdateBillModal();
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleReadBill(params.row._id)}
            >
              Xem đơn hàng
            </div>
            <div
              className="enableButton"
              onClick={() => handleUpdateBill(params.row._id)}
            >
              Cập nhật
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
        rows={listBill.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <ContainerModal
        isVisible={showBillDetailModal}
        closeModal={closeBillDetailModal}
      >
        <BillDetailModal closeModal={closeBillDetailModal} _id={IDBill} />
      </ContainerModal>
      <ContainerModal
        isVisible={showUpdateBillModal}
        closeModal={closeUpdateBillModal}
      >
        <UpdateBill closeModal={closeUpdateBillModal} _id={IDBill} />
      </ContainerModal>
    </div>
  );
};

export default BillTable;
