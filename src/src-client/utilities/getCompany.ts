import { getTransactions } from "@/redux/slice/CompanySlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getCompany = async (id: string, dispatch: Function) => {
  if (id !== undefined && id !== null) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/company/get?id=${id}`;
    const response = await axios.get(url);
    dispatch(getTransactions(response.data.payload));
    return response;
  }
};
