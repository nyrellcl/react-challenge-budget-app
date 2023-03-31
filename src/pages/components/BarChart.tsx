import React from "react";
import { Chart } from "chart.js/auto";
import { useState, useRef, useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

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

function BarChart() {
  const [data, setData] = useState<BarChartProps>({
    years: 18,
    initial: 200,
    ROR: 7,
    contribution: 200,
  });

  const [taxData, setTaxData] = useState<Taxes>({
    inflation: 3,
    federal_tax_rate: 25,
    state_tax_rate: 6,
  });
  const [calculatedData, setCalculatedData] = useState<number[]>([]);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [isTaxExpanded, setIsTaxExpanded] = useState<boolean>(false);

  const labels = Array.from({ length: data.years }, (_, i) => `${i + 1}`);

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = {
      years: parseInt(e.currentTarget.YEARS.value),
      initial: parseInt(e.currentTarget.INITIAL.value),
      ROR: parseInt(e.currentTarget.ROR_INVEST.value),
      contribution: parseInt(e.currentTarget.CONTRIBUTION.value),
    };

    const newTaxData = {
      inflation: parseInt(e.currentTarget.INFLATION.value),
      federal_tax_rate: parseInt(e.currentTarget.FEDERAL_TAX.value),
      state_tax_rate: parseInt(e.currentTarget.STATE_TAX.value),
    };

    setTaxData(newTaxData);
    setData(newFormData);
    const calculated: number[] = [];
    for (let i = 1; i <= newFormData.years; i++) {
      const futureValue =
        (newFormData.initial + (i - 1) * newFormData.contribution) *
        Math.pow(1 + newFormData.ROR / 100, i);
      // tax calculation here const taxFutureValue = futureValue *
      calculated.push(parseInt(futureValue.toFixed(2)));
    }
    setCalculatedData(calculated);
    setFutureValue(calculated[calculated.length - 1]);
    e.currentTarget.reset();
  };

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current?.getContext("2d");
    if (!chartCanvas) {
      return;
    }

    const chart = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Investment Amount",
            data: calculatedData,
            borderRadius: 3,
            borderSkipped: false,
            hoverBackgroundColor: "#76B5BC",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, calculatedData]);

  return (
    //user input data section
    <section className="data-chart">
      <form className="data-chart__form" onSubmit={handleDataSubmit}>
        {futureValue && (
          <p className="data-chart__form__plan">
            Your plan produces <strong>${futureValue}</strong> in{" "}
            <strong>{data.years} years</strong>
          </p>
        )}
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
          <label htmlFor="ROR_INVEST">Rate of return:</label>
          <input
            type="number"
            name="ROR_INVEST"
            id="ROR_INVEST"
            defaultValue={data.ROR}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="CONTRIBUTION">Periodic contribution:</label>
          <input
            name="CONTRIBUTION"
            id="CONTRIBUTION"
            defaultValue={data.contribution}
          />
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
      </form>
      <canvas ref={chartRef} width={400} height={400} />
    </section>
  );
}

export default BarChart;
