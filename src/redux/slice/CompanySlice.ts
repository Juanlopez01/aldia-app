import { CompanType } from "@/models/company.model";
import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { getCompany } from "@/src-client/utilities/getCompany";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Schema } from "mongoose";

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/company`;

interface Company {
  selectedCompany: CompanType;
  names: string[];
}
interface formCompany {
  name: string;
  user: string;
}
const initialState: Company = {
  selectedCompany: {
    _id: '',
    name: '',
    expenses: [],
    incomes: [],
    users: [],
  },
  names: [],
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      state.selectedCompany.expenses = action.payload.expenses;
      state.selectedCompany.incomes = action.payload.incomes;
      state.selectedCompany.users = action.payload.users;
      state.selectedCompany.name = action.payload.name;
      state.selectedCompany._id = action.payload._id;
    },
    addCompanyIncome: (state, action) => {
      state.selectedCompany.incomes.includes(action.payload)
        ? state.selectedCompany.incomes
        : state.selectedCompany.incomes.push(action.payload);
    },
    addCompanyExpense: (state, action) => {
      state.selectedCompany.expenses.includes(action.payload)
        ? state.selectedCompany.expenses
        : state.selectedCompany.expenses.push(action.payload);
    },
    updateCompanyExpense: (state, action) => {
      const update = state.selectedCompany.expenses.map((exp) => {
        if (exp._id === action.payload._id) {
          return action.payload;
        } else {
          return exp;
        }
      });
      state.selectedCompany.expenses = update;
    },
    updateCompanyIncome: (state, action) => {
      const update = state.selectedCompany.incomes.map((inc) => {
        if (inc._id === action.payload._id) {
          return action.payload;
        } else {
          return inc;
        }
      });
      state.selectedCompany.incomes = update;
    },
    deleteCompanyExpense: (state, action) => {
      const update = state.selectedCompany.expenses.filter((exp) => {
        if (exp._id !== action.payload) return exp;
      });
      state.selectedCompany.expenses = update;
    },
    deleteCompanyIncome: (state, action) => {
      const update = state.selectedCompany.incomes.filter((inc) => {
        if (inc._id !== action.payload) return inc;
      });
      state.selectedCompany.incomes = update;
    },
    getNames: (state, action) => {
      if(state.names.length > 0 && action.payload.name){
        state.names.push(action.payload);
      } else {
      state.names = action.payload;
      }
    },
  },
});


export const getNames = (id : string[] | string) => async (dispatch : Function) => {
  let urlName = ''
  let names
  if(Array.isArray(id)){
    id.forEach((id : string) => { urlName = urlName + id + '%20'})
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
    const newCompany = await axios.post(url, company);
    const companyData = {
      name: newCompany.data.name,
      id: newCompany.data._id
    }
    dispatch(companySlice.actions.getNames(companyData));
  };

export const getTransactions =
  (company: CompanType) => (dispatch: Function) => {
    dispatch(companySlice.actions.getTransactions(company));
  };
export const addCompanyIncome =
  (income: IncomeType, id: string) => async (dispatch: Function) => {
    // const company = await verifyUserCompany(id);
    const urlIncome = `${url}/income?Id=${id}`;
    const newIncome = await axios.post(urlIncome, income);
    dispatch(companySlice.actions.addCompanyIncome(newIncome.data.payload));
  };

export const addCompanyExpense =
  (expense: ExpenseType, id: string) => async (dispatch: Function) => {
    // const company = await verifyUserCompany(id);
    const urlExpense = `${url}/expense?Id=${id}`;
    const newExpense = await axios.post(urlExpense, expense);
    dispatch(companySlice.actions.addCompanyExpense(newExpense.data.payload));
  };

export const updateCompanyExpense =
  (expense: any, id: any) => async (dispatch: Function) => {
    const urlExpense = `${url}/expense?id=${id}`;
    const newExpense = await axios.put(urlExpense, expense);
    dispatch(
      companySlice.actions.updateCompanyExpense(newExpense.data.payload)
    );
  };
export const updateCompanyIncome =
  (income: any, id: String) => async (dispatch: Function) => {
    const urlIncome = `${url}/income?id=${id}`;

    const newIncome = await axios.put(urlIncome, income);

    dispatch(companySlice.actions.updateCompanyIncome(newIncome.data.payload));
  };
export const deleteCompanyExpense =
  (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser);
    const urlExpense = `${url}/expense?id=${id}&company=${company}`;
    try {
      const deletedExpense = await axios.delete(urlExpense);
      dispatch(
        companySlice.actions.deleteCompanyExpense(deletedExpense.data.id)
      );
    } catch (e) {
      console.log(e);
    }
  };
export const deleteCompanyIncome =
  (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser);
    const urlIncome = `${url}/income?id=${id}&company=${company}`;
    try {
      const deletedExpense = await axios.delete(urlIncome);
      dispatch(
        companySlice.actions.deleteCompanyIncome(deletedExpense.data.id)
      );
    } catch (e) {
      console.log(e);
    }
  };

export default companySlice.reducer;
