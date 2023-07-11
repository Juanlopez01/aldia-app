import { useAppSelector } from "@/src-client/hooks/use-redux";
import {
	Chart as ChartJS,
	Legend,
	Tooltip,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

export function Excess({ options, data , type, totalDataIncomes, totalDataExpenses}: any) {

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


	const reduceIncomes = totalDataIncomes?.reduce((acc: number, val: number)=>acc+val, 0)
	const reduceExpenses = totalDataExpenses?.reduce((acc: number, val: number)=>acc+val, 0)
	const excessResult = reduceIncomes - reduceExpenses

	return (
		<div
			className="bg-link rounded-4 flex flex-col justify-around text-white containerGraphicosDivExc px-4
			w-[350px]"
			
		>
			<div className="text-gray-900">
				<h5>Excedentes</h5>
				<h3>{excessResult>=0 ? `s/ ${excessResult}` : `-s/ ${excessResult*(-1)}`}</h3>
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
				<h2 className="heandingExcedent text-black">No hay registros</h2>
			)}

			<div></div>
		</div>
	);
}
