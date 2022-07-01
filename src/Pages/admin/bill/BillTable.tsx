import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

import useBillManagement from "../../../store/billManagement";
import ModalApplyDiscountUser from "../../../Components/pages/admin/datatable/ApplyDiscountUser";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import BillDetailModal from "../../../Components/pages/client/Bill/BillDetailModal";
import CancelModal from "../../../Components/pages/client/Bill/CancelModal";
import UpdateBill from "../../../Components/pages/admin/bill/UpdateBill";
import { notifyError, notifySuccess } from "../../../utils/notify";

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
    field: "refund",
    headerName: "Hoàn tiền",
    width: 140,
    renderCell: (params: any) => {
      return (
        <div className={`status ${params.row.refund}`}>
          {params.row.paid ? "Đã hoàn tiền" : "Chưa hoàn tiền"}
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [showBillDetailModal, setBillDetailModal] = React.useState(false);
  const openBillDetailModal = () => setBillDetailModal(true);
  const closeBillDetailModal = () => setBillDetailModal(false);
  const [IDBill, setIDBill] = React.useState("");
  const handleShowStatus = (e: any) => {
    if (e.target.index !== 0) {
      const value = e.target.value;
      if (value !== "") {
        searchParams.set("status", value);
      } else searchParams.delete("status");
      setSearchParams(searchParams);
    }
  };
  const handleReadBill = (_id: any) => {
    setIDBill(_id);
    openBillDetailModal();
  };
  const handleUpdateBill = (_id: any) => {
    setIDBill(_id);
    openUpdateBillModal();
  };
  const handleVerifyBill = async (_id: any) => {
    const res = await actionBill.VerifyBill({ _id: _id });
    if (res) {
      notifySuccess("Cập nhật đơn thành công !");
    } else notifyError("Xảy ra lỗi vui lòng thử lại !");
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
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
              className={
                params.row.status !== "Cancel"
                  ? "enableButton"
                  : "disableButton"
              }
              onClick={() =>
                params.row.status !== "Cancel"
                  ? handleUpdateBill(params.row._id)
                  : {}
              }
            >
              Cập nhật
            </div>
            <div
              className={!params.row.verify ? "enableButton" : "disableButton"}
              onClick={() =>
                !params.row.verify ? handleVerifyBill(params.row._id) : {}
              }
            >
              Xác minh
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách đơn hàng
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          Trạng thái :
          <label>
            {" "}
            <div>
              <select onChange={handleShowStatus}>
                <option key="0" value="">
                  Tất cả
                </option>

                <option key="1" value="Preparing">
                  Preparing
                </option>
                <option key="2" value="Delivering">
                  Delivering
                </option>
                <option key="3" value="Done">
                  Done
                </option>
                <option key="4" value="Cancel">
                  Cancelled
                </option>
              </select>
            </div>
          </label>
        </div>
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
