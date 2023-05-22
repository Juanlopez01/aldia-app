import { ArcElement, Chart as ChartJS, Legend, Tooltip, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);
interface IOptions {
  type: string, 
  data : any,
  options: any,
}
export function Excess({ options, data }: any) {

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
      className="bg-Blue col-3 rounded-4  text-white containerGraphicosDivExc"
      style={{ width: "350px" }}
    >
      <h2>Excedentes</h2>

      {data.datasets[0].data[0] !== 0 || data.datasets[0].data[1] !== 0 ? (
        <Bar
          options={optionsBar}
          height="250"
          width="250"
          id="in_canva"
          data={data}
        />
      ) : (
        <h2 className="heandingExcedent">No hay registros</h2>
      )}
    </div>
  );
}
