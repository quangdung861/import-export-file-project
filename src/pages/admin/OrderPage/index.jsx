import React, { useEffect, useState, useRef, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import * as S from "./styles";

import {
  createOrderAction,
  getCustomerCategoriesAction,
  getOrderListAction,
} from "redux/user/actions";

import ModalExportFile from "components/ModalExportFile";
import cardCredit from "assets/cardCredit.png";
import cardCreditDisable from "assets/cardCreditDisable.jpg";
import { importExcel } from "utils/file";

const OrderPage = () => {
  const dispatch = useDispatch();

  const [rangescroll, setrangescroll] = useState(0);

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

  // error
  const [errorFullName, setErrorFullName] = useState("");
  const [errorMobilePhoneNumber, setErrorMobilePhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassportId, setErrorPassportId] = useState("");
  const [errorOrderId, setErrorOrderId] = useState("");
  //
  const [messageErrorImport, setMessageErrorImport] = useState("");
  const [optionSelected, setOptionSelected] = useState("manual");
  const [isPaymentMethods, setIsPaymentMethods] = useState(false);

  const { customerCategoryList, orderList, allOrderList } = useSelector(
    (state) => state.orderReducer
  );
  const [dropdownCargoryCustomer, setDropdownCargoryCustomer] = useState();

  const customerCategoryDropdownRef = useRef(null);

  const [isShowOverlayModal, setIsShowOverlayModal] = useState(false);
  const [isShowOverlayModalImport, setIsShowOverlayModalImport] =
    useState(false);

  useEffect(() => {
    setMessageErrorImport("");
  }, [optionSelected]);

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
    dispatch(getOrderListAction({ limit: 3 }));
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

  const [hasMore, setHasMore] = useState(true);

  const [limitOrderList, setLimitOrderList] = useState(3);

  const fetchMoreData = () => {
    console.log("ahihi");
    if (orderList.data.length < orderList.meta.total) {
      setLimitOrderList(limitOrderList + 3);
      dispatch(getOrderListAction({ limit: limitOrderList + 3 }));
    } else {
      setHasMore(false);
    }
  };

  const renderOrderList = useMemo(() => {
    return orderList.data.map((item) => {
      return (
        <tr key={item.id} className="order-item">
          <td className="order-id" style={{ color: "#0088FF" }}>
            <span title={item.id}>{item.id}</span>
          </td>
          <td className="fullName">
            <span title={item.fullName}>{item.fullName}</span>
          </td>
          <td className="category">
            <span title={item.customerType}>{item.customerType}</span>
          </td>
          <td className="address">
            <span title={item.address}> {item.address}</span>
          </td>
          <td className="phone-number">
            <span title={item.mobilePhoneNumber}>{item.mobilePhoneNumber}</span>
          </td>
          <td className="status">
            <span
              className={
                item.status === "Đang giao dịch"
                  ? "chip-status chip-status-trading"
                  : item.status === "Hoàn thành"
                  ? "chip-status chip-status-finished"
                  : {}
              }
            >
              <span title={item.status}>{item.status}</span>
            </span>
          </td>
          <td className="email">
            <span title={item.email}>{item.email}dsadsadsadsadsa</span>
          </td>
          <td className="passport-id">
            <span title={item.passportId}>{item.passportId}</span>
          </td>
        </tr>
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    importExcel(file)
      .then((jsonData) => {
        // Xử lý dữ liệu từ file Excel
        const formattedDataRef = jsonData.map((item, index) => {
          if (index > 0) {
            console.log(item[1]);
            return {
              dateOfBirth: "",
              licenseDate: "",
              phoneNumber: "",
              fax: "",
              paymentTerm: "",

              id: item[1] || "",
              fullName: item[2] || "",
              customerType: item[3] ? parseInt(item[3]) : "",
              address: item[4] || "",
              mobilePhoneNumber: item[5].toString() || "",
              email: item[6] || "",
              passportId: item[7] || "",
              status: item[8] || "Đang giao dịch",
            };
          }
        });

        const formattedData = [...formattedDataRef].slice(2);

        // Xử lý dữ liệu đã chuyển đổi
        // setImportData(formattedData);

        let truthy = true;

        formattedData.forEach((item) => {
          if (item.fullName === "") {
            console.log(item.fullName);
            truthy = false;
          }
          if (item.mobilePhoneNumber === "") {
            truthy = false;
          }

          if (item.email !== "") {
            const emailRegex =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(email)) {
              truthy = false;
            }
          }

          if (item.passportId !== "") {
            if (passportId?.length !== 7) {
              truthy = false;
            }
          }

          if (item.id !== "") {
            const regex = /[a-zA-Z]/;
            const istrue = regex.test(item.id);
            if (!istrue) {
              truthy = false;
            }
          }
        });

        if (truthy) {
          formattedData.forEach((item, index) => {
            dispatch(
              createOrderAction({
                data: formattedData[index],
              })
            );
          });
          setMessageErrorImport("Nhập tệp thành công");
        } else {
          setMessageErrorImport(
            "Tệp không đúng định dạng, hoặc sai kiểu dữ liệu"
          );
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  };

  // const handleInputChange = (e) => {
  //   setrangescroll(parseFloat(e.target.value));
  // };

  // const handleMouseUp = () => {
  //   setrangescroll(Math.round(rangescroll / 0.0001) * 0.0001); // Làm tròn giá trị cho phù hợp với bước nhảy 0.0001
  // };

  const containerRef = useRef(null);
  const [scrollbarValue, setScrollbarValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const value = containerRef.current.scrollLeft;
        setScrollbarValue(value);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = document.querySelector(".order-list-content")?.offsetWidth;
      setWindowWidth(width);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <div className="nav-option-list">
                <div
                  className={
                    optionSelected === "manual"
                      ? "nav-option-list__item  nav-option-list__item--active"
                      : "nav-option-list__item "
                  }
                  onClick={() => setOptionSelected("manual")}
                >
                  <i className="fa-solid fa-check"></i>
                  Thêm mới
                </div>
                <div
                  className={
                    optionSelected === "import"
                      ? "nav-option-list__item  nav-option-list__item--active"
                      : "nav-option-list__item "
                  }
                  onClick={() => setOptionSelected("import")}
                >
                  <label
                    htmlFor="inputFileAvatar"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="fa-solid fa-cloud-arrow-up"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Nhập file
                  </label>
                  <input
                    type="file"
                    id="inputFileAvatar"
                    className="custom-file-input"
                    // onChange={(e) => handleAvatarImage(e.target.files[0])}
                    accept=".xlsx"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div
                  className={
                    optionSelected === "export"
                      ? "nav-option-list__item  nav-option-list__item--active"
                      : "nav-option-list__item "
                  }
                  onClick={() => {
                    setOptionSelected("export");
                    setIsShowOverlayModal(true);
                  }}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Xuất file
                </div>
                <a
                  className="nav-option-list__item"
                  href="https://drive.google.com/uc?export=download&id=1rcr7Eionhat1_ePMzT8haxujWbhd7cSc"
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Tải file mẫu
                </a>
              </div>
            </div>
            <div
              style={
                messageErrorImport === "Nhập tệp thành công"
                  ? { color: "#98D8AA", paddingLeft: "8px" }
                  : { color: "#f33a58", paddingLeft: "8px" }
              }
            >
              {messageErrorImport}
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
                      <button
                        type="button"
                        className="--btn-default btn-cancel"
                      >
                        Thoát
                      </button>
                      <button
                        type="submit"
                        className=" --btn-default btn-create-order"
                      >
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
            <InfiniteScroll
              dataLength={orderList.data.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p>You have seen all the data.</p>}
              style={{ overflow: "hidden" }}
            >
              <table
                id="table"
                style={{ transform: `translateX(-${scrollbarValue}px)` }}
              >
                <thead>
                  <tr className="order-title-list">
                    <th className="order-title-item codeId">Mã đơn hàng</th>
                    <th className="order-title-item full-name">
                      Tên khách hàng
                    </th>
                    <th className="order-title-item category">Loại</th>
                    <th className="order-title-item address">Địa chỉ</th>
                    <th className="order-title-item phone-number">
                      Số điện thoại
                    </th>
                    <th className="order-title-item status">Trạng thái</th>
                    <th className="order-title-item email">Email</th>
                    <th className="order-title-item passportId">
                      ID/ Passport
                    </th>
                  </tr>
                </thead>
                <tbody className="order-list">{renderOrderList}</tbody>
              </table>
            </InfiniteScroll>
          </div>
          <div
            className="scrollbar-container"
            ref={containerRef}
            style={{
              width: windowWidth,
              height: "20px",
            }}
          >
            <div
              className="scrollbar-x"
              style={{
                width: document.querySelector("#table")?.offsetWidth,
                height: "20px",
              }}
            ></div>
            <div style={{ color: "red" }}>dsadsaihfashflabshnfsa</div>
          </div>
        </div>
        {/* <input
          id="range"
          type="range"
          onChange={(e) => setrangescroll(e.target.value)}
          // onMouseUp={handleMouseUp}
          min="0"
          max="100"
          step="0.000001"
          value={rangescroll}
          style={{ position: "fixed", bottom: "8px" }}
        /> */}

        {isShowOverlayModal && (
          <ModalExportFile
            setIsShowOverlayModal={setIsShowOverlayModal}
            data={orderList.data}
          />
        )}
        {/* {isShowOverlayModalImport && (
          <ModalImportFile
            setIsShowOverlayModal={setIsShowOverlayModal}
            data={dataExport}
          />
        )} */}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderPage;
