import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, ORDER_ACTION } from "../constants";

const initialState = {
  customerCategoryList: {
    data: [],
    loading: false,
    error: null,
  },
  orderList: {
    data: [],
    loading: false,
    error: null,
  },
  createData: {
    data: {},
    loading: false,
    error: null,
  },
  allOrderList: {
    data: [],
    loading: false,
    error: null,
  },
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      REQUEST(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST),
      (state, action) => {
        return {
          ...state,
          customerCategoryList: {
            ...state.customerCategoryList,
            loading: true,
          },
        };
      }
    )
    .addCase(
      SUCCESS(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST),
      (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          customerCategoryList: {
            ...state.customerCategoryList,
            data,
            loading: false,
          },
        };
      }
    )
    .addCase(FAIL(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST), (state, action) => {
      const { error } = action.payload;
      return {
        state,
        customerCategoryList: {
          ...state.customerCategoryList,
          error,
        },
      };
    })
    //
    .addCase(REQUEST(ORDER_ACTION.GET_ORDER_LIST), (state, action) => {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          loading: true,
        },
      };
    })
    .addCase(SUCCESS(ORDER_ACTION.GET_ORDER_LIST), (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data,
          loading: false,
        },
      };
    })
    .addCase(FAIL(ORDER_ACTION.GET_ORDER_LIST), (state, action) => {
      const { error } = action.payload;
      return {
        state,
        orderList: {
          ...state.orderList,
          error,
        },
      };
    })
    //
    .addCase(REQUEST(ORDER_ACTION.CREATE_ORDER), (state, action) => {
      return {
        ...state,
        createData: {
          ...state.createData,
          loading: true,
        },
      };
    })
    .addCase(SUCCESS(ORDER_ACTION.CREATE_ORDER), (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        createData: {
          ...state.createData,
          data,
          loading: false,
        },
      };
    })
    .addCase(FAIL(ORDER_ACTION.CREATE_ORDER), (state, action) => {
      const { error } = action.payload;
      return {
        state,
        createData: {
          ...state.createData,
          error,
        },
      };
    })
    //
    .addCase(REQUEST(ORDER_ACTION.GET_ALL_ORDER_LIST), (state, action) => {
      return {
        ...state,
        allOrderList: {
          ...state.allOrderList,
          loading: true,
        },
      };
    })
    .addCase(SUCCESS(ORDER_ACTION.GET_ALL_ORDER_LIST), (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        allOrderList: {
          ...state.allOrderList,
          data,
          loading: false,
        },
      };
    })
    .addCase(FAIL(ORDER_ACTION.GET_ALL_ORDER_LIST), (state, action) => {
      const { error } = action.payload;
      return {
        state,
        allOrderList: {
          ...state.allOrderList,
          error,
        },
      };
    })
    //
    .addCase(REQUEST(ORDER_ACTION.CLEAR_ALL_ORDER_LIST), (state, action) => {
      return {
        ...state,
        allOrderList: {
          ...state.allOrderList,
          data: [],
          loading: true,
        },
      };
    });
});

export default orderReducer;
