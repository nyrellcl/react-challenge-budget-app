import React from "react";
import { Chart } from "chart.js/auto";
import { useState, useRef, useEffect } from "react";

interface BarChartProps {
  years: number;
  initial: number;
  ROR: number;
  contribution: number;
}

function BarChart() {
  const [data, setData] = useState<BarChartProps>({
    years: 18,
    initial: 200,
    ROR: 7,
    contribution: 200,
  });
  const [calculatedData, setCalculatedData] = useState<number[]>([]);
  const [futureValue, setFutureValue] = useState<number | null>(null);

  const labels = Array.from({ length: data.years }, (_, i) => `${i + 1}`);

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = {
      years: parseInt(e.currentTarget.YEARS.value),
      initial: parseInt(e.currentTarget.INITIAL.value),
      ROR: parseInt(e.currentTarget.ROR_INVEST.value),
      contribution: parseInt(e.currentTarget.CONTRIBUTION.value),
    };
    setData(newFormData);
    const calculated: number[] = [];
    for (let i = 1; i <= newFormData.years; i++) {
      const futureValue =
        (newFormData.initial + (i - 1) * newFormData.contribution) *
        Math.pow(1 + newFormData.ROR / 100, i);
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
            label: "Calculated Data",
            data: calculatedData,
            borderRadius: 3,
            borderSkipped: false,
            hoverBackgroundColor: "#76B5BC"
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        backgroundColor: "#EC755D"
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
      <form onSubmit={handleDataSubmit}>
        {futureValue && <p>Your plan produces ${futureValue}.</p>}
        <fieldset>
          <label htmlFor="YEARS">Years to accumulate:</label>
          <input name="YEARS" id="YEARS" type="number" defaultValue={data.years} />
        </fieldset>

        <fieldset>
          <label htmlFor="INITIAL">Amount of initial investment:</label>
          <input type="number" name="INITIAL" id="INITIAL" defaultValue={data.initial} />
        </fieldset>

        <fieldset>
          <label htmlFor="ROR_INVEST">Rate of return:</label>
          <input type="number" name="ROR_INVEST" id="ROR_INVEST" defaultValue={data.ROR} />
        </fieldset>

        <fieldset>
          <label htmlFor="CONTRIBUTION">Periodic contribution:</label>
          <input name="CONTRIBUTION" id="CONTRIBUTION" defaultValue={data.contribution}/>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <canvas ref={chartRef} width={400} height={400} />
    </section>
  );
}

export default BarChart;
