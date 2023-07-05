import { addPersonalExpense, updateGoal } from "@/redux/slice/PersonalSlice";
import React from "react";
import Swal from "sweetalert2";
import PhotoComponent from "./PhotoComponent";
import ProgressBar from "./ProgressBar";
import { traductDate } from "@/utils/traductDate";
import { useRouter } from "next/router";
import { addCompanyExpense, updateCompanyGoal } from "@/redux/slice/CompanySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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
	email: string;
	setFormType: Function;
	setForm: Function;
	form: any;
	setShow: Function;
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
	setShow
}: GoalBarTypes) => {
	const porcentaje = Math.round((excess.valueOf() * 100) / goalValue.valueOf());
	const router = useRouter()
	//*for debugging, we want the 'Comprar' goal to be full
	let porcentajeFinal = porcentaje;
	let excessFinal = excess;
	if (porcentajeFinal > 100) porcentajeFinal = 100;
	const flagIsFilled = excessFinal === goalValue;

	return (
		<div
			className={`w-full
			`}
		>
			<div
				className={`${
					flagIsFilled ? "bg-[#14f037]" : "bg-white"
				} flex jxustify-between items-center gap-x-4 w-full xl:w-10/12 shadow-lg rounded-full px-3 py-2
			`}
			>
				{/* category img desktop */}
				<div className="items-center h-full hidden md:flex">
					<PhotoComponent category={category?.toString()} width={45} height={45} />
				</div>

				{/* category img mobile */}
				<div className="items-center h-full flex md:hidden">
					<PhotoComponent category={category?.toString()} width={30} height={30} />
				</div>

				{/* second col: title, porcentage and goals value */}
				<div
					className={`w-[80%] flex justify-center text-sm md:text-lg
			${flagIsFilled ? "items-center gap-x-2 font-bold md:text-xl" : "flex-col "}`}
				>
					<span>{title}</span>
					{!flagIsFilled && <ProgressBar completed={porcentajeFinal}></ProgressBar>}
					{status === "Pending" && (
						<>
							{/* porcentaje */}
							{flagIsFilled && " - "}
							<div className="flex justify-between">
							<span className="text-sm md:text-lg">{`s/${excessFinal}`}</span>
							<span className="text-sm md:text-lg">{`s/${goalValue}`}</span>
							</div>
							{/*  <span>{expires}</span>
						<span>{plazo}</span> */}
						</>
					)}
				</div>

				{status === "Pending" && (
					<div className="flex text-sm gap-3 md:text-lg">
						<button onClick={() => handleDelete(_id)}>
							<FontAwesomeIcon icon={faTrash} size="lg"/>
						</button>
						<button
							onClick={() => {
								setFormType("edit");
								setForm({ ...form, _id: _id });
								setShow(true);
							}}
						>
							<FontAwesomeIcon icon={faPenToSquare} size="lg"/>
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
									if(router.pathname === "/company/goals"){
										dispatch(updateCompanyGoal({ status: "Completed", goalValue, _id }));
									dispatch(
										addCompanyExpense(
											{
												type: "negocio",
												value: goalValue.valueOf(),
												description: title,
												category: "Metas",
												date:traductDate(new Date()),
												credit: 'Un pago',
											},
											email
										)
									);
									} else {
										dispatch(updateGoal({ status: "Completed", goalValue, _id }));
										dispatch(
											addPersonalExpense(
												{
													type: "personales",
													value: goalValue.valueOf(),
													description: title,
													category: "Metas",
													date:traductDate(new Date()),
													credit: 'Un pago',
												},
												email
											)
										);
									}
								} else {
								}
							});
						}}
						className="px-2 py-1 rounded-lg bg-[#198754] text-white"
					>
						Completar
					</button>
				)}

				{/* {status === 'Completed' && <button onClick={() => dispatch(updateGoal({status:'Pending', goalValue, _id,}))}>No completado</button>} */}
			</div>
		</div>
	);
};

export default GoalBar;
