import styled, { css } from "styled-components";
import "_variables.scss";

export const Wrapper = styled.div``;

export const Container = styled.div`
  padding-bottom: 24px;
  .create-order {
    padding: 16px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 16px;
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 500;
      border-radius: 4px;
      user-select: none;
      color: #fff;
      background-color: #98d8aa;
    }
    &__content {
      margin: 24px 0;
      border-radius: 4px;
      background-color: #fff;
      overflow: hidden;
      .nav-option {
        width: 100%;
        background-color: #89cffd;
        .nav-option-list {
          /* width: 100%; */
          display: flex;
          align-items: center;
          flex-direction: row;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          /* max-width: 576px; */
          /* min-width: 576px;
          max-width: 576px; */
          overflow-x: auto;
          &::-webkit-scrollbar {
            -webkit-appearance: none;
          }
          &::-webkit-scrollbar:horizontal {
            height: 0;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 10px;
          }

          &__item {
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-weight: 500;
            text-transform: uppercase;
            white-space: nowrap;
            transition: all 0.2s ease;
            user-select: none;
            color: #fff;
            background-color: transparent;
            cursor: pointer;
            > i {
              margin-right: 8px;
            }
            &:hover {
              color: #89cffd;
              background-color: #fff;
            }
          }
          &__item:first-child {
            border-top-left-radius: 4px;
          }
        }
        .nav-option__item--active {
          color: #89cffd;
          background-color: #fff;
        }
      }

      .form-container {
        > #create-order-form {
          display: flex;
          flex-wrap: wrap;
          padding: 16px 24px;
          > .form-item {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 33.33%;
            margin-bottom: 24px;
            position: relative;
            > label {
              display: flex;
              justify-content: flex-end;
              min-width: 100px;
              padding-left: 8px;
              margin-right: 30px;
              text-align: right;
              user-select: none;
            }
            > .input-value {
              width: 100%;
              max-width: 250px;
              height: 40px;
              padding: 0 12px;
              border: 1px solid var(--border-input-color);
              border-radius: 6px;
              transition: border 0.2s ease;
            }
            > .input-value:focus {
              border: 2px solid #353333;
            }

            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type="number"] {
              -moz-appearance: textfield; /* Firefox */
            }

            .calendar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              user-select: none;
              overflow: hidden;
              > label {
                cursor: pointer;
              }
            }
            .datePicker {
              width: 100%;
            }
            .react-datepicker-wrapper {
              width: 100%;
              .react-datepicker__input-container {
                width: 100%;
                > input {
                  border: none;
                  width: 100%;
                  height: 40px;
                }
              }
            }
            .error-message {
              position: absolute;
              top: 33px;
              right: 0;
              font-size: 13px;
              color: #f33a58;
              margin: 8px 0px 0px 8px;
            }
          }

          .order-id {
            > label {
              .order-id-tooltip {
                display: none;
                padding: 12px;
                text-align: left;
                box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.2);
                z-index: 10;
                position: absolute;
                right: -20px;
                top: 30px;
                width: 300px;
                background-color: #fff;
                border-radius: 6px;
                > p {
                  .fa-circle-check {
                    color: #5d9c59;
                  }
                  .fa-pen {
                    color: #f8cba6;
                  }
                }
              }
              .box-tooltip {
                &:hover {
                  .order-id-tooltip {
                    display: block;
                  }
                }
              }
            }
          }

          > .form-item-customerType {
            user-select: none;
            .container-customerType {
              position: relative;
              > #customerType {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                line-height: 40px;
                cursor: pointer;
              }
              .customer-categories-dropdown {
                z-index: 2;
                position: absolute;
                top: 36px;
                left: 0;
                width: 100%;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0.06);
                box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.03),
                  0 2px 4px 0 rgba(0, 0, 0, 0.03);
                background-color: #fff;
                .category-list {
                  .category-item {
                    height: 32px;
                    line-height: 32px;
                    padding: 0 16px;
                    /* border-bottom: 1px solid var(--boder-dividing-color); */
                    transition: all 0.2s ease;
                    cursor: pointer;
                    &:hover {
                      background-color: #f1f1f1;
                    }
                  }
                }
              }
            }
          }

          .box-action {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            width: 100%;
            margin-top: 16px;
            > .btn-cancel {
              width: 100px;
              line-height: 32px;
              padding: 0 24px;
              background-color: #ffc26f;
            }
            > .btn-create-order {
              width: 100px;
              line-height: 32px;
              padding: 0 24px;
              background-color: #884a39;
            }
          }
        }
        .box-payment {
          width: 100%;
          text-align: right;
          .img-credit-card {
            width: 250px;
            height: auto;
            object-fit: cover;
          }
        }
      }
    }
  }

  .order-list-container {
    margin: 16px;
    border-radius: 6px;
    overflow-x: scroll;
    height:100%;  

    /* overflow:hidden;
    overflow:initial; */

    /* overflow-x: scroll; */

    &::-webkit-scrollbar {
      /* -webkit-appearance: none; */
      height: 11px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 11px;
    }
    &::-webkit-scrollbar-thumb {
      background-image: linear-gradient(to right, #ffa400, #00aefd);
      border-radius: 8px;
    }

    .order-list-content {

   
      width: 1320px;
      margin: 0 auto;

      .order-title-list {
        display: flex;
        height: 52px;
        background-color: #e3e6e9;
        .order-title-item {
          height: 52px;
          line-height: 52px;
          padding: 8px;
          overflow: hidden;
          font-size: inherit;
          font-weight: 500;
          padding-top: 0;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .order-list {
        background-color: #fff;
        width: 100%;
        .order-item {
          display: flex;
          width: 100%;
          border-bottom: 1px solid var(--boder-dividing-color);
          > div {
            height: 52px;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 8px;
            > span {
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .status {
           display: flex;
           justify-content: center;
            .chip-status {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 1.7rem;
              line-height: 1.7rem;
              padding: 0px 0.5rem;
              padding: 2px 16px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              border-radius: 20px;
            }
            .chip-status-trading {
              color: rgb(228, 156, 6);
              border: 1px solid rgb(255, 223, 155);
              background-color: rgb(255, 247, 231);
            }
            .chip-status-finished {
              color: rgb(13, 180, 115);
              border: 1px solid rgb(159, 237, 207);
              background-color: rgb(243, 252, 249);
            }
          }
        }
        .order-item:last-child {
          border-bottom: none;
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .create-order {
      &__content {
        .form-container {
          > #create-order-form {
            > .form-item {
              width: 50%;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .create-order {
      &__content {
        .form-container {
          > #create-order-form {
            > .form-item {
              width: 100%;
              /* margin-right: 60px; */
              margin: 0 0 24px 0;
              justify-content: center;
              > label {
                width: 150px;
                white-space: wrap;
              }
              > input {
                width: 100%;
                max-width: 300px;
              }
            }
            .box-action {
              padding-right: 15%;
            }
          }
          .box-payment {
            > img {
              margin-right: 13%;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .create-order {
      &__content {
        margin: 0;
        .form-container {
          > #create-order-form {
            > .form-item {
              width: 100%;
              margin-right: 0px;
              > label {
              }
              > input {
                width: 100%;
                max-width: 300px;
              }
            }
            .box-action {
              justify-content: flex-end;
              padding-right: 0%;
            }
          }
          .box-payment {
            > img {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
`;
