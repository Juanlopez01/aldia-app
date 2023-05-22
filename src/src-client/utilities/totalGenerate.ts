import { colores } from "@/utilities/colors";
interface Result {
    categories: string[];
    totals: number[];
    colors: string[]
}
export const totalGenerate = (Incomes: any, Expenses : any) => {
    let IncomesResult : Result = {
        categories: [],
        totals: [], 
        colors: [],
    };
    let ExpensesResult : Result = {
        categories: [],
        totals: [], 
        colors: [],
    };
    // Normalizamos las categorias de incomes
    const categoriesIncArray = Incomes.map((ele : any) => ele.category)
    const setIncCategories = new Set(categoriesIncArray)
    setIncCategories.forEach((ele : any) => IncomesResult.categories.push(ele))
    // Lo mismo con las expenses
    const categoriesExpArray = Expenses.map((ele : any) => ele.category)
    const setExpCategories = new Set(categoriesExpArray)
    setExpCategories.forEach((ele : any) => ExpensesResult.categories.push(ele))

    //Guardamos el total por categoria de incomes
    IncomesResult.categories.forEach((category) => {
        const transPerCat: any[] = [];
        Incomes.forEach((ele : any) => {
            if(ele.category === category) transPerCat.push(ele)
        })
        const total = transPerCat.reduce((acc : number, ele : any) => acc + ele.value, 0)
        IncomesResult.totals.push(total)
    })
    //Guardamos el total por categoria de expenses
    ExpensesResult.categories.forEach((category) => {
        const transPerCat: any[] = [];
        Expenses.forEach((ele : any) => {
            if(ele.category === category) transPerCat.push(ele)
        })
        const total = transPerCat.reduce((acc : number, ele : any) => acc + ele.value, 0)
        ExpensesResult.totals.push(total)
    })

    //Ponemos igual color al mismo tipo de categoria
    IncomesResult.categories.forEach((category) => {
        const indexIncome = IncomesResult.categories.indexOf(category)
        if(ExpensesResult.categories.includes(category)){
            const indexExpense = ExpensesResult.categories.indexOf(category)
            IncomesResult.colors[indexIncome] = colores[indexIncome]
            ExpensesResult.colors[indexExpense] = colores[indexIncome]
        } else {
            //Si hay mas incomes se autocompleta con otro color
            IncomesResult.colors[indexIncome] = colores[indexIncome]
        }
    })

    //Si hay mas expenses se autocompleta con otro color
    ExpensesResult.categories.forEach((expenses, index) => {
        if(!ExpensesResult.colors[index]){
            ExpensesResult.colors[index] = colores[colores.length - index]
        }
    })


    return {IncomesResult, ExpensesResult,}
}