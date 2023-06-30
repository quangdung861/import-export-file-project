import React, { useEffect, useState, useRef, useMemo } from "react";

import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderAction,
  getCustomerCategoriesAction,
  getOrderListAction,
} from "redux/user/actions";

import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ModalExportFile from "components/ModalExportFile";

import cardCredit from "assets/cardCredit.png";
import cardCreditDisable from "assets/cardCreditDisable.jpg";

const OrderPage = () => {
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [passportId, setPassportId] = useState("");
  const [licenseDate, setLicenseDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [customerType, setCustomerType] = useState("Khác");
  const [paymentTerm, setPaymentTerm] = useState("");
  //

  const [isPaymentMethods, setIsPaymentMethods] = useState(false);

  // error

  const [errorFullName, setErrorFullName] = useState("");
  const [errorMobilePhoneNumber, setErrorMobilePhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassportId, setErrorPassportId] = useState("");
  const [errorOrderId, setErrorOrderId] = useState("");

  const [optionSelected, setOptionSelected] = useState("manual");

  const [dataExport, setDataExport] = useState([]);
  console.log("🚀 ~ file: index.jsx:52 ~ OrderPage ~ dataExport:", dataExport);

  const { customerCategoryList, orderList } = useSelector(
    (state) => state.orderReducer
  );
  const [dropdownCargoryCustomer, setDropdownCargoryCustomer] = useState();

  useEffect(() => {
    if (orderList.data) {
      const data = orderList.data.map((item) => {
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

      setDataExport(data);
    }
  }, [orderList]);

  const customerCategoryDropdownRef = useRef(null);

  const [isShowOverlayModal, setIsShowOverlayModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        customerCategoryDropdownRef.current &&
        !customerCategoryDropdownRef.current.contains(event.target)
      ) {
        setDropdownCargoryCustomer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getCustomerCategoriesAction());
    dispatch(getOrderListAction());
  }, []);

  const renderCustomerCategories = () => {
    return customerCategoryList?.data.map((item, index) => {
      return (
        <li
          className="category-item"
          key={index}
          onClick={() => {
            setCustomerType(item.name);
            setDropdownCargoryCustomer(false);
          }}
        >
          <div>{item.name}</div>
        </li>
      );
    });
  };

  useEffect(() => {
    setErrorEmail("");
  }, [email]);

  useEffect(() => {
    setErrorPassportId("");
  }, [passportId]);

  useEffect(() => {
    setErrorOrderId("");
  }, [orderId]);

  // const [initialVlue, setInitialValue] = useState(false);

  useEffect(() => {
    // if (initialVlue) {
    if (fullName !== "") {
      setErrorFullName("");
    } else {
    }
    //
    if (mobilePhoneNumber !== "") {
      setErrorMobilePhoneNumber("");
    } else {
    }
    //
    // }

    // setInitialValue(true);
  }, [fullName, mobilePhoneNumber]);

  useEffect(() => {
    if (bankName && bankAccount) {
      if (bankAccount.length >= 9) {
        setIsPaymentMethods(true);
      } else {
        setIsPaymentMethods(false);
      }
    } else {
      setIsPaymentMethods(false);
    }
  }, [bankAccount, bankName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName === "") {
      setErrorFullName("Bạn chưa nhập tên");
    }
    if (mobilePhoneNumber === "") {
      setErrorMobilePhoneNumber("Bạn chưa nhập SĐT di động");
    }

    if (email) {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        setErrorEmail("Email của bạn không đúng định dạng");
      }
    }

    if (passportId) {
      if (passportId?.length !== 7) {
        setErrorPassportId("ID/Passport của bạn không đúng định dạng");
      }
    }

    if (orderId) {
      const regex = /[a-zA-Z]/;
      const truthy = regex.test(orderId);
      if (!truthy) {
        setErrorOrderId("Mã của bạn phải có ít nhất 1 ký tự chữ");
        return;
      }
    }

    if (
      !errorPassportId &&
      !errorMobilePhoneNumber &&
      !errorEmail &&
      !errorFullName &&
      !errorOrderId &&
      fullName &&
      mobilePhoneNumber
    ) {
      const data = {
        id: orderId,
        fullName,
        dateOfBirth,
        address,
        passportId,
        licenseDate,
        phoneNumber,
        mobilePhoneNumber,
        fax,
        email,
        bankAccount,
        bankName,
        customerType,
        paymentTerm,
        status: "Đang giao dịch",
      };
      dispatch(
        createOrderAction({
          data,
          callback: {
            resetCreateForm: () => {
              setOrderId("");
              setFullName("");
              setDateOfBirth("");
              setAddress("");
              setPassportId("");
              setLicenseDate("");
              setPhoneNumber("");
              setMobilePhoneNumber("");
              setFax("");
              setEmail("");
              setBankAccount("");
              setBankName("");
              setCustomerType("Khác");
              setPaymentTerm("");
            },
          },
        })
      );
    }
  };

  // console.log(
  //   "🚀 ~ file: index.jsx:78 ~ OrderPage ~ startDate:",
  //   moment(startDate).format("DD/MM/YYYY")
  // );

  const renderOrderList = useMemo(() => {
    return orderList.data.map((item) => {
      return (
        <div className="order-item" key={item.id}>
          <div
            className="order-id"
            style={{ width: "120px", color: "#0088FF" }}
          >
            <span title={item.id}>{item.id}</span>
          </div>
          <div className="fullName" style={{ width: "180px" }}>
            <span title={item.fullName}>{item.fullName}</span>
          </div>
          <div className="category" style={{ width: "160px" }}>
            <span title={item.customerType}>{item.customerType}</span>
          </div>
          <div className="address" style={{ width: "180px" }}>
            <span title={item.address}> {item.address}</span>
          </div>
          <div className="phone-number" style={{ width: "160px" }}>
            <span title={item.mobilePhoneNumber}>{item.mobilePhoneNumber}</span>
          </div>
          <div className="email" style={{ width: "180px" }}>
            <span title={item.email}>{item.email}</span>
          </div>
          <div className="passport-id" style={{ width: "160px" }}>
            <span title={item.passportId}>{item.passportId}</span>
          </div>
          <div className="status" style={{ width: "160px" }}>
            <div
              className={
                item.status === "Đang giao dịch"
                  ? "chip-status chip-status-trading"
                  : item.status === "Hoàn thành" &&
                    "chip-status chip-status-finished"
              }
            >
              <span title={item.status}>{item.status}</span>
            </div>
          </div>
        </div>
      );
    });
  }, [orderList.data]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 7) {
      setPassportId(value);
    }
  };

  const handleChangePhoneNumber = (event) => {
    const value = event.target.value;
    if (value.length <= 16) {
      setPhoneNumber(value);
    }
  };

  const handleChangeMobilePhoneNumber = (event) => {
    const value = event.target.value;
    if (value.length <= 11) {
      setMobilePhoneNumber(value);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <div className="create-order">
          <div className="create-order__header">
            <div className="left">Thêm mới</div>
            <div className="right">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="create-order__content">
            <div className="nav-option">
              <div
                className={
                  optionSelected === "manual"
                    ? "nav-option__item  nav-option__item--active"
                    : "nav-option__item "
                }
                onClick={() => setOptionSelected("manual")}
              >
                <i className="fa-solid fa-check"></i>
                Thêm mới
              </div>
              <div
                className={
                  optionSelected === "import"
                    ? "nav-option__item  nav-option__item--active"
                    : "nav-option__item "
                }
                onClick={() => {
                  setOptionSelected("import");
                }}
              >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                Nhập file
              </div>
              <div
                className={
                  optionSelected === "export"
                    ? "nav-option__item  nav-option__item--active"
                    : "nav-option__item "
                }
                onClick={() => {
                  setOptionSelected("export");
                  setIsShowOverlayModal(true);
                }}
              >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                Xuất file
              </div>
            </div>
            <div className="form-container">
              {optionSelected === "manual" && (
                <>
                  <form
                    id="create-order-form"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="form-item order-id">
                      <label
                        htmlFor="orderId"
                        // style={{ display: "flex", alignItem: "center", gap: 10 }}
                      >
                        Mã:{" "}
                        <span className="box-tooltip">
                          <i
                            className="fa-solid fa-circle-info"
                            style={{
                              marginLeft: "10px",
                              marginTop: "4px",
                              color: "#ccc",
                              cursor: "pointer",
                            }}
                          ></i>
                          <div className="order-id-tooltip">
                            <p>
                              <i className="fa-solid fa-circle-check"></i> Mã
                              đơn hàng được hệ thống khởi tạo tự động nếu bạn để
                              trống trường này
                            </p>
                            <p>
                              <i className="fa-solid fa-pen"></i> Nếu là mã của
                              bạn phải luôn có ít nhất 1 ký tự chữ VD: SON001
                            </p>
                          </div>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="orderId"
                        className="input-value"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        autoComplete="off"
                      />
                      <span className="error-message">{errorOrderId}</span>
                    </div>
                    <div className="form-item">
                      <label htmlFor="fullName">
                        Tên &nbsp;<span style={{ color: "#f33a58" }}> * </span>:
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="input-value"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="off"
                      />
                      <span className="error-message">{errorFullName}</span>
                    </div>
                    <div className="form-item">
                      <label>Ngày sinh:</label>

                      <div className="input-value calendar">
                        <DatePicker
                          locale={vi}
                          selected={dateOfBirth}
                          id="dateOfBirth"
                          className="input-value"
                          wrapperClassName="datePicker"
                          onChange={(date) => setDateOfBirth(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText={`${moment().format("DD/MM/YYYY")}`}
                          autoComplete="off"
                        />
                        <label htmlFor="dateOfBirth">
                          <i
                            className="fa-regular fa-calendar"
                            styles={{ position: "absolute" }}
                          ></i>
                        </label>
                      </div>
                    </div>
                    <div className="form-item">
                      <label htmlFor="address">Địa chỉ:</label>
                      <input
                        type="text"
                        id="address"
                        className="input-value"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        autoComplete="off"
                        maxLength="100"
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="passportId">ID/Passport:</label>
                      <input
                        id="passportId"
                        className="input-value"
                        value={passportId}
                        onChange={handleChange}
                        placeholder="9999999"
                        autoComplete="off"
                        type="number"
                      />
                      <span className="error-message">{errorPassportId}</span>
                    </div>
                    <div className="form-item">
                      <label>Ngày cấp:</label>
                      {/* <input
                      type="text"
                      id="licenseDate"
                      className="input-value"
                      onChange={(e) => setLicenseDate(e.target.value)}
                    /> */}
                      <div className="input-value calendar">
                        <DatePicker
                          locale={vi}
                          selected={licenseDate}
                          id="licenseDate"
                          className="input-value"
                          wrapperClassName="datePicker"
                          onChange={(date) => setLicenseDate(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText={`${moment().format("DD/MM/YYYY")}`}
                          autoComplete="off"
                        />
                        <label htmlFor="licenseDate">
                          <i
                            className="fa-regular fa-calendar"
                            styles={{ position: "absolute" }}
                          ></i>
                        </label>
                      </div>
                    </div>

                    <div className="form-item">
                      <label htmlFor="phoneNumber">Điện thoại:</label>
                      <input
                        type="number"
                        id="phoneNumber"
                        className="input-value"
                        value={phoneNumber}
                        onChange={handleChangePhoneNumber}
                        autoComplete="off"
                        maxLength="20"
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="mobilePhoneNumber">
                        Di động &nbsp;
                        <span style={{ color: "#f33a58" }}> * </span>:
                      </label>
                      <input
                        id="mobilePhoneNumber"
                        className="input-value"
                        value={mobilePhoneNumber}
                        onChange={handleChangeMobilePhoneNumber}
                        autoComplete="off"
                        type="number"
                      />
                      <span className="error-message">
                        {errorMobilePhoneNumber}
                      </span>
                    </div>
                    <div className="form-item">
                      <label htmlFor="fax">Fax:</label>
                      <input
                        type="text"
                        id="fax"
                        className="input-value"
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                        autoComplete="off"
                        maxLength="30"
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        id="email"
                        className="input-value"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="abc@gmail.com"
                        autoComplete="off"
                        maxLength="100"
                      />
                      <span className="error-message">{errorEmail}</span>
                    </div>
                    <div className="form-item">
                      <label htmlFor="bankAccount">Tài khoản ngân hàng:</label>
                      <input
                        type="number"
                        id="bankAccount"
                        className="input-value"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        placeholder="03111xxxx"
                        autoComplete="off"
                        maxLength="100"
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="bankName">Tên ngân hàng:</label>
                      <input
                        type="text"
                        id="bankName"
                        className="input-value"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Vietcombank,ACB,..."
                        autoComplete="off"
                        maxLength="160"
                      />
                    </div>
                    <div className="form-item form-item-customerType">
                      <label>Loại Khách Hàng:</label>
                      <div className="container-customerType input-value">
                        <div
                          id="customerType"
                          onClick={() =>
                            setDropdownCargoryCustomer(!dropdownCargoryCustomer)
                          }
                        >
                          {customerType}
                          <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        {dropdownCargoryCustomer && (
                          <div
                            className="customer-categories-dropdown"
                            ref={customerCategoryDropdownRef}
                          >
                            <ul className="category-list">
                              {renderCustomerCategories()}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-item">
                      <label htmlFor="paymentTerm">Hạn thanh toán:</label>
                      <input
                        type="text"
                        id="paymentTerm"
                        className="input-value"
                        value={paymentTerm}
                        onChange={(e) => setPaymentTerm(e.target.value)}
                        autoComplete="off"
                        maxLength="100"
                      />
                    </div>

                    <div className="box-action">
                      <button className="--btn-default btn-cancel">
                        Thoát
                      </button>
                      <button className=" --btn-default btn-create-order">
                        Lưu
                      </button>
                    </div>
                  </form>
                  <div className="box-payment">
                    <img
                      className="img-credit-card"
                      src={isPaymentMethods ? cardCredit : cardCreditDisable}
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="order-list-container">
          <div className="order-list-content">
            <div className="order-title-list">
              <div className="order-title-item" style={{ width: "120px" }}>
                Mã đơn hàng
              </div>
              <div className="order-title-item" style={{ width: "180px" }}>
                Tên khách hàng
              </div>
              <div className="order-title-item" style={{ width: "160px" }}>
                Loại
              </div>
              <div className="order-title-item" style={{ width: "180px" }}>
                Địa chỉ
              </div>
              <div className="order-title-item" style={{ width: "160px" }}>
                Số điện thoại
              </div>
              <div className="order-title-item" style={{ width: "180px" }}>
                Email
              </div>
              <div className="order-title-item" style={{ width: "160px" }}>
                ID/ Passport
              </div>
              <div className="order-title-item" style={{ width: "160px" }}>
                Trạng thái
              </div>
            </div>
            <div className="order-list">{renderOrderList}</div>
          </div>
        </div>

        {isShowOverlayModal && (
          <ModalExportFile
            setIsShowOverlayModal={setIsShowOverlayModal}
            // data={{
            //   id: orderList.data.id,
            //   fullName: orderList.data.fullName,
            //   customerType: orderList.data.customerType,
            //   address: orderList.data.address,
            //   phoneNumber: orderList.data.phoneNumber,
            //   email: orderList.data.email,
            //   passportId: orderList.data.passportId,
            //   status: orderList.data.status,
            // }}
            data={dataExport}
          />
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderPage;
