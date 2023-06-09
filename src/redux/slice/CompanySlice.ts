import { CompanType } from '@/models/company.model'
import { ExpenseType } from '@/models/expense.model'
import { GoalsTypes } from '@/models/goal.model'
import { IncomeType } from '@/models/income.model'
import verifyUserCompany from '@/src-client/utilities/verifyCompany'
import { calculateTotal, extractOtherCategories } from '@/utils/calculateTotal'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/company`
const BASE_GOAL_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/goal`;

interface Company {
  selectedCompany: CompanType
  totalExpenses: number
  totalIncomes: number
  otherCategories: string[]
  goals: GoalsTypes[];
  names: any[];
  allNames: string[]
}
interface formCompany {
  name: string
  user: string
}
const initialState: Company = {
  selectedCompany: {
    _id: '',
    name: '',
    expenses: [],
    incomes: [],
    users: [],
    notifications: [],
  },
  totalExpenses: 0,
  goals: [],
  totalIncomes: 0,
  otherCategories:[],
  names: [],
  allNames: [],
}
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      state.selectedCompany.expenses = action.payload.expenses
      state.selectedCompany.incomes = action.payload.incomes
      state.selectedCompany.users = action.payload.users
      state.selectedCompany.name = action.payload.name
      state.selectedCompany._id = action.payload._id
      state.selectedCompany.goals = action.payload.goals
      state.selectedCompany.notifications = action.payload.notifications
      state.totalExpenses = calculateTotal(action.payload.expenses)
      state.totalIncomes = calculateTotal(action.payload.incomes)
      state.otherCategories = extractOtherCategories(action.payload?.incomes,action.payload?.expenses)
    },
    addCompanyIncome: (state, action) => {
      state.selectedCompany.incomes.includes(action.payload)
        ? state.selectedCompany.incomes
        : state.selectedCompany.incomes.push(action.payload)
    },
    addCompanyExpense: (state, action) => {
      state.selectedCompany.expenses.includes(action.payload)
        ? state.selectedCompany.expenses
        : state.selectedCompany.expenses.push(action.payload)
    },
    updateCompanyExpense: (state, action) => {
      const update = state.selectedCompany.expenses.map((exp) => {
        if (exp._id === action.payload._id) {
          return action.payload
        } else {
          return exp
        }
      })
      state.selectedCompany.expenses = update
    },
    updateCompanyIncome: (state, action) => {
      const update = state.selectedCompany.incomes.map((inc) => {
        if (inc._id === action.payload._id) {
          return action.payload
        } else {
          return inc
        }
      })
      state.selectedCompany.incomes = update
    },
    deleteCompanyExpense: (state, action) => {
      const update = state.selectedCompany.expenses.filter((exp) => {
        if (exp._id !== action.payload) return exp
      })
      state.selectedCompany.expenses = update
    },
    deleteCompanyIncome: (state, action) => {
      const update = state.selectedCompany.incomes.filter((inc) => {
        if (inc._id !== action.payload) return inc
      })
      state.selectedCompany.incomes = update
    },
    getNames: (state, action) => {
      if (state.names.length > 0 && action.payload.name) {
        state.names.push(action.payload)
      } else {
        Array.isArray(action.payload)
          ? (state.names = action.payload)
          : state.names.push(action.payload)
      }
    },
    getAllNames: (state, action) => {
      state.allNames = action.payload
    },
    aceptNotification: (state, action) => {
      const notificationsNew = state.selectedCompany.notifications?.filter((notification : any) => notification.user !== action.payload);
      state.selectedCompany.notifications = notificationsNew;
    },
    addCompanyGoal: (state, action) => {
      state.goals?.push(action.payload)
    },
    updateCompanyGoal: (state, action) => {
      let find = state.goals?.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.goals = find;
    },
    deleteCompanyGoal: (state, action) => {
      const filter = state.goals?.filter((ele) => ele._id !== action.payload);
      state.goals = filter;
    },
    deleteCompany: (state, action) => {
      state.selectedCompany = {
        _id: '',
        name: '',
        expenses: [],
        incomes: [],
        users: [],
        notifications: [],
      };
      const namesFilter = state.names.filter((company) => action.payload.includes(company.id))
      state.names = namesFilter;
    }
  },
})

export const getNames =
  (id: string[] | string) => async (dispatch: Function) => {
    let urlName = ''
    let names
    if (Array.isArray(id)) {
      id.forEach((id: string) => {
        urlName = urlName + id + '%20'
      })
      const urlRequest = url + '?id=' + urlName
      names = await axios.get(urlRequest)
    } else {
      const urlRequest = url + '?id=' + id
      names = await axios.get(urlRequest)
    }
    dispatch(companySlice.actions.getNames(names.data.names))
  }

export const createCompany =
  (company: formCompany) => async (dispatch: Function) => {
    const newCompany = await axios.post(url, company)
    const companyData = {
      name: newCompany.data.name,
      id: newCompany.data._id,
    }
    dispatch(companySlice.actions.getNames(companyData))
  }

