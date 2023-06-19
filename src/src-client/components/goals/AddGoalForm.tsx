import React from "react";
import {
	categories,
	shortExpiresValues,
	longExpiresValues,
} from "@/utils/categoriesGoals";
import Swal from "sweetalert2";
import { createGoal, updateGoal } from "@/redux/slice/PersonalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddGoalForm = ({ setForm, type, form, excess, dispatch, setShow }: any) => {
	const handleChange = (e: any) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (type === "register") {
			dispatch(createGoal(form));
			setForm({
				...form,
				title: "",
				category: "",
				goalValue: 0,
				expiresDate: "",
				_id: "",
				priority: 1,
				plazo: "Corto plazo",
				status: "Pending",
			});
		}
		if (type === "edit") {
			dispatch(
				updateGoal({
					status: form.status,
					goalValue: form.goalValue,
					_id: form._id,
				})
			);
		}
		setShow(false)
	};

	return (
		<div className='flex justify-center'>
			<form className="flex flex-col w-11/12 xl:w-10/12" onSubmit={handleSubmit}>
				{type === "register" && (
					<>
					<div className="input-group mb-3 mt-1 w-100">
					<label htmlFor="text" className="input-group-text ">Título</label>
						<input
							type="text"
							id="title"
							placeholder="Escribe un titulo"
							value={form.title}
							onChange={handleChange}
							required
							className="form-control"
						/>
					</div>
					<div className="input-group mb-3 w-100">
					<label htmlFor="text" className="input-group-text ">Categoría</label>	
						<select
							id="category"
							onChange={handleChange}
							value={form.category}
							defaultValue={"Otros"}
							required
							className="form-control"
						>
							<option value={"Otros"} key={"Otros"}>
								Otros
							</option>
							{categories.map((category) => {
								return (
									<option value={category} key={category}>
										{category}
									</option>
								);
							})}
						</select>
					</div>
					<div className="input-group mb-3 w-100">
					<label htmlFor="text" className="input-group-text ">Valor</label>
						<input
							type="number"
							id="goalValue"
							placeholder="Selecciona el monto de tu meta"
							onChange={handleChange}
							value={form.goalValue}
							required
							className="form-control"
						/>
					</div>
					<div className="input-group mb-3 w-100">
					<label htmlFor="text" className="input-group-text ">Plazo</label>
						<select
							id="plazo"
							defaultValue={"Corto plazo"}
							onChange={handleChange}
							value={form.plazo}
							className="form-control"
						>
							<option key={"Cortoplazo"} value="Corto plazo">
								Corto plazo
							</option>
							<option key={"Largoplazo"} value="Largo plazo">
								Largo plazo
							</option>
						</select>
					</div>
						{form.plazo === "Corto plazo" && (
							<div className="input-group mb-3 w-100">
							<label htmlFor="text" className="input-group-text ">Vencimiento</label>
							<select
								id="expiresDate"
								onChange={handleChange}
								required
								value={form.expiresValue}
								defaultValue={"Una semana"}
								className="form-control"
							>
								{shortExpiresValues.map((expires) => {
									return (
										<option value={expires} key={expires}>
											{expires}
										</option>
									);
								})}
							</select>
							</div>
						)}
						{form.plazo === "Largo plazo" && (
							<div className="input-group mb-3 w-100">
							<label htmlFor="text" className="input-group-text ">Vencimiento</label>
							<select
								id="expiresDate"
								onChange={handleChange}
								required
								value={form.expiresValue}
								defaultValue={"Dos años"}
								className="form-control"
							>
								{longExpiresValues.map((expires) => {
									return (
										<option value={expires} key={expires}>
											{expires}
										</option>
									);
								})}
							</select>
							</div>
						)}
						<div className="input-group mb-3 w-100">
						<label htmlFor="text" className="input-group-text ">Prioridad</label>
						<select
							id="priority"
							required
							defaultValue={1}
							value={form.priority}
							onChange={handleChange}
							className="form-control"
						>
							<option key="1" value={1}>
								Alta
							</option>
							<option key="2" value={2}>
								Media
							</option>
							<option key="3" value={3}>
								Baja
							</option>
						</select>
						</div>
					</>
				)}
				{type === "edit" && (
					<div className="input-group mb-3 mt-1 w-100">
						<label htmlFor="text" className="input-group-text ">Valor</label>
						<input
							type="number"
							id="goalValue"
							placeholder="Selecciona el monto de tu meta"
							onChange={handleChange}
							value={form.goalValue}
							required
							className="form-control"
						/>
						{/* {form.plazo==='Corto plazo' &&
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {shortExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            {form.plazo==='Largo plazo' && 
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {longExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            <select id='priority' required defaultValue={1} value={form.priority} onChange={handleChange}>
              <option key='1' value={1}>Alta</option>
              <option key='2' value={2}>Media</option>
              <option key='3' value={3}>Baja</option>
              </select>        */}
					</div>
				)}
				<div className="flex justify-center py-4">
					<button
						type="submit"
						className="w-[220px] text-white px-3 py-2 bg-main-green dark:bg-darkest-blue text-lg
						rounded-full flex justify-center items-center gap-x-2"
					>
						{type === "register" ? 
						<>
							<FontAwesomeIcon icon={faPlus} className="text-white border-2 border-white rounded-full p-1"/>
							<span>AGREGAR META</span>
						</> : 
						"EDITAR META"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddGoalForm;
