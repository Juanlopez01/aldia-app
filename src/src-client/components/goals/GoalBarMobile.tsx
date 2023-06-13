import { addPersonalExpense, updateGoal } from "@/redux/slice/PersonalSlice";
import React from "react";
import Swal from "sweetalert2";
import PhotoComponent from "./PhotoComponent";
import ProgressBar from "./ProgressBar";

interface GoalBarTypes {
	title: String;
	goalValue: Number;
	excess: Number;
	status: String;
	priority: Number;
	plazo: String;
	expires: String;
	category: String;
	dispatch: Function;
	_id: String | undefined;
	handleDelete: Function;
	email: String;
	setFormType: Function;
	setForm: Function;
	form: any;
}

const GoalBarMobile = ({
	title,
	goalValue,
	excess,
	status,
	priority,
	plazo,
	expires,
	category,
	dispatch,
	_id,
	handleDelete,
	email,
	setFormType,
	setForm,
	form,
}: GoalBarTypes) => {
	const porcentaje = Math.round((excess.valueOf() * 100) / goalValue.valueOf());

	//*for debugging, we want the 'Comprar' goal to be full
	let porcentajeFinal = porcentaje;
	let excessFinal = excess;
	if (title === "Comprar") {
		porcentajeFinal = 100;
		excessFinal = goalValue;
	} else if (title === "Fútbol viaje") {
		porcentajeFinal = 70;
		excessFinal = Number(goalValue) * 0.7;
	} else if (title === "Ahorros") {
		porcentajeFinal = 40;
		excessFinal = Number(goalValue) * 0.4;
	}
	if (porcentajeFinal > 100) porcentajeFinal = 100;
	const flagIsFilled = excessFinal === goalValue;

	return (
		<div className="w-full overflow-hidden px-2">
			<ProgressBar completed={porcentajeFinal}>
				<div className="w-full">
          {status === "Pending" && (
            <div className="flex flex-col text-sm md:text-lg">
              <button onClick={() => handleDelete(_id)}>Delete</button>
              <button
                onClick={() => {
                  setFormType("edit");
                  setForm({ ...form, _id: _id });
                }}
              >
                Editar valor
              </button>
            </div>
          )}
					{status === "Pending" && excess >= goalValue && (
						<button
							onClick={() => {
								Swal.fire({
									title: "Estas Seguro?",
									text:
										"Presiona aceptar si has completado esta meta, luego no podras deshacer este cambio",
									showConfirmButton: true,
									showCancelButton: true,
									confirmButtonText: "He completado esta meta",
									cancelButtonText: "Cancelar",
									icon: "warning",
								}).then((result) => {
									if (result.isConfirmed) {
										dispatch(updateGoal({ status: "Completed", goalValue, _id }));
										dispatch(
											addPersonalExpense(
												{
													type: "personales",
													value: goalValue,
													description: title,
													category: "Metas",
													date: new Date(),
												},
												email
											)
										);
									} else {
									}
								});
							}}
						>
							Completado
						</button>
					)}
				</div>
			</ProgressBar>
		</div>
	);
};

export default GoalBarMobile;
