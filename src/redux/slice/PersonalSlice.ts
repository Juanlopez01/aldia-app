import { ExpenseType } from "@/models/expense.model";
import { GoalsTypes } from "@/models/goal.model";
import { IncomeType } from "@/models/income.model";
import { PaymentType } from "@/models/payment.model";
import { UserType, UserWithId } from "@/models/user.model";
import { calculateTotal, extractOtherCategories } from "@/utils/calculateTotal";
import { catTransactionsEntries } from "@/utils/categoriesTransactions";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ObjectId } from "mongodb";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/personal`;
const BASE_GOAL_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/goal`;
interface PersonalFinance {
  user?: UserWithId;
  incomes: IncomeType[];
  expenses: ExpenseType[];
  goals: GoalsTypes[]; 
  payments: PaymentType[];
  otherCategories: string[];
  totalIncomes: number;
  totalExpenses: number;
}
const initialId = '' as unknown as ObjectId;

const initialState: PersonalFinance = {
  user: {
    _id: initialId,
    name: "",
    lastname: "",
    fullName: "",
    provider: "",
    emailVerified: false,
    email: "",
    image: "",
    role: "",
    status: "",
    currency: 'USD',
    createdAt:new Date(),
    updatedAt: new Date()
  },
  incomes: [],
  expenses: [],
  payments:[],
  otherCategories: [],
  goals: [],
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
      const goals = action.payload?.goals;
      const payments = action.payload?.payments;
      state.user = action.payload;
      state.expenses = expenses;
      state.incomes = incomes;
      state.goals = goals;
      state.payments = payments;
      state.totalExpenses = calculateTotal(action.payload?.expenses);
      state.totalIncomes = calculateTotal(action.payload?.incomes);
      state.otherCategories = extractOtherCategories(action.payload?.incomes,action.payload?.expenses)
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
      state.totalExpenses = calculateTotal(oldState);
      state.expenses = oldState;
    },
    updatePersonalExpense: (state, action) => {
      let find = state.expenses.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.totalExpenses = calculateTotal(find);
      state.expenses = find;
    },
    deletePersonalExpense: (state, action) => {
      const filter = state.expenses.filter((ele) => ele._id !== action.payload);
      state.totalExpenses = calculateTotal(filter);
      state.expenses = filter;
    },
    updateUserStatus : (state, action) => {
      if(state.user?.email === action.payload.email ){
        state.user?.status ?  state.user.status = action.payload.status : null
      }
    },
    addUserGoal: (state, action) => {
      state.goals.push(action.payload)
    },
    updateUserGoal: (state, action) => {
      let find = state.goals.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.goals = find;
    },
    deleteUserGoal: (state, action) => {
      const filter = state.goals.filter((ele) => ele._id !== action.payload);
      state.goals = filter;
    },
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
    console.log(income)
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
  (expense: ExpenseType, email: String) => async (dispatch: Function) => {
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


//GOALS

//Create goal
interface createGoal extends GoalsTypes {
  email: string,
  expiresDate: string,
}
export const createGoal = ({title, category, goalValue, status = 'Pending', expiresDate, email, plazo, priority} : createGoal) => async (dispatch: Function) => {
  try {
    const url = BASE_GOAL_URL + `?email=${email}&type=user`
    console.log(expiresDate)
    const response = await axios.post(url, {title, category, goalValue, status, expiresDate, plazo, priority})
    dispatch(personalSlice.actions.addUserGoal(response.data.goal))
  } catch (error) {
    console.log(error)
  }
}
//Update goal
export const updateGoal = ({status, goalValue, _id} : any) => async (dispatch: Function) => {
  try {

    const url = BASE_GOAL_URL + `/${_id}`
    console.log(url)
    const response = await axios.put(url, {status, goalValue,})
    dispatch(personalSlice.actions.updateUserGoal(response.data.goal))
  } catch (error) {
    console.log(error)
  }
}
//Delete goal
export const deleteGoal = ({_id} : any) => async (dispatch: Function) => {
  try {
    const url = BASE_GOAL_URL + `/${_id}`
    const response = await axios.delete(url)
    dispatch(personalSlice.actions.deleteUserGoal(response.data.result._id));
  } catch (error) {
    console.log(error)
  }
}

export default personalSlice.reducer;
