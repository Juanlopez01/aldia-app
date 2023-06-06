import { addPersonalExpense, updateGoal } from "@/redux/slice/PersonalSlice";
import React from "react";
import Swal from "sweetalert2";
import PhotoComponent from "./PhotoComponent";

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

const GoalBar = ({
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
	return (
		<div className="bg-white grid grid-cols-3 shadow-lg rounded-full p-4">
			<div>
				<PhotoComponent category={category?.toString()}/>
			</div>
			<div className="flex flex-col">
				<span>{title}</span>
				<span>{porcentaje > 100 ? `100%` : `${porcentaje}%`}</span>
				{status === "Pending" && (
					<>
						{/* porcentaje */}
						<span>{`$${excess} / $${goalValue}`}</span>
						{/*  <span>{expires}</span>
						<span>{plazo}</span> */}
					</>
				)}
			</div>

			{status === "Pending" && (
				<div className="flex flex-col">
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

			{/* {status === 'Completed' && <button onClick={() => dispatch(updateGoal({status:'Pending', goalValue, _id,}))}>No completado</button>} */}
		</div>
	);
};

export default GoalBar;
