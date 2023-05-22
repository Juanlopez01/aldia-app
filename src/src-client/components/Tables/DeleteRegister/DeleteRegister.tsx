import Image from "next/image";
import icoBorrar from "../../../../../assets/trash-bin-delete-svgrepo-com.svg";
import Swal from "sweetalert2";
import {
  deleteCompanyExpense,
  deleteCompanyIncome,
} from "@/redux/slice/CompanySlice";
import {
  deletePersonalExpense,
  deletePersonalIncome,
} from "@/redux/slice/PersonalSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

export default function DeleteRegister({ id, filters }: any) {
  const dispatch: Function = useDispatch();
  const { data: session } = useSession();
  const idUser = session?.user?.email;

  const deleteRegister = (id: String) => {
    Swal.fire({
      title: "Esta seguro que desea borrar el registro?",
      showDenyButton: true,

      denyButtonText: `Cancelar`,
      confirmButtonText: "Borrar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (filters.type === "ingresos") {
          filters.slice === "negocio"
            ? dispatch(deleteCompanyIncome(id, idUser))
            : dispatch(deletePersonalIncome("email", id));
        } else {
          filters.slice === "negocio"
            ? dispatch(deleteCompanyExpense(id, idUser))
            : dispatch(deletePersonalExpense("email", id));
        }
        Swal.fire("Borrado!", "", "success");
      }
    });
  };

  return (
    <button
      onClick={() => {
        deleteRegister(id);
      }}
      className="border-0 rounded-1 m-1 text-white"
    >
      <Image src={icoBorrar} alt="Borrar" width={30} height={30} />
    </button>
  );
}
