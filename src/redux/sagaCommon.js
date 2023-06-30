import { fork } from "redux-saga/effects";

import orderSaga from "./user/sagas/order.saga.js";

export default function* rootSaga() {
  yield fork(orderSaga);
}
