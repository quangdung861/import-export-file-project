import { createAction } from "@reduxjs/toolkit";
import { REQUEST, ORDER_ACTION } from "../constants";

export const getCustomerCategoriesAction = createAction(
  REQUEST(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST)
);
export const getOrderListAction = createAction(
  REQUEST(ORDER_ACTION.GET_ORDER_LIST)
);
export const createOrderAction = createAction(
  REQUEST(ORDER_ACTION.CREATE_ORDER)
);
export const getAllOrderListAction = createAction(
  REQUEST(ORDER_ACTION.GET_ALL_ORDER_LIST)
);

export const clearAllorderListAction = createAction(
  REQUEST(ORDER_ACTION.CLEAR_ALL_ORDER_LIST)
);
