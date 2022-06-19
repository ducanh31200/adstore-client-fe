import { DataGrid, selectedIdsLookupSelector } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalAddColor from "../../../Components/pages/admin/product/AddColor";
import ModalApplyDiscountPro from "../../../Components/pages/admin/product/ApplyDiscountPro";
import ModalApplyDiscount from "../../../Components/pages/admin/product/ApplyDiscountPro";
import ModalImportProduct from "../../../Components/pages/admin/product/ImportProduct";
import useProduct from "../../../store/product";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "code", headerName: "Code", width: 120 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
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
    field: "color",
    headerName: "Màu",
    width: 250,
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
    field: "sold",
    headerName: "Đã bán",
    width: 80,
  },
  {
    field: "total_rate",
    headerName: "Đánh giá",
    width: 80,
  },
  {
    field: "enable",
    headerName: "Trạng thái",
    width: 140,
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
  const [id_product, setId_product] = React.useState("");
  const [selected, setSelected] = React.useState<any>([]);
  const [code, setCode] = React.useState("");
  const [showAddColorModal, setAddColorModal] = React.useState(false);
  const openAddColorModal = () => setAddColorModal(true);
  const closeAddColorModal = () => setAddColorModal(false);
  const [showApplyDiscountModal, setApplyDiscountModal] = React.useState(false);
  const openApplyDiscountModal = () => setApplyDiscountModal(true);
  const closeApplyDiscountModal = () => setApplyDiscountModal(false);
  const [showImportProductModal, setImportProductModal] = React.useState(false);
  const openImportProductModal = () => setImportProductModal(true);
  const closeImportProductModal = () => setImportProductModal(false);

  const handleChangeStatus = (id: string, enable: boolean) => {
    actionProduct.ChangeStatusProduct(id, enable);
  };
  const handleImport = (code: string) => {
    setCode(code);
    openImportProductModal();
  };
  const handleAddcolor = (id: string) => {
    setId_product(id);
    openAddColorModal();
  };

  const location = useLocation();
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 350,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <Link
              to={location.pathname}
              style={{ textDecoration: "none" }}
              onClick={() => handleImport(params.row.code)}
            >
              <div className="viewButton">Nhập hàng</div>
            </Link>
            <Link
              to={location.pathname}
              style={{ textDecoration: "none" }}
              onClick={() => handleAddcolor(params.row._id)}
            >
              <div className="viewButton">Thêm màu</div>
            </Link>
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="updateButton">Sửa</div>
            </Link>
            <div
              className={params.row.enable ? "deleteButton" : "enableButton"}
              onClick={() =>
                handleChangeStatus(params.row._id, params.row.enable)
              }
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
        Product
        <Link
          to={location.pathname}
          className="link"
          style={{ marginLeft: "auto" }}
          onClick={openApplyDiscountModal}
        >
          Áp dụng khuyến mãi
        </Link>
        <Link to="/product/new" className="link">
          Thêm sản phẩm
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={listProduct.data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows: any = [];
          listProduct.data.map((row) => {
            if (selectedIDs.has(row.id)) selectedRows.push(row._id);
          });
          setSelected(selectedRows);
        }}
      />
      <ContainerModal
        isVisible={showAddColorModal}
        closeModal={closeAddColorModal}
      >
        <ModalAddColor closeModal={closeAddColorModal} _id={id_product} />
      </ContainerModal>
      <ContainerModal
        isVisible={showApplyDiscountModal}
        closeModal={closeApplyDiscountModal}
      >
        <ModalApplyDiscountPro
          closeModal={closeApplyDiscountModal}
          products={selected}
        />
      </ContainerModal>
      <ContainerModal
        isVisible={showImportProductModal}
        closeModal={closeImportProductModal}
      >
        <ModalImportProduct closeModal={closeImportProductModal} code={code} />
      </ContainerModal>
    </div>
  );
};
export default ProductTable;
