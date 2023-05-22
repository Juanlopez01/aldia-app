import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { FormType } from "@/src-client/components/Modals/FormAddRegister";

export const isValidExpense = (
  totalIncomes: any[],
  totalExpenses: any[],
  form: FormType,
  type: string
) => {
  //
  const index = type === "negocio" ? 0 : 1;

  if (index === 0) {
    const totalExp = totalExpenses.reduce((acc, ele) => acc + ele, 0);
    const totalInc = totalIncomes.reduce((acc, ele) => acc + ele, 0);
    if (totalExp > totalInc) {
      return "Tus egresos van a superar a tus ingresos";
    }
    return false;
  }

  const total = totalExpenses[index].value + form.value;

  if (totalExpenses[index] > totalIncomes[index]) {
    return "Tus egresos van a superar a tus ingresos";
  }
  return false;
};
