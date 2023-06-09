import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut, Pie } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { TableComponent } from "../../components/Tables/TableComponent";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface IncomeProps {
	type?: string;
	options: object;
	data: any;
	setTableContent: Function;
}
export function Income({
	type,
	options,
	data,
	setTableContent,
	totalDataIncomes,
	totalDataExpenses,
	openModalTable,
}: any) {
	const propsModal = {
		title: "Agregar",
		buttonText: "Agregar",
		type: "income",
	};

	const optionsPlus = {
		...options,
		onClick: function (event: any, elements: any) {
			const slice = {
				type: "ingresos",
				slice: type,
			};
			openModalTable(true);
			setTableContent(slice);
		},
	};

	const { totalIncomes } = useSelector((s: any) => s.PersonalReducer);

	return (
		<div
			className="bg-dark-blue rounded-4  text-white px-4
      w-[350px] pt-2  flex flex-col justify-around py-2"
		>
			<h5>Ingresos</h5>
			<h3>${totalIncomes}</h3>

			{data?.labels?.length ? (
				<div>
					<Pie
						options={optionsPlus}
						height="250"
						width="250"
						id="income_canva"
						data={data}
					/>
				</div>
			) : (
				<h2>No hay registros</h2>
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
