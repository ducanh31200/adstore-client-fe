import { Button } from "@mui/material";
import { DataGrid, selectedIdsLookupSelector } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import categoryApi from "../../../api/category/category";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalAddCarousel from "../../../Components/pages/admin/product/AddCarousel";
import ModalAddColor from "../../../Components/pages/admin/product/AddColor";
import ModalApplyDiscountPro from "../../../Components/pages/admin/product/ApplyDiscountPro";
import ModalImportProduct from "../../../Components/pages/admin/product/ImportProduct";
import ModalUpdateColor from "../../../Components/pages/admin/product/UpdateColor";
import useProduct from "../../../store/product";

const userColumns = [
  { field: "id", headerName: "ID", width: 40 },
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
  const [listCategory, setListCategory] = useState<Array<any>>([]);
  const [showAddCarouselModal, setAddCarouselModal] = React.useState(false);
  const openAddCarouselModal = () => setAddCarouselModal(true);
  const closeAddCarouselModal = () => setAddCarouselModal(false);
  const [showAddColorModal, setAddColorModal] = React.useState(false);
  const openAddColorModal = () => setAddColorModal(true);
  const closeAddColorModal = () => setAddColorModal(false);
  const [showUpdateColorModal, setUpdateColorModal] = React.useState(false);
  const openUpdateColorModal = () => setUpdateColorModal(true);
  const closeUpdateColorModal = () => setUpdateColorModal(false);
  const [showApplyDiscountModal, setApplyDiscountModal] = React.useState(false);
  const openApplyDiscountModal = () => setApplyDiscountModal(true);
  const closeApplyDiscountModal = () => setApplyDiscountModal(false);
  const [showImportProductModal, setImportProductModal] = React.useState(false);
  const openImportProductModal = () => setImportProductModal(true);
  const closeImportProductModal = () => setImportProductModal(false);

  const [searchParams, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    (async () => {
      const list = await categoryApi.list();

      setListCategory(list.data.data);
    })();
  }, []);
  const handleShowSpecs = (e: any) => {
    if (e.target.index !== 0) {
      const value = e.target.value;
      if (value !== "") {
        searchParams.set("category", value);
      } else searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };
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

  const handleAddCarousel = (id: string) => {
    setId_product(id);
    openAddCarouselModal();
  };

  const location = useLocation();
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 480,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div
              style={{ textDecoration: "none" }}
              onClick={() => handleImport(params.row.code)}
            >
              <div
                className={params.row.enable ? "viewButton" : "disableButton"}
              >
                Nhập hàng
              </div>
            </div>

            <Link
              to={location.pathname}
              style={{ textDecoration: "none" }}
              onClick={() => handleAddcolor(params.row._id)}
            >
              <div className="viewButton">Danh sách màu</div>
            </Link>
            <Link
              to={location.pathname}
              style={{ textDecoration: "none" }}
              onClick={() => handleAddCarousel(params.row._id)}
            >
              <div className="viewButton">Khuyến mãi</div>
            </Link>
            <Link
              to={`/admin/product/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Sửa</div>
            </Link>
            <div
              className={params.row.enable ? "deleteButton" : "enableButton"}
              onClick={() =>
                handleChangeStatus(params.row._id, params.row.enable)
              }
            >
              {params.row.enable ? "Ngừng bán" : "Bán lại"}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách sản phẩm
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          Loại hàng :
          <label>
            {" "}
            <div>
              <select
                onChange={handleShowSpecs}
                style={{ fontSize: "20px", marginTop: "8px" }}
              >
                <option style={{ fontSize: "20px" }} value="">
                  Tất cả
                </option>
                {listCategory.map((item: any, index: any) => (
                  <option
                    key={index}
                    value={item.name}
                    style={{ fontSize: "20px" }}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <Link
          to={location.pathname}
          className="link"
          onClick={openApplyDiscountModal}
        >
          Áp dụng khuyến mãi
        </Link>
        <Link to="/admin/product/new" className="link">
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
        isVisible={showAddCarouselModal}
        closeModal={closeAddCarouselModal}
      >
        <ModalAddCarousel closeModal={closeAddCarouselModal} _id={id_product} />
      </ContainerModal>
      <ContainerModal
        isVisible={showAddColorModal}
        closeModal={closeAddColorModal}
      >
        <ModalAddColor
          closeModal={closeAddColorModal}
          openUpdateColorModel={openUpdateColorModal}
          _id={id_product}
        />
      </ContainerModal>
      <ContainerModal
        isVisible={showUpdateColorModal}
        closeModal={closeUpdateColorModal}
      >
        <ModalUpdateColor
          closeModal={closeUpdateColorModal}
          openAddColorModel={openAddColorModal}
          _id={id_product}
        />
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
