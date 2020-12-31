import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddeware from "redux-saga";

import gameReducer from "./reducer";
import gameSaga from "./sagas";

const sagaMiddeware = createSagaMiddeware();

const store = createStore(
    gameReducer,
    composeWithDevTools(applyMiddleware(sagaMiddeware))
);

sagaMiddeware.run(gameSaga);

export default store;
