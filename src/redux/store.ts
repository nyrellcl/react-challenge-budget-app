import { combineReducers  } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { inputDataReducer, taxDataReducer, calculatedDataReducer, futureValueReducer } from "./reducers";

const rootReducer = combineReducers({
    inputData: inputDataReducer,
    taxData: taxDataReducer,
    calculatedData: calculatedDataReducer,
    futureValue: futureValueReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store