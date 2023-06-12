import { getUserFinance } from "@/redux/slice/PersonalSlice";
import { Graphics } from "@/src-client/components/Graphics";
import LayoutWithSideNav  from "@components/layouts/LayoutSideNav";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


export default function PersonalFinances() {
  const { data: session } = useSession({ required: true });
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.PersonalReducer.incomes);
  const expenses = useSelector((state: any) => state.PersonalReducer.expenses);
  const totalIncomes = useSelector((state: any) => state.PersonalReducer.totalIncomes);
  const totalExpenses = useSelector((state: any) => state.PersonalReducer.totalExpenses);


  totalExpenses > totalIncomes ? Swal.fire({
    title: 'Cuidado!',
    text: 'Tus gastos han superado tus ingresos',
    icon: 'warning',
    showCloseButton: true
  }) : undefined;
  useEffect(() => {
    dispatch(getUserFinance(session?.user?.email!));
  }, [dispatch, session?.user]);

  return (
    <LayoutWithSideNav>
      <Graphics
        type="personales"
        incomes={incomes ?? []}
        expenses={expenses ?? []}
      />
    </LayoutWithSideNav>
  );
}
