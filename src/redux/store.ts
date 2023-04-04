import { combineReducers  } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { dataReducer, taxDataReducer } from "./reducers";

const rootReducer = combineReducers({
    data: dataReducer,
    taxData: taxDataReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store