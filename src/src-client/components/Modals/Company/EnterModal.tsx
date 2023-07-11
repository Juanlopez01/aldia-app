import React, { useState } from "react";
import Modal from "../../generals/Modal";
import SearchBar from "../../generals/SearchBarWithResults";
import { CompanType } from "@/models/company.model";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
	getAllNames,
	sendCompanyNotification,
} from "@/redux/slice/CompanySlice";
import { useAppSelector } from "@/src-client/hooks/use-redux";

interface EnterProps {
	data: [any];
	classes?: string;
}
const EnterModal = ({ data, classes }: EnterProps) => {
	const [showModal, setShowModal] = useState(false);
	const { data: session } = useSession();
	const dispatch: Function = useDispatch();
	const closeModal = () => {
		setShowModal(false);
	};
	const sendNotification = (company: string) => {
		if (session && session.user && session.user.email) {
			dispatch(sendCompanyNotification(session.user.email, company));
		}
	};
	const sel = useAppSelector(s=>s?.CompanyReducer?.names)
	const currentCompanies = sel?.map((c: any)=>c?.name)
	const filteredCompanies = data?.filter(c=>{
		const find = currentCompanies?.find((c2: any)=>{
			return c2===c.name
		})
		if(!find) return c
	})
	const modalContent = (
		<>
			<SearchBar
				placeholder="Nombre de la compañía..."
				data={filteredCompanies}
				closeModal={closeModal}
				sendNotification={sendNotification}
				handleAcept={null}
			/>
		</>
	);

	return (
		<div>
			<button
				onClick={() => {
					setShowModal(true);
					dispatch(getAllNames());
				}}
				className={classes}
			>
				Ingresar a compañía
			</button>
			<Modal
				title="Ingresar a una compañía"
				footer=""
				showModal={showModal}
				closeModal={closeModal}
			>
				{modalContent}
			</Modal>
		</div>
	);
};

export default EnterModal;
