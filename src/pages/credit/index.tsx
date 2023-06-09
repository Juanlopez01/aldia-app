import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import SearchBarCredit from "@/src-client/components/credit/SearchBarCredit";
import TableCredit from "@/src-client/components/credit/TableCredit";
import LayoutWithSideNav from "@/src-client/components/layouts/LayoutSideNav";
import { creditFilter } from "@/utils/creditFilter";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Index = () => {
	const incomes: IncomeType[] = useSelector(
		(state: any) => state.PersonalReducer.incomes
	);
	const expenses: ExpenseType[] = useSelector(
		(state: any) => state.PersonalReducer.expenses
	);
	const [filters, setFilters] = useState({
		type: "incomes",
		credit: "Un pago",
	});
	const transactions = creditFilter(incomes, expenses, filters);
	return (
		<LayoutWithSideNav>
			<div className="py-8 px-8 bg-light-green dark:bg-violet-blue-landing w-full min-h-[60vh]">
				<SearchBarCredit filters={filters} setFilters={setFilters} />
				<TableCredit transactions={transactions} type={filters.type} />
			</div>
		</LayoutWithSideNav>
	);
};

export default Index;
