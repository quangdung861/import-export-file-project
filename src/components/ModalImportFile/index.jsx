import React, { useEffect, useRef, useState } from "react";

import "./styles.scss";

import { exportExcel } from "utils/file";

const ModalImportFile = ({ setIsShowOverlayModal, data }) => {
  const [selectedType, setSelectedType] = useState("all");

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

  const dataArray = data.map((item, index) => {
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

  let handleOnClickExport = async () => {
    await exportExcel(updatedData, "Danh sách khách hàng", "ListCategory");
  };

  return (
    <div className="modal-overlay">
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
            <div
              className="--btn-default btn-export"
              onClick={() => handleOnClickExport()}
            >
              Xuất file
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImportFile;
