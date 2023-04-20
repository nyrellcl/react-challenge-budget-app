import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
//redux
import { useSelector, useDispatch, Provider } from "react-redux";
import {
  setInputData,
  setTaxData,
  setCalculatedData,
  setFutureValueData,
} from "../../redux/action";
import store from "../../redux/store";

interface InputData {
  years: number;
  initial: number;
  ROR: number;
  contribution: number;
  contributionInterval: string;
}

interface TaxData {
  inflation: number;
  federal_tax_rate: number;
  state_tax_rate: number;
}

function BarChart() {
  //redux
  const {
    inputData ,
    taxData,
    futureValue,
  }: { inputData: InputData; taxData: TaxData; futureValue: number } = useSelector(
    (state: any) => state
  );

  const calculatedData: number[] = useSelector(
    (state: any): number[] => state.calculatedData.calculatedData
  );

  const dispatch = useDispatch();

  const dataYearLabels = Array.from({ length: inputData.years }, (_, i) => `${i + 1}`);

  const calculatedInvestmentAmount: number[] = [];
  let accumulatedContribution = 0;

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormInputData: InputData = {
      years: parseInt(e.currentTarget.YEARS.value),
      initial: parseInt(e.currentTarget.INITIAL.value),
      ROR: parseInt(e.currentTarget.ROR_INVEST.value),
      contribution: parseInt(e.currentTarget.CONTRIBUTION.value),
      contributionInterval: e.currentTarget.CONTRIBUTION_INTERVAL.value,
    };

    const newTaxData: TaxData = {
      inflation: parseFloat(e.currentTarget.INFLATION.value),
      federal_tax_rate: parseFloat(e.currentTarget.FEDERAL_TAX.value),
      state_tax_rate: parseFloat(e.currentTarget.STATE_TAX.value),
    };

    dispatch(setInputData(newFormInputData));
    dispatch(setTaxData(newTaxData));

    const initialInvestmentAmount = newFormInputData.initial;

    for (let i = 1; i <= newFormInputData.years; i++) {
      let contributionInterval = e.currentTarget.CONTRIBUTION_INTERVAL.value;

      switch (newFormInputData.contributionInterval) {
        case "twoWeeks":
          contributionInterval = newFormInputData.contribution * 26;
          break;

        case "month":
          contributionInterval = newFormInputData.contribution * 12;
          break;
        case "year":
          contributionInterval = newFormInputData.contribution;
          break;
        default:
          break;
      }

      accumulatedContribution += contributionInterval;
      const investmentAmount =
        initialInvestmentAmount * (1 + newFormInputData.ROR / 100) +
        contributionInterval;

      const futureValueCalculation =
        i === 1
          ? //calculates amount for first year
            investmentAmount * Math.pow(1 + newFormInputData.ROR / 100, i - 1)
          : //calculates amount for subsequent years
            (calculatedInvestmentAmount[i - 2] + contributionInterval) *
            +Math.pow(1 + newFormInputData.ROR / 100, 1);

      calculatedInvestmentAmount.push(
        parseInt(futureValueCalculation.toFixed(2))
      );
    }

    dispatch(setCalculatedData(calculatedInvestmentAmount));
    dispatch(
      setFutureValueData(
        calculatedInvestmentAmount[calculatedInvestmentAmount.length - 1]
      )
    );
    e.currentTarget.reset();
  };

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current?.getContext("2d");
    if (!chartCanvas) {
      return;
    }

    if (calculatedData) {
      const chart = new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels: dataYearLabels,
          datasets: [
            {
              label: "Investment Amount",
              data: calculatedData,
              borderRadius: 3,
              borderSkipped: false,
            },
            {
              label: "Taxable Amount",

              data: calculatedData.map((value: number, i) => {
                const inflationFactor = Math.pow(
                  1 + taxData.inflation / 100,
                  inputData.years - i
                );

                const taxableAmount = value / inflationFactor;
                const federalTaxAmount =
                  taxableAmount * (taxData.federal_tax_rate / 100);
                const stateTaxAmount =
                  taxableAmount * (taxData.state_tax_rate / 100);
                const totalTaxAmount = federalTaxAmount + stateTaxAmount;
                const futureValueWithTax: number = value - totalTaxAmount;

                return parseInt(futureValueWithTax.toFixed(0));
              }),
              backgroundColor: "#76B5BC",
              borderRadius: 3,
              borderSkipped: false,
            },
          ],
        },
        options: {
          layout: {
            autoPadding: true,
          },
          plugins: {
            title: {
              display: true,
              text: "Investment Calculation Chart",
            },
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback(tickValue) {
                  return `$${tickValue}`;
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          backgroundColor: "#EC755D",
        },
      });

      return () => {
        chart.destroy();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData, calculatedData]);

  return (
    //user input data section
    <section className="data-chart">
      <form className="data-chart__form" onSubmit={handleDataSubmit}>
        <fieldset>
          <label htmlFor="YEARS">Years to accumulate:</label>
          <input
            name="YEARS"
            id="YEARS"
            type="number"
            defaultValue={inputData.years}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="INITIAL">Amount of initial investment:</label>
          <input
            type="number"
            name="INITIAL"
            id="INITIAL"
            defaultValue={inputData.initial}
            min={0}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="ROR_INVEST">Annual rate of return %:</label>
          <input
            type="number"
            name="ROR_INVEST"
            id="ROR_INVEST"
            defaultValue={inputData.ROR}
            min={0}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="CONTRIBUTION">Contribution:</label>
          <input
            name="CONTRIBUTION"
            id="CONTRIBUTION"
            defaultValue={inputData.contribution}
            min={0}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="CONTRIBUTION_INTERVAL">Contribution Interval:</label>
          <select name="CONTRIBUTION_INTERVAL" id="CONTRIBUTION_INTERVAL">
            <option value="twoWeeks">Every two weeks</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </fieldset>
        <fieldset className="tax-heading">
          <h4>Investment Taxes and Inflation</h4>
        </fieldset>
        <fieldset className="tax-rates">
          <label htmlFor="INFLATION">Expected inflation rate %:</label>
          <input
            name="INFLATION"
            id="INFLATION"
            type="number"
            defaultValue={taxData.inflation}
            min={0}
          />

          <label htmlFor="FEDERAL_TAX">Federal marginal tax rate %:</label>
          <input
            name="FEDERAL_TAX"
            id="FEDERAL_TAX"
            type="number"
            defaultValue={taxData.federal_tax_rate}
            min={0}
          />

          <label htmlFor="STATE_TAX">State marginal tax rate %:</label>
          <input
            name="STATE_TAX"
            id="STATE_TAX"
            type="number"
            defaultValue={taxData.state_tax_rate}
            min={0}
          />
        </fieldset>

        <button type="submit" className="data-submit">
          Submit
        </button>
        {futureValue ? (
          <p className="data-chart__form__plan">
            In <strong>{inputData.years} years</strong>, if you contributed{" "}
            <strong>${inputData.contribution}</strong> every{" "}
            <strong>{inputData.contributionInterval}</strong>, you would accumulate{" "}
            <strong>${futureValue}</strong> before taxes and inflation.
          </p>
        ) : null}
      </form>
      <canvas ref={chartRef} width={400} height={400} />
    </section>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <Provider store={store}>
    {" "}
    <BarChart />{" "}
  </Provider>
);
