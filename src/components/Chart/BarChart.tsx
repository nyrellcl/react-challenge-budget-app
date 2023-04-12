import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
//redux
import { useSelector, useDispatch, Provider } from "react-redux";
import {
  setData,
  setTaxData,
  setCalculatedData,
  setFutureValueData,
} from "../../redux/action";
import store from "../../redux/store";

interface Data {
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
  const data: Data = useSelector((state: any): Data => state.data);
  const taxData: TaxData = useSelector((state: any): TaxData => state.taxData);
  const calculatedData: number[] = useSelector(
    (state: any): number[] => state.calculatedData.calculatedData
  );
  const futureValue: number | null = useSelector(
    (state: any) => state.futureValue
  );
  const dispatch = useDispatch();

  const dataLabels = Array.from({ length: data.years }, (_, i) => `${i + 1}`);

  const calculatedInvestmentAmount: number[] = [];
  let accumulatedContribution = 0;

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData: Data = {
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

    dispatch(setData(newFormData));
    dispatch(setTaxData(newTaxData));

    for (let i = 1; i <= newFormData.years; i++) {
      let contributionInterval = e.currentTarget.CONTRIBUTION_INTERVAL.value;

      switch (newFormData.contributionInterval) {
        case "twoWeeks":
          contributionInterval = newFormData.contribution * 26;
          break;

        case "month":
          contributionInterval = newFormData.contribution * 12;
          break;
        case "year":
          contributionInterval = newFormData.contribution;
          break;
        default:
          break;
      }

      accumulatedContribution += contributionInterval;

      const futureValueCalculation =
        i === 1
          ? (newFormData.initial + accumulatedContribution) *
            Math.pow(1 + newFormData.ROR / 100, i - 1)
          : //calculates amount for subsequent years
            (calculatedInvestmentAmount[i - 2] + contributionInterval) *
            Math.pow(1 + newFormData.ROR / 100, 1);

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
          labels: dataLabels,
          datasets: [
            {
              label: "Investment Amount",
              data: calculatedData,
              borderRadius: 3,
              borderSkipped: false,
            },
            {
              label: "Taxable Amount",

              data: 
              calculatedData.map((value: number, i) => {
                const inflationFactor = Math.pow(
                  1 + taxData.inflation / 100,
                  data.years - i
                );

                const taxableAmount = value / inflationFactor;
                const federalTaxAmount =
                  taxableAmount * (taxData.federal_tax_rate / 100);
                const stateTaxAmount =
                  taxableAmount * (taxData.state_tax_rate / 100);
                const totalTaxAmount = federalTaxAmount + stateTaxAmount;
                const futureValueWithTax: number =
                  value - totalTaxAmount - accumulatedContribution;

                return parseFloat(futureValueWithTax.toFixed(0));
                
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
  }, [data, calculatedData]);

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
            defaultValue={data.years}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="INITIAL">Amount of initial investment:</label>
          <input
            type="number"
            name="INITIAL"
            id="INITIAL"
            defaultValue={data.initial}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="ROR_INVEST">Rate of return %:</label>
          <input
            type="number"
            name="ROR_INVEST"
            id="ROR_INVEST"
            defaultValue={data.ROR}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="CONTRIBUTION">Contribution:</label>
          <input
            name="CONTRIBUTION"
            id="CONTRIBUTION"
            defaultValue={data.contribution}
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
          />

          <label htmlFor="FEDERAL_TAX">Federal marginal tax rate %:</label>
          <input
            name="FEDERAL_TAX"
            id="FEDERAL_TAX"
            type="number"
            defaultValue={taxData.federal_tax_rate}
          />

          <label htmlFor="STATE_TAX">State marginal tax rate %:</label>
          <input
            name="STATE_TAX"
            id="STATE_TAX"
            type="number"
            defaultValue={taxData.state_tax_rate}
          />
        </fieldset>

        <button type="submit" className="data-submit">
          Submit
        </button>
        {futureValue ? (
          <p className="data-chart__form__plan">
            Your plan produces <strong>${futureValue}</strong> in{" "}
            <strong>{data.years} years</strong> if you contributed{" "}
            <strong>
              ${data.contribution} every {data.contributionInterval}
            </strong>
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
