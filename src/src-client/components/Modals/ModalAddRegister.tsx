import {
	addCompanyExpense,
	addCompanyIncome,
} from "@/redux/slice/CompanySlice";
import {
	addPersonalExpense,
	addPersonalIncome,
} from "@/redux/slice/PersonalSlice";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormRegister from "./FormAddRegister";
import Modal from "../generals/Modal";
import { traductDate } from "@/utils/traductDate";
import { UserWithMongooseId } from "@/models/user.model";

interface PropsModal {
	props: {
		title: string;
		buttonText: string;
		type: string;
	};
	type?: string;
}
const newDate = new Date()
const date = traductDate(newDate)
const initialStateForm = {
	type: "",
	description: "",
	category: "Hogar",
	value: 0,
	date: date,
	credit: 'No',
};
export function ModalAddRegister({
	props,
	type,
	dataIncomes,
	dataExpenses,
}: any) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [form, setForm] = useState(initialStateForm);
	const { data: session } = useSession();
	const company = useSelector(
		(state: any) => state.CompanyReducer.selectedCompany
	);
	const dispatch: Function = useDispatch();
	const user = (session?.user as unknown as UserWithMongooseId) || {};
	const email = session?.user?.email;

	const sendForm = async () => {
		if (email && email !== null && email !== undefined) {
			if (props.type === "expense") {
				if (type === "negocio") {
					dispatch(addCompanyExpense({ ...form, type: type! }, company?._id));
					setForm(initialStateForm);
					handleClose();
				} else {
					dispatch(addPersonalExpense({ ...form, type: type! }, email));
					setForm(initialStateForm);
					handleClose();
				}
			} else {
				if (type === "negocio") {
					dispatch(addCompanyIncome({ ...form, type: type! }, company?._id));
					setForm(initialStateForm);
					handleClose();
				} else {
					await dispatch(addPersonalIncome(email, { ...form, type: type! }));
					setForm(initialStateForm);
					handleClose();
				}
			}
		}
	};

	return (
		<>
			<div className="w-full flex justify-center py-2">
				<Button
					className="text-center mx-3 mb-2 text-white w-[180px]
        	btn-graphics dark:btn-graphics px-8 rounded-full"
					onClick={handleShow}
				>
					{props.buttonText}
				</Button>
			</div>

			<Modal closeModal={handleClose} showModal={show} title={`${props.title} ${props.type === 'expense'? 'gasto' : 'ingreso'}`} footer={<button onClick={sendForm} className="bg-main-yellow px-4 py-2 text-black rounded-md shadow-md">{props.buttonText}</button>}
			className="bg-light-green px-10 py-4 shadow-sm rounded-xl text-black">
				<FormRegister setForm={setForm} form={form} type={type} extraCategories={type === 'negocio'? company.categories : user.categories} />
			</Modal>

		</>
	);
}
