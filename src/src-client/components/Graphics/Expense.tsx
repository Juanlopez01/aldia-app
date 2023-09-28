import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut, Pie } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";
import { useAppSelector } from "@/src-client/hooks/use-redux";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ExpenseProps {
	type?: string;
	options: object;
	data: any;
	setTableContent: Function;
}
export function Expense({
	options,
	data,
	type,
	setTableContent,
	totalDataIncomes,
	totalDataExpenses,
	totalExpenses,
	openModalTable,
}: any) {
	const propsModal = {
		title: "Agregar",
		buttonText: "Agregar",
		type: "expense",
	};

	const optionsPlus = {
		...options,
		onClick: function (event: any, elements: any) {
			const slice = {
				type: "gastos",
				slice: type,
			};
			openModalTable(true);
			setTableContent(slice);
		},
	};

	const reduce = totalDataExpenses?.reduce((acc: number, val: number)=>acc+val, 0)
	let incomeDecimalResult
	if (reduce.toString().includes('.')) {
		const integer = reduce.toString().split('.')[0]
		const decimal = reduce.toString().split('.')[1].slice(0, 2)
		incomeDecimalResult = integer + '.' + decimal
	}

	return (
		<div
			className="bg-link col-3 rounded-4 text-white px-4 py-2 flex flex-col justify-around"
			style={{ width: "350px" }}
		>
			<div className="text-gray-900">
				<h5>Gastos</h5>
				<h3>{reduce>=0 ? `s/ ${reduce.toString().includes('.') ? incomeDecimalResult?.valueOf() : reduce}` : `-s/ ${reduce.toString().includes('.') ? incomeDecimalResult?.valueOf() : reduce}`}</h3>
			</div>
			{data?.labels?.length ? (
				<Pie
					options={optionsPlus}
					height="250"
					width="250"
					id="income_canva"
					data={data}
				/>
			) : (
				<h2 className="heandingExcedent text-black">No hay registros</h2>
			)}
			<ModalAddRegister
				type={type}
				props={propsModal}
				dataIncomes={totalDataIncomes}
				dataExpenses={totalDataExpenses}
			/>
		</div>
	);
}
