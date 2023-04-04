import { SET_TAX_DATA, SET_DATA } from "./action";

interface BarChartProps {
  years: number;
  initial: number;
  ROR: number;
  contribution: number;
}

interface Taxes {
  inflation: number;
  federal_tax_rate: number;
  state_tax_rate: number;
}

const initialState = {
  data: <BarChartProps>{
    years: 18,
    initial: 200,
    ROR: 7,
    contribution: 200,
  },
  taxData: <Taxes>{
    inflation: 3,
    federal_tax_rate: 25,
    state_tax_rate: 6,
  },
};

export const dataReducer = (
  state = initialState.data,
  action: { type: any; data: number }
) => {
  switch (action.type) {
    case SET_DATA:
      return action.data;
    default:
      return state;
  }
};

export const taxDataReducer = (
  state = initialState.taxData,
  action: { type: any; taxData: number }
) => {
  switch (action.type) {
    case SET_TAX_DATA:
      return action.taxData;
    default:
      return state;
  }
};
