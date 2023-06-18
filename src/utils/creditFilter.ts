import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model"

interface PropsFilter {
        type: string;
        credit: string;
    }


export const creditFilter = (incomes : IncomeType[], expenses : ExpenseType[], form : PropsFilter) => {
    if(form.type === 'expenses'){
        const filter = expenses.filter((expense : ExpenseType) => expense.credit === form.credit)
        return filter
    } else {
        const filter = incomes.filter((income : IncomeType) => income.credit === form.credit)
        return filter
    }
}