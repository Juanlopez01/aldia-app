import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model"

interface PropsFilter {
        type: string;
        credit: string;
    }


export const creditFilter = (incomes : IncomeType[], expenses : ExpenseType[], form : PropsFilter) => {
    if(form.type === 'expenses'){
        const filter = expenses.filter((expense : ExpenseType) => {
            let realExpenseCredit 
            if(expense.credit && expense.credit.split(' ')[0] === 'No'){
                realExpenseCredit = expense.credit.split(' ')[0];
            } else if (expense.credit && expense.credit.split(' ')[0] !== 'No'){
                realExpenseCredit = expense.credit.split(' ').slice(0,2).join(' ');
            } else {
                realExpenseCredit = 'No';
            }

            return realExpenseCredit === form.credit
            
        })
        return filter
    } else {
        const filter = incomes.filter((income : IncomeType) => {
            let realExpenseCredit 
            if(income.credit && income.credit.split(' ')[0] === 'No'){
                realExpenseCredit = income.credit.split(' ')[0];
            } else if (income.credit && income.credit.split(' ')[0] !== 'No'){
                realExpenseCredit = income.credit.split(' ').slice(0,2).join(' ');
            } else {
                realExpenseCredit = 'No';
            }

            return realExpenseCredit === form.credit
            
        })
        return filter
    }
}