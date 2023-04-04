import { combineReducers  } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { dataReducer, taxDataReducer, calculatedDataReducer, futureValueReducer } from "./reducers";

const rootReducer = combineReducers({
    data: dataReducer,
    taxData: taxDataReducer,
    calculatedData: calculatedDataReducer,
    futureValue: futureValueReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store