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
import { Bar } from "react-chartjs-2";
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
export function Excess({ options, data, excess }: any) {
	const optionsBar = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom" as const,
				labels: {
					color: "#747881", // Set the text color to white
					fontColor: "white"
				},
			},
			title: {
				display: false,
			},
			
		},
	};


	return (
		<div
			className="bg-link rounded-4 flex flex-col justify-around text-white containerGraphicosDivExc px-4
			w-[350px]"
			
		>
			<div className="text-gray-900">
				<h5>Excedentes</h5>
				<h3>${excess}</h3>
			</div>

			{data?.datasets[0].data[0] !== 0 || data?.datasets[0].data[1] !== 0 ? (
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

			<div></div>
		</div>
	);
}
