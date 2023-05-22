import { CompanType } from "@/models/company.model";
import { ExpenseType } from "@/models/expense.model";
import { UserType } from "@/models/user.model";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PersonalSlice, { updateUserStatusP } from "./PersonalSlice";

interface state {
    users: UserType[],
    companies: CompanType[],
    selectedCompany: CompanType,
    selectedUser: UserType ,
}


const initialState: state = {
    users: [],
    companies: [],
    selectedUser: {
        name: '',
        email: '',
        image: '',
        role: '',
        status: '',
    },
    selectedCompany: {
        _id:'',
        name: '',
        incomes: [],
        expenses: [],
        users: [],
    },
}

const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/`

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        listCompanies: (state, action) => {
            state.companies = action.payload
        },
        listUsers: (state, action) => {
            state.users = action.payload
        },
        userDetails: (state, action) => {
            state.selectedUser = action.payload
        },
        companyDetails: (state, action) => {
            state.selectedCompany = action.payload
        },
        updateCompanyExpenses: (state, action) => {
            if(state.selectedCompany.expenses){
                const update = state.selectedCompany?.expenses.map((ele : any) => {
                    if(ele._id === action.payload._id) return action.payload;
                    return ele;
                })
    
                state.selectedCompany.expenses = update    
            }
            
        },
        updateCompanyIncomes: (state, action) => {
            if(state.selectedCompany.incomes.length > 0){
                const update = state.selectedCompany?.incomes.map((ele : any) => {
                    if(ele._id === action.payload._id) return action.payload;
                    return ele;
                })
    
                state.selectedCompany.incomes = update    
            }
            
        },
        updateUserExpenses: (state, action) => {
            if(state.selectedUser.expenses){
                const update = state.selectedUser.expenses.map((ele : ExpenseType) => {
                    if(ele._id === action.payload._id) return action.payload;
                    return ele;
                })
    
                state.selectedUser['expenses'] = update    
            }
            
        },
        updateUserIncomes: (state, action) => {
            if(state.selectedUser.incomes){
                const update = state.selectedUser?.incomes.map((ele : any) => {
                    if(ele._id === action.payload._id) return action.payload;
                    return ele;
                })
    
                state.selectedUser.incomes = update    
            }
            
        },
        updateUserStatus: (state, action) => {
            const update = state.users.map((user : any) => {
               if(user._id === action.payload._id){ return action.payload} else {return user} 
            })
            state.users = update
        },
    }

})

export const getList = (type: string) => async (dispatch: Function) => {
    const urlGet = url + `admin?type=${type}`
    const list = await axios.get(urlGet)
    type === 'negocio'? 
    dispatch(adminSlice.actions.listCompanies(list.data.payload))
    : dispatch(adminSlice.actions.listUsers(list.data.payload));
}

export const getDetails = (type: string, id: string) => async (dispatch : Function) => {
    const getUrl = url + `admin?type=${type}&id=${id}`;
    const details = await axios.get(getUrl);
    type === 'negocio' ?
    dispatch(adminSlice.actions.companyDetails(details.data.payload))
    : dispatch(adminSlice.actions.userDetails(details.data.payload));
}

export const updateAdminCompanyExpense = (expense : any, id : String) => async (dispatch : Function) => {
    const companyUrl = url + `company/expense?id=${id}`;
    const update = await axios.put(companyUrl, expense);
    
    dispatch(adminSlice.actions.updateCompanyExpenses(update.data.payload))
}
export const updateAdminUserExpense = (expense : any, id : String) => async (dispatch : Function) => {
    const personalUrl = url + `personal/expense/${id}`;
    const update = await axios.put(personalUrl, expense);
    
    dispatch(adminSlice.actions.updateUserExpenses(update.data.payload))
}
export const updateAdminCompanyIncome = (income : any, id : String) => async (dispatch : Function) => {
    const companyUrl = url + `company/income?id=${id}`;
    const update = await axios.put(companyUrl, income);
    
    dispatch(adminSlice.actions.updateCompanyIncomes(update.data.payload))
}
export const updateAdminUserIncome = (income : any, id : String) => async (dispatch : Function) => {
    const personalUrl = url + `personal/income/${id}`;
    const update = await axios.put(personalUrl, income);
    
    dispatch(adminSlice.actions.updateUserIncomes(update.data.payload))
}
export const deleteAdminCompanyExpense = (id : String) => async (dispatch : Function) => {
    const companyUrl = url + `company/expense?id=${id}`;
    const update = await axios.delete(companyUrl);
    
    dispatch(adminSlice.actions.updateCompanyIncomes(update.data.payload))
}
export const deleteAdminUserExpense = (id: String) => async (dispatch : Function) => {
    const personalUrl = url + `personal/expense?id=${id}`;
    const update = await axios.delete(personalUrl);
    
    dispatch(adminSlice.actions.updateUserIncomes(update.data.payload))
}
export const deleteAdminCompanyIncome = (id : String) => async (dispatch : Function) => {
    const companyUrl = url + `company/income?id=${id}`;
    const update = await axios.delete(companyUrl);
    
    dispatch(adminSlice.actions.updateCompanyIncomes(update.data.payload))
}
export const deleteAdminUserIncome = (id : String) => async (dispatch : Function) => {
    const personalUrl = url + `personal/income?id=${id}`;
    const update = await axios.delete(personalUrl);
    
    dispatch(adminSlice.actions.updateUserIncomes(update.data.payload))
}

export const updateUserStatus = (type : String ,id : String) => async (dispatch: Function) => {
    const updateUrl = url + `admin?type=${type}&id=${id}`
    const update = await axios.put(updateUrl)
    await dispatch(updateUserStatusP(update.data.payload))
    dispatch(adminSlice.actions.updateUserStatus(update.data.payload))
}




export default adminSlice.reducer;