export const getTransactions =
  (company: CompanType) => (dispatch: Function) => {
    dispatch(companySlice.actions.getTransactions(company))
  }
export const addCompanyIncome =
  (income: IncomeType, id: string) => async (dispatch: Function) => {
    // const company = await verifyUserCompany(id);
    const urlIncome = `${url}/income?Id=${id}`
    const newIncome = await axios.post(urlIncome, income)
    dispatch(companySlice.actions.addCompanyIncome(newIncome.data.payload))
  }

export const addCompanyExpense =
  (expense: ExpenseType, id: string) => async (dispatch: Function) => {
    // const company = await verifyUserCompany(id);
    const urlExpense = `${url}/expense?Id=${id}`
    const newExpense = await axios.post(urlExpense, expense)
    dispatch(companySlice.actions.addCompanyExpense(newExpense.data.payload))
  }

export const updateCompanyExpense =
  (expense: any, id: any) => async (dispatch: Function) => {
    const urlExpense = `${url}/expense?id=${id}`
    const newExpense = await axios.put(urlExpense, expense)
    dispatch(companySlice.actions.updateCompanyExpense(newExpense.data.payload))
  }
export const updateCompanyIncome =
  (income: any, id: String) => async (dispatch: Function) => {
    const urlIncome = `${url}/income?id=${id}`

    const newIncome = await axios.put(urlIncome, income)

    dispatch(companySlice.actions.updateCompanyIncome(newIncome.data.payload))
  }
export const deleteCompanyExpense =
  (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser)
    const urlExpense = `${url}/expense?id=${id}&company=${company}`
    try {
      const deletedExpense = await axios.delete(urlExpense)
      dispatch(
        companySlice.actions.deleteCompanyExpense(deletedExpense.data.id)
      )
    } catch (e) {
      console.log(e)
    }
  }
export const deleteCompanyIncome =
  (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser)
    const urlIncome = `${url}/income?id=${id}&company=${company}`
    try {
      const deletedExpense = await axios.delete(urlIncome)
      dispatch(companySlice.actions.deleteCompanyIncome(deletedExpense.data.id))
    } catch (e) {
      console.log(e)
    }
  }

export const getAllNames = () => async (dispatch: Function) => {
  try {
    const urlAllNames = url + '/all'
    const companies = await axios.get(urlAllNames)
    const companiesArray = companies.data.payload.map((company: CompanType) => {
      return {
        name: company.name,
        _id: company._id,
      }
    })
    dispatch(companySlice.actions.getAllNames(companiesArray))
  } catch (error) {
    console.log(error)
  }
}


export const aceptNotification = (user : string, company : string) => async (dispatch: Function) => {
  const urlAcept = url + '/aceptUser?company=' + company + '&user=' + user
  const notif = await axios.post(urlAcept);
  dispatch(companySlice.actions.aceptNotification(user));
  return notif
}

export const sendCompanyNotification =
  (user: string, company: string) => async (dispatch: Function) => {
    const urlNotification =
      url + '/notification?company=' + company + '&user=' + user
    const notification = await axios.post(urlNotification)
    return notification
  }

export const deleteCompany = (user : string, company : string) => async (dispatch : Function) => {
  const urlDelete = url + '?id=' + company + '&user=' + user;
  const deleteCompany = await axios.delete(urlDelete);
  dispatch(companySlice.actions.deleteCompany(deleteCompany.data));
  return deleteCompany
}

  //GOALS

//Create goal
interface createGoal extends GoalsTypes {
  email: string,
  expiresDate: string,
}
export const createCompanyGoal = ({title, category, goalValue, status = 'Pending', expiresDate, email, plazo, priority} : createGoal) => async (dispatch: Function) => {
  try {
    const url = BASE_GOAL_URL + `?email=${email}&type=company`
    const response = await axios.post(url, {title, category, goalValue, status, expiresDate, plazo, priority})
    dispatch(companySlice.actions.addCompanyGoal(response.data.goal))
  } catch (error) {
    console.log(error)
  }
}
//Update goal
export const updateCompanyGoal = ({status, goalValue, _id} : any) => async (dispatch: Function) => {
  try {

    const url = BASE_GOAL_URL + `/${_id}`
    const response = await axios.put(url, {status, goalValue,})
    dispatch(companySlice.actions.updateCompanyGoal(response.data.goal))
  } catch (error) {
    console.log(error)
  }
}
//Delete goal
export const deleteCompanyGoal = ({_id} : any) => async (dispatch: Function) => {
  try {
    const url = BASE_GOAL_URL + `/${_id}`
    const response = await axios.delete(url)
    dispatch(companySlice.actions.deleteCompanyGoal(response.data.result._id));
  } catch (error) {
    console.log(error)
  }
}


export default companySlice.reducer
