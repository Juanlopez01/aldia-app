import React, { useState } from "react";
import Modal from "../../generals/Modal";
import Swal from "sweetalert2";
import SearchBar from "../../generals/SearchBarWithResults";
import { aceptNotification } from "@/redux/slice/CompanySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Notifications = ({ data, dispatch }: any) => {
	const [show, setShow] = useState(false);
	const closeModal = () => {
		setShow(false);
	};
	//HACER TODO EL MODAL Y LA VISUALIZACION DE LAS NOTIFS

	const handleAcept = (user: string) => {
		Swal.fire({
			title: `Aceptar la solicitud de ${user}`,
			text: "Esta persona ahora podrá ver las transacciones de tu compañía",
			icon: "warning",
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: "Aceptar solicitud",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(aceptNotification(user, data._id));
			}
		});
	};

	const usersListSet = new Set();
	data.notifications?.forEach((user: any) => usersListSet.add(user.user));
	let usersList: any = [];
	usersListSet.forEach((user: any) => usersList.push(user));

	const {notifications} = data

	const list = (
		<>
			{data.notifications.length > 0 && data.notifications.length < 10 && (
				<ul>
					{usersList.map((user: any) => {
						return (
							<li key={user} className="flex gap-5">
								<span>{user}</span>
								<button
									onClick={() => {
										handleAcept(user);
										closeModal();
									}}
								>
									<FontAwesomeIcon icon={faUserPlus} className="m-auto" />
								</button>
							</li>
						);
					})}
				</ul>
			)}
			{data.notifications.length >= 10 && (
				<SearchBar
					data={usersList.map((notif: any) => notif.user)}
					closeModal={closeModal}
					placeholder="Escribe el correo del usuario"
					handleAcept={handleAcept}
					sendNotification={null}
				/>
			)}
		</>
	);
	return (
		<div className="">
			<div className="pt-4">
				<button
					onClick={() => {
						setShow(true);
					}}
					className={`${notifications?.length>0 ? "bg-[#b93d30] text-white" : "bg-[#e9ecef]"} border-2 border-[#dbddf0] px-3 py-2 rounded-xl`}
				>
					Notificaciones
					{notifications?.length>0 ? ` (${notifications.length})` : ""}
				</button>
			</div>
			<Modal
				showModal={show}
				closeModal={closeModal}
				title="Notificaciones"
				footer={<></>}
			>
				{list}
			</Modal>
		</div>
	);
};

export default Notifications;
