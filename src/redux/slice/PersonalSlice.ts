import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { UserType } from "@/models/user.model";
import { calculateTotal } from "@/utils/calculateTotal";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/personal`;

interface PersonalFinance {
  user?: UserType;
  incomes: IncomeType[];
  expenses: ExpenseType[];
  totalIncomes: number;
  totalExpenses: number;
}

const initialState: PersonalFinance = {
  user: {
    name: "",
    email: "",
    image: "",
    role: "",
    status: "",
  },
  incomes: [],
  expenses: [],
  totalIncomes: 0,
  totalExpenses: 0,
};

const personalSlice = createSlice({
  name: "personal",
  initialState,

  reducers: {
    getUser: (state, action) => {
      const expenses = action.payload?.expenses;
      const incomes = action.payload?.incomes;
      state.user = action.payload;
      state.expenses = expenses;
      state.incomes = incomes;
      state.totalExpenses = calculateTotal(action.payload?.expenses);
      state.totalIncomes = calculateTotal(action.payload?.incomes);
    },
    addPersonalIncome: (state, action) => {
      const oldState = state.incomes;
      oldState.push(action.payload);
      state.totalIncomes = calculateTotal(oldState);
      state.incomes = oldState;
    },

    updatePersonalIncome: (state, action) => {
      let find = state.incomes.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.totalIncomes = calculateTotal(find);
      state.incomes = find;
    },
    deletePersonalIncome: (state, action) => {
      const filter = state.incomes.filter((ele) => ele._id !== action.payload);
      state.totalIncomes = calculateTotal(filter);
      state.incomes = filter;
    },
    addPersonalExpense: (state, action) => {
      const oldState = state.expenses;
      oldState.push(action.payload);
      state.totalIncomes = calculateTotal(oldState);
      state.expenses = oldState;
    },
    updatePersonalExpense: (state, action) => {
      let find = state.expenses.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.totalIncomes = calculateTotal(find);
      state.expenses = find;
    },
    deletePersonalExpense: (state, action) => {
      const filter = state.expenses.filter((ele) => ele._id !== action.payload);
      state.totalIncomes = calculateTotal(filter);
      state.expenses = filter;
    },
    updateUserStatus : (state, action) => {
      if(state.user?.email === action.payload.email ){
        state.user?.status ?  state.user.status = action.payload.status : null
      }
    }
  },
});

export const getUserFinance = (email: string) => async (dispatch: Function) => {
  const res = await axios.get(BASE_URL + "?email=" + email);

  dispatch(personalSlice.actions.getUser(res.data.payload));
};

//INCOMES in personal finance

//CREATE
export const addPersonalIncome =
  (email: string, income: IncomeType) => async (dispatch: Function) => {
    const res = await axios.post(BASE_URL + "/income?email=" + email, income);

    dispatch(personalSlice.actions.addPersonalIncome(res.data.payload));
  };
//UPDATE
export const updatePersonalIncome =
  (income: IncomeType, id: String) => async (dispatch: Function) => {
    const res = await axios.put(BASE_URL + "/income/" + id, income);

    dispatch(personalSlice.actions.updatePersonalIncome(res.data.payload));
  };
//DELETE
export const deletePersonalIncome =
  (email: string, id: String) => async (dispatch: Function) => {
    const res = await axios.delete(BASE_URL + "/income/" + id);
    if (res.data.result.deletedCount) {
      dispatch(personalSlice.actions.deletePersonalIncome(id));
    } else {
      //TODO: en caso de no borrarse
    }
  };

//EXPENSES in personal finance
//CREATE
export const addPersonalExpense =
  (expense: ExpenseType, email: string) => async (dispatch: Function) => {
    const res = await axios.post(BASE_URL + "/expense?email=" + email, expense);

    dispatch(personalSlice.actions.addPersonalExpense(res.data.payload));
  };

//UPDATE
export const updatePersonalExpense =
  (expense: ExpenseType, id: String) => async (dispatch: Function) => {
    const res = await axios.put(BASE_URL + "/expense/" + id, expense);

    dispatch(personalSlice.actions.updatePersonalExpense(res.data.payload));
  };

//DELETE
export const deletePersonalExpense =
  (email: string, id: String) => async (dispatch: Function) => {
    const res = await axios.delete(BASE_URL + "/expense/" + id);
    if (res.data.result.deletedCount) {
      dispatch(personalSlice.actions.deletePersonalExpense(id));
    } else {
      //TODO: en caso de no borrarse
    }
  };

export const updateUserStatusP = (user : UserType) => async (dispatch : Function) => {
  dispatch(personalSlice.actions.updateUserStatus(user));
}


//CHANGE PASSWORD
export const changePassword = async (email : string) => {
  console.log(process.env.CLIENT_ID)
  const clientId = process.env.CLIENT_ID
  const response = await axios.post(`https://dev-xj1blxngfl10gkzm.us.auth0.com/passwordless/start`, {
    client_id: 'zmxTqWf2ninaFFXgtB6SbVQy9mWoVoyg',
    client_secret: 'DcLt7tC8WNzCxI42P7T2NBZ-hMQ8fKuv_TQ7n8sOoKVHV7JiH9g3JBXCErzAtcrA',
    connection: 'email',
    email: email,
    send: 'code',
  })

  console.log(response)
}



export default personalSlice.reducer;
