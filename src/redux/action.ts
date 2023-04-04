export const SET_DATA = "SET_DATA";
export const SET_TAX_DATA = "SET_TAX_DATA";
export const SET_CALCULATED_DATA = "SET_CALCULATED_DATA";
export const SET_FUTURE_VALUE = "SET_FUTURE_VALUE";

interface BarChartProps {
  years: number;
  initial: number;
  ROR: number;
  contribution: number;
  contributionInterval: string
}

interface Taxes {
  inflation: number;
  federal_tax_rate: number;
  state_tax_rate: number;
}

export const setData = (data: BarChartProps) => ({
  type: SET_DATA,
  data,
});

export const setTaxData = (taxData: Taxes) => ({
  type: SET_TAX_DATA,
  taxData,
});

export const setCalculatedData = (calculatedData: any) => ({
  type: SET_CALCULATED_DATA,
  payload: calculatedData,
});

export const setFutureValueData = (futureValue: number | null) => ({
  type: "SET_FUTURE_VALUE",
  payload: futureValue,
});
