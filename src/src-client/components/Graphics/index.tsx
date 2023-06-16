import { useState } from "react";
import { TableComponent } from "../Tables/TableComponent";
import { Income } from "./Income";
import { Expense } from "./Expense";
import {
	totalGenerate,
	totalLongExcess,
} from "@/src-client/utilities/totalGenerate";
import { Excess } from "./Excess";
import { options, optionsMobile } from "@/src-client/utilities/graphicsOptions";
import { LongExcess } from "./LongExcess";
import { catTransactions } from "@/utils/categoriesTransactions";
import { filterTransactions } from "@/utils/filterTransactions";
import { datesRange } from "@/utils/dateRange";
import SelectRange from "./selectRange";
import Modal from "@components/generals/Modal";

export interface ContentTable {
	type: string;
	slice: string;
}

export interface graphsProp {
	type: string;
	incomes: [];
	expenses: [];
}


export const Graphics = ({ type, incomes, expenses }: graphsProp) => {
	const [dateRange, setDateRange] = useState('Todo')
	const {filterIncomes, filterExpenses} = filterTransactions(incomes, expenses, dateRange)

	const { IncomesResult, ExpensesResult } = totalGenerate(filterIncomes, filterExpenses);
	const totalIncomes = IncomesResult.totals.reduce((acc, ele) => acc + ele, 0);
	const totalExpenses = ExpensesResult.totals.reduce((acc, ele) => acc + ele, 0);
	const totalExcess = [totalIncomes, totalExpenses];
	const [tableContent, setTableContent] = useState({
		type: "",
		slice: "",
	});


	const dataIncomes = {
		labels: IncomesResult.categories.slice(0, 5),
		datasets: [
			{
				label: "",
				data: IncomesResult.totals.slice(0, 5),
				backgroundColor: IncomesResult.colors.slice(0, 5),
				hoverOffset: 4,
				borderColor: "transparent",
				datalabels: {
					display: false,
				},
			},
		],
	};

	const dataExpenses = {
		labels: ExpensesResult.categories.slice(0, 5),
		datasets: [
			{
				label: "",
				data: ExpensesResult.totals.slice(0, 5),
				backgroundColor: ExpensesResult.colors.slice(0, 5),
				hoverOffset: 4,
				borderColor: "transparent",
				datalabels: {
					display: false,
				},
			},
		],
	};

	const dataExcess = {
		labels: ["Excess"],
		datasets: [
			{
				label: "Income",
				data: [totalExcess[0]],
				backgroundColor: "rgba(75, 192, 192, 0.8)",
				hoverOffset: 4,
			},
			{
				label: "Expense",
				data: [totalExcess[1]],
				backgroundColor: "rgba(255, 99, 132, 0.8)",
				hoverOffset: 4,
			},
		],
	};

	const longExcessData = totalLongExcess(filterIncomes, filterExpenses, IncomesResult.categories.slice(0, 6));
	const dataLongExcess = {
		labels: catTransactions,
		datasets: [
			{
				label: "Ingresos",
				data: longExcessData.incomes,
				backgroundColor: "rgba(75, 192, 192, 0.8)",
				hoverOffset: 4,
			},
			{
				label: "Gastos",
				data: longExcessData.expenses,
				backgroundColor: "rgba(255, 99, 132, 0.8)",
				hoverOffset: 4,
			},
		],
	};

	const [showModalIncome, setShowModalIncome] = useState(false);
	const [showModalChart, setShowModalChart] = useState(false);

	const handleIncomeClick = () => {
		setShowModalIncome(true);
	};

	const handleCloseModal = () => {
		setShowModalIncome(false);
	};

	const handleChartClick = () => {
		setShowModalChart(true);
	};

	return (
		<div
			className="text-center bg-light-green dark:bg-violet-blue-profile pt-12 py-8 w-full overflow-hidden min-h-[80vh] flex flex-col
    	md:items-center pl-4"
		>
			{!incomes || (!expenses && <span className="loader" />)}
			{incomes && expenses && (
				<>

					<div>
						<select name="dateRange" id="dateRange" required defaultValue={'Todo'} onChange={(e) => setDateRange(e.target.value)} >
							{datesRange.map((category) => {
								return <option value={category} key={category}>{category}</option>
							})}
						</select>
					</div>

					{/* desktop charts, options at left */}
					<div
						className="flex-col justify-center flex-wrap md:grid-cols-2 xl:grid-cols-3 place-content-center gap-8
          hidden md:grid"
					>
            <Income
							type={type}
							options={options}
							data={dataIncomes}
							setTableContent={setTableContent}
							totalDataIncomes={IncomesResult.totals}
							totalDataExpenses={ExpensesResult.totals}
							openModalTable={handleIncomeClick}
							className="m-1"
						/>

						<Expense
							type={type}
							options={options}
							data={dataExpenses}
							setTableContent={setTableContent}
							totalDataIncomes={IncomesResult.totals}
							totalDataExpenses={ExpensesResult.totals}
							openModalTable={handleIncomeClick}
							className="m-1"
						/>

						<Excess
							options={options}
							data={dataExcess}
							setTableContent={setTableContent}
							className="m-1"
						/>

						<div
							className="w-full justify-center row-start-3 row-end-4
            col-start-1 md:col-end-3 xl:col-end-4
            "
						>
							<LongExcess
								options={options}
								data={dataLongExcess}
								className="m-1"
								setTableContent={setTableContent}
							/>
						</div>
					</div>

					{/* mobile options at bottom */}
					<div className="flex flex-col md:hidden justify-center flex-wrap place-content-center gap-8">
						<Income
							type={type}
							options={optionsMobile}
							data={dataIncomes}
							setTableContent={setTableContent}
							totalDataIncomes={IncomesResult.totals}
							totalDataExpenses={ExpensesResult.totals}
							openModalTable={handleIncomeClick}
							className="m-1"
						/>

						<Expense
							type={type}
							options={optionsMobile}
							data={dataExpenses}
							setTableContent={setTableContent}
							totalDataIncomes={IncomesResult.totals}
							totalDataExpenses={ExpensesResult.totals}
							openModalTable={handleIncomeClick}
							className="m-1"
						/>

						<Excess
							options={optionsMobile}
							data={dataExcess}
							setTableContent={setTableContent}
							className="m-1"
						/>

						<div
							className="w-full justify-center row-start-3 row-end-4
            col-start-1 md:col-end-3 xl:col-end-4
            "
						>
							<LongExcess
								options={optionsMobile}
								data={dataLongExcess}
								className="m-1"
								setTableContent={setTableContent}
							/>
						</div>
					</div>

					<div className="row mt-2 relative">
						<Modal
							showModal={showModalIncome}
							className="bg-light-green w-fit  rounded shadow-md shadow-black p-4 text-black"
							closeModal={handleCloseModal}
							title="Buscar registro"
						>
							<TableComponent
								content={tableContent.type === "ingresos" ? incomes : expenses}
								filters={tableContent}
							/>
						</Modal>
					</div>
				</>
			)}
		</div>
	);
};
