import {
  SET_TAX_DATA,
  SET_DATA,
  SET_CALCULATED_DATA,
  SET_FUTURE_VALUE,
} from "./action";

const initialState = {
  data: {
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
  calculatedData: [],
  futureValue: 0,
};

export const dataReducer = (state = initialState.data, action: any) => {
  switch (action.type) {
    case SET_DATA:
      return action.data;
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
