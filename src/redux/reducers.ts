import {
  SET_TAX_DATA,
  SET_INPUT_DATA,
  SET_CALCULATED_DATA,
  SET_FUTURE_VALUE,
} from "./action";

const initialState = {
  inputData: {
    years: 18,
    initial: 200,
    ROR: 7,
    contribution: 200,
  },
  taxData: {
    inflation: 3,
    federal_tax_rate: 25,
    state_tax_rate: 6,
  },
  calculatedData:[],
  futureValue: 0,
};

export const inputDataReducer = (state = initialState.inputData, action: any) => {
  switch (action.type) {
    case SET_INPUT_DATA:
      return action.inputData;
    default:
      return state;
  }
};

export const taxDataReducer = (state = initialState.taxData, action: any) => {
  switch (action.type) {
    case SET_TAX_DATA:
      return action.taxData;
    default:
      return state;
  }
};

export const calculatedDataReducer = (
  state: number[] = initialState.calculatedData,
  action: any
) => {
  switch (action.type) {
    case SET_CALCULATED_DATA:
      return {
        ...state,
        calculatedData: action.payload,
      };
    case SET_FUTURE_VALUE:
      return {
        ...state,
        futureValue: action.payload,
      };
    default:
      return state;
  }
};

export const futureValueReducer = (
  state: number | null = initialState.futureValue,
  action: any
) => {
  switch (action.type) {
    case SET_FUTURE_VALUE:
      return action.payload;
    default:
      return state;
  }
};
