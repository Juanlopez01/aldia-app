import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface DataType {
	_id: string;
	name: string | null;
	user: string | null;
}
interface SearchTypes {
	placeholder: string;
	data: any;
	closeModal: Function;
	sendNotification: Function | null;
	handleAcept: Function | null;
}

function SearchBar({
	placeholder,
	data,
	closeModal,
	sendNotification,
	handleAcept,
}: SearchTypes) {
	const [filteredData, setFilteredData] = useState([]);
	const [wordEntered, setWordEntered] = useState("");

	const handleFilter = (event: any) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		let newFilter;
		if (sendNotification) {
			newFilter = data.filter((value: any) => {
				return value.name.toLowerCase().includes(searchWord.toLowerCase());
			});
		} else {
			newFilter = data.filter((value: any) => {
				return value.user.toLowerCase().includes(searchWord.toLowerCase());
			});
		}
		if (searchWord === "") {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const clearInput = () => {
		setFilteredData([]);
		setWordEntered("");
	};

	const handleClick = (value: DataType) => {
		if (sendNotification) {
			Swal.fire({
				title: `Quieres unirte a ${value.name}?`,
				text: "Envía la solicitud y espera que el dueño te acepte",
				icon: "question",
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: "Enviar solicitud",
			}).then((result) => {
				if (result.isConfirmed) {
					//Enviar solicitud
					sendNotification(value._id);
					Swal.fire("Solicitud enviada correctamente", "", "success");
				}
			});
		} else if (handleAcept) {
			handleAcept(value.user);
		}
	};

	return (
		<div className="search">
			<div className="searchInputs">
				<input
					type="text"
					placeholder={placeholder}
					value={wordEntered}
					onChange={handleFilter}
					className="w-full my-2 py-2 px-2 rounded-md dark:bg-white"
				/>
			</div>
			{filteredData.length != 0 && (
				<div className="flex">
					<ul className="flex flex-col w-full " style={{ listStyleType: "initial", paddingLeft: "1rem" }}>
						{filteredData.slice(0, 15).map((value: DataType, key) => {
							return (
								<li key={sendNotification ? value.name : value.user} className="w-full flex justify-between px-2 border-b-2 border-black">
									<span>{sendNotification ? value.name : value.user}</span>
									<button
										onClick={() => {
											handleClick(value);
											closeModal();
										}}
									>
										<FontAwesomeIcon icon={faPlus} />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
			<div className="searchIcon pb-2">
				{filteredData.length === 0 ? (
					<button className="bg-main-green text-white px-4 py-1 rounded-md mt-2">
						Search
					</button>
				) : (
					<button id="clearBtn" onClick={clearInput} className="bg-main-yellow px-4 py-1 rounded-md mt-2">
						Clear
					</button>
				)}
			</div>
		</div>
	);
}

export default SearchBar;
