import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IOptions {
  type: string;
  data: any;
  options: any;
}

export function LongExcess({ options, data }: any) {
  const { totalIncomes, totalExpenses } = useSelector(
    (s: any) => s.PersonalReducer
  );
  const excess = totalIncomes - totalExpenses;

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <div
      className="bg-link dark:bg-dark-blue rounded-4 flex flex-col md:flex-row justify-center gap-5 w-full text-white h-[500px] py-8"
      style={{ width: "100%", maxWidth: "100%" }} // Add maxWidth property
    >
      <div className="pl-8 text-gray-900 dark:text-link">
        <h4>Excedentes</h4>
        <h2>${excess}</h2>
      </div>
      
      {data.datasets[0].data.length > 0 ? (
        <Bar
          options={optionsBar}
          height="100%"
          width="100%"
          id="in_canva"
          data={data}
        />
      ) : (
        <h2 className="heandingExcedent">No hay registros</h2>
      )}
    </div>
  );
}