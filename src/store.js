import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagaCommon";

import orderReducer from "redux/user/reducers/order.reducer";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    orderReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
