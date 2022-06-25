import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import SendMailModal from "../../../Components/pages/sale/sendMail";
import useFollow from "../../../store/social";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
];

const FollowerTable = () => {
  const [listFollow, actionFollow] = useFollow();
  const [selected, setSelected] = React.useState<any>([]);
  const [showSendMailModal, setSendMailModal] = React.useState(false);
  const openSendMailModal = () => setSendMailModal(true);
  const closeSendMailModal = () => setSendMailModal(false);
  // const handleChange = (_id: string, enable: boolean) => {
  //   actionDiscount.ChangeStatusDiscount(_id, enable);

  //   listDiscount.data.map((item: any, index: any) => {
  //     if (item._id === _id) item.enable = false;
  //   });
  // };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              // onClick={() => handleChange(params.row._id, params.row.enable)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  const handleSendMail = () => {
    openSendMailModal();
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách người theo dõi
        {selected.length !== 0 ? (
          <a onClick={handleSendMail} className="link">
            Gửi mail theo danh sách
          </a>
        ) : (
          <></>
        )}
      </div>
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          className="datagrid"
          rows={listFollow.data}
          columns={userColumns.concat(actionColumn)}
          pageSize={4}
          rowsPerPageOptions={[4]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows: any = [];
            listFollow.data.map((row) => {
              if (selectedIDs.has(row.id)) selectedRows.push(row.email);
            });
            setSelected(selectedRows);
          }}
        />
      </Box>
      <ContainerModal
        isVisible={showSendMailModal}
        closeModal={closeSendMailModal}
      >
        <SendMailModal closeModal={closeSendMailModal} mails={selected} />
      </ContainerModal>
    </div>
  );
};
export default FollowerTable;
