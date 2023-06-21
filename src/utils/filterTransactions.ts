import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";


const monthsNames = ['01', '02', '03', '04', '05','06', '07', '08', '09', '10', '11', '12']
const monthsFullNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export const filterTransactions = (incomes : [IncomeType] | [], expenses : [ExpenseType] | [], range : string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    let filterIncomes 
    let filterExpenses 

    if(incomes && expenses){
        switch (range) {

            case 'Todo':
                filterIncomes = incomes;
                filterExpenses = expenses;
            break;
            case 'Este mes':
                filterIncomes = incomes?.filter((income: IncomeType) => income?.date?.toString().split('-')[1]?.includes(`${monthsNames[month]}`));
                filterExpenses = expenses?.filter((expense: ExpenseType) => expense?.date?.toString()?.split('-')[1]?.includes(`${monthsNames[month]}`));
            break;
            case 'Este año':
                filterIncomes = incomes?.filter((income:IncomeType) => income?.date?.toString().split('-')[0].includes(`${year}`));
                filterExpenses = expenses?.filter((expense:ExpenseType) => expense.date?.toString().split('-')[0].includes(`${year}`));
                break;
            case 'Año pasado': 
                filterIncomes = incomes?.filter((income:IncomeType) => income?.date?.toString().split('-')[0].includes(`${year - 1}`));
                filterExpenses = expenses?.filter((expense:ExpenseType) => expense?.date?.toString().split('-')[0].includes(`${year - 1}`));
                break;
            default : 
                filterIncomes = incomes?.filter((income:IncomeType) => income?.date?.toString()?.split('-')[1]?.includes(`${monthsNames[monthsFullNames.indexOf(range)]}`) && income?.date?.toString()?.split('-')[0]?.includes(`${year}`));
                filterExpenses = expenses?.filter((expense:ExpenseType) => expense?.date?.toString()?.split('-')[1]?.includes(`${monthsNames[monthsFullNames.indexOf(range)]}`) && expense?.date?.toString()?.split('-')[0]?.includes(`${year}`));
            break;
        }
    }
    
    return {filterIncomes, filterExpenses}
}