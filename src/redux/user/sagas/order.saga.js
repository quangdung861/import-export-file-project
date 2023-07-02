import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, ORDER_ACTION } from "../constants";

import { API } from "constants/api";

function* getCustomerCategoryListSaga(action) {
  try {
    const result = yield axios.get(`${API}/customerCategories`);
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    put({
      type: FAIL(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST),
      payload: {
        error,
      },
    });
  }
}

function* getOrderListSaga(action) {
  try {
    const result = yield axios.get(`${API}/orders`, {
      params: {
        _sort: "createdAt",
        _order: "desc",
        _limit: 10,
        _expand: "customerType",

      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error,
      },
    });
  }
}

function* getAllOrderListSaga(action) {
  try {
    const result = yield axios.get(`${API}/orders`, {
      params: {
        _sort: "createdAt",
        _order: "desc",
        _expand: "customerType",
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ALL_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    put({
      type: FAIL(ORDER_ACTION.GET_ALL_ORDER_LIST),
      payload: {
        error,
      },
    });
  }
}

function* createOrderSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`${API}/orders`, {
      ...data,
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.CREATE_ORDER),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(ORDER_ACTION.GET_ORDER_LIST),
    });
    if (callback) yield callback.resetCreateForm();
  } catch (error) {
    put({
      type: FAIL(ORDER_ACTION.CREATE_ORDER),
      payload: {
        error,
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_CUSTOMER_CATEGORY_LIST),
    getCustomerCategoryListSaga
  );
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.CREATE_ORDER), createOrderSaga);
  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_ALL_ORDER_LIST),
    getAllOrderListSaga
  );
}
