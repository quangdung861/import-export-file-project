import React, { useContext, useEffect, useRef, useState } from "react";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllorderListAction,
  getAllOrderListAction,
} from "redux/user/actions";
import { exportExcel } from "utils/file";

// import { AgGridReact } from "ag-grid-react";
// import "./styles.scss";
// import "ag-grid-enterprise";

const ModalExportFile = ({ setIsShowOverlayModal, data }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("limit");
  const { allOrderList } = useSelector((state) => state.orderReducer);
  const [dataExport, setDataExport] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "",
      headerName: "Danh sách khách hàng",
      children: [
        { field: "id", headerName: "No.", width: 30 },
        { field: "fullName", headerName: "Tên" },
        { field: "customerType", headerName: "Loại" },
        { field: "address", headerName: "Địa chỉ" },
        { field: "mobilePhoneNumber", headerName: "Số điện thoại" },
        { field: "email", headerName: "Email" },
        { field: "passportId", headerName: "ID/Passport" },
        { field: "status", headerName: "Trạng thái" },
      ],
    },
  ]);

  const gridRef = useRef();
  const exportInfoRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exportInfoRef.current &&
        !exportInfoRef.current.contains(event.target)
      ) {
        setIsShowOverlayModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  useEffect(() => {
    dispatch(getAllOrderListAction());
    return () => dispatch(clearAllorderListAction());
  }, []);

  useEffect(() => {
    if (data && selectedType === "limit") {
      const newData = data.map((item) => {
        return {
          id: item.id,
          fullName: item.fullName,
          customerType: item.customerType,
          address: item.address,
          mobilePhoneNumber: item.mobilePhoneNumber,
          email: item.email,
          passportId: item.passportId,
          status: item.status,
        };
      });
      setDataExport(newData);
      return;
    }

    if (allOrderList && selectedType === "all") {
      const newData = allOrderList.data.map((item) => {
        return {
          id: item.id,
          fullName: item.fullName,
          customerType: item.customerType,
          address: item.address,
          mobilePhoneNumber: item.mobilePhoneNumber,
          email: item.email,
          passportId: item.passportId,
          status: item.status,
        };
      });
      setDataExport(newData);
      return;
    }
  }, [selectedType]);


  const excelStyles = [
    {
      id: "header",
      font: {
        bold: true,
        color: "#0000ff",
      },
    },
  ];

  const columnNames = [
    "STT",
    "Mã",
    "Tên",
    "Loại",
    "Địa chỉ",
    "Số điện thoại di động",
    "Email",
    "PassportID",
    "Trạng thái",
  ];

  const dataArray = dataExport.map((item, index) => {
    return [
      index + 1,
      item.id,
      item.fullName,
      item.customerType,
      item.address,
      item.mobilePhoneNumber,
      item.email,
      item.passportId,
      item.status,
    ];
  });

  const updatedData = [columnNames, ...dataArray];

  let handleOnClickExport = async () => {
    await exportExcel(updatedData, "Danh sách đơn hàng", "orderList");
    setIsShowOverlayModal(false);

    // gridRef.current.api.exportDataAsExcel();
  };

  return (
    <div className="modal-overlay">
      <div style={{ display: "none" }}>
        {/* <AgGridReact
          excelStyles={excelStyles}
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
        /> */}
      </div>
      <div className="container-export-info" ref={exportInfoRef}>
        <div className="export-info">
          <div className="title">
            Xuất file danh sách đơn hàng
            <i
              className="fa-solid fa-xmark"
              onClick={() => setIsShowOverlayModal(false)}
            ></i>
          </div>
          <div className="content">
            <div style={{ fontWeight: 500 }} className="title-name">
              Giới hạn kết quả xuất
            </div>
            <div className="content__item">
              {selectedType === "all" ? (
                <i className="fa-sharp fa-solid fa-circle-check"></i>
              ) : (
                <div
                  className="checkbox-icon"
                  onClick={() => {
                    setSelectedType("all");
                  }}
                ></div>
              )}
              <span
                onClick={() => {
                  setSelectedType("all");
                }}
              >
                Tất cả đơn hàng
              </span>
            </div>
            <div className="content__item">
              {selectedType === "limit" ? (
                <i className="fa-sharp fa-solid fa-circle-check"></i>
              ) : (
                <div
                  className="checkbox-icon"
                  onClick={() => {
                    setSelectedType("limit");
                  }}
                ></div>
              )}
              <span
                onClick={() => {
                  setSelectedType("limit");
                }}
              >
                Đơn hàng trên trang này
              </span>
            </div>
          </div>
          <div className="footer">
            <div
              className="--btn-default btn-cancel"
              onClick={() => setIsShowOverlayModal(false)}
            >
              Thoát
            </div>

            {dataExport[0] && (
              <div
                className="--btn-default btn-export"
                onClick={() => handleOnClickExport()}
              >
                Xuất file
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExportFile;
