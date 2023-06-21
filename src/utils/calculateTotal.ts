import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { TotalRegisters } from "@/types/TotalRegister.type";
import { catTransactionsEntries } from "./categoriesTransactions";



export const extractOtherCategories = (incomes: IncomeType[] , expenses:ExpenseType[]): string[] | []=>{
  const otherCategories= new Set<string>();
  const unionIncomeExpenses = [...incomes, ...expenses]
  for(let i = 0; i < unionIncomeExpenses.length; i++) {
    const category = unionIncomeExpenses[i].category
  if(!catTransactionsEntries[(category as  keyof typeof catTransactionsEntries)]){
  otherCategories.add(unionIncomeExpenses[i].category)
  }
  }
  return [...otherCategories]
  }

export const calculateTotal = (data: IncomeType[] | ExpenseType[]): number => {
  let sum = 0;

  data?.forEach((element) => (sum += element.value));

  return sum;
  // return [totalBusiness, totalPersonal];
};

export const calculateExcess = (
  totalIncomes: Array<TotalRegisters>,
  totalExpenses: Array<TotalRegisters>
): Array<TotalRegisters> => {
  const aux: TotalRegisters[] = [];

  totalExpenses.forEach((element) => {
    const find = totalIncomes.find((elem) => {
      if (elem.category === element.category) {
        return elem;
      }
    });

    if (find) {
      aux.push({
        category: element.category,
        total: find.total! - element.total!,
      });
    }
  });

  return aux;
};

export const calculateTotalPerCategory = (
  incomes: IncomeType[] | ExpenseType[]
): Array<TotalRegisters> => {
  const categoryTotals: any = {};

  incomes.forEach((ele) => {
    if (!categoryTotals[ele.category.toLocaleLowerCase()]) {
      categoryTotals[ele.category.toLocaleLowerCase()] = ele.value;
    } else {
      categoryTotals[ele.category.toLocaleLowerCase()] += ele.value;
    }
  });

  const result = Object.entries(categoryTotals).map(
    ([category, total]: any) => {
      return { category: category, total: total };
    }
  );

  return result;
};
