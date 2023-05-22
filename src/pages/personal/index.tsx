import { getUserFinance } from "@/redux/slice/PersonalSlice";
import { Graphics } from "@/src-client/components/Graphics";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PersonalFinances() {
  const { data: session } = useSession({ required: true });
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.PersonalReducer.incomes);
  const expenses = useSelector((state: any) => state.PersonalReducer.expenses);

  useEffect(() => {
    dispatch(getUserFinance(session?.user?.email!));
  }, [dispatch, session?.user]);

  return (
    <>
      <Graphics
        type="personales"
        incomes={incomes ?? []}
        expenses={expenses ?? []}
      />
    </>
  );
}
