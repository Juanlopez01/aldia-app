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

interface EnterProps {
	data: [any];
}
const EnterModal = ({ data }: EnterProps) => {
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

	const modalContent = (
		<>
			<SearchBar
				placeholder="Nombre de la compañía..."
				data={data}
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
			>
				Ingresar a una compañía
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
