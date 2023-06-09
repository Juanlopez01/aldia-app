import React, { useState } from "react";
import {
	ButtonSolid,
	InputTransparent,
	stylesLandingContainers,
} from "../../Styles/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	IconDefinition,
	faEnvelope,
	faLocationDot,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import validateForm from "./validateForm";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Contact = (props: {showInfo?: boolean}) => {
	const initialInputs = {
		name: "",
		email: "",
		subject: "",
		message: "",
	};

	const [inputs, setInputs] = useState(initialInputs);
	const [errors, setErrors] = useState({
		name: "El campo nombre debe estar completo",
	});

	const handleChangeInput = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
		setErrors(
			validateForm({
				...inputs,
				[name]: value,
			})
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const findError = Object.values(errors).find((err) => err !== "");

		if (findError) {
			Swal.fire({
				title: "",
				html: findError,
				icon: "error",
			});
		} else {
			emailjs
				.send(
					"service_2n12b5l", //service id
					"template_eue0omc",
					{
						from_name: inputs?.name,
						to_name: "Aldia",
						from_email: inputs?.email,
						to_email: "informes@aldia.lat",
						subject: inputs?.subject,
						message: inputs?.message,
					},
					"wlCYUd_KEO_Z9vBR7"
				)
				.then(() => {
					Swal.fire({
						html: "Mensajo enviado con éxito",
						icon: "success",
					});
					setInputs(initialInputs);
					setErrors({ name: "El campo nombre debe estar completo" });
				});
		}
	};

	const dataContact = [
		{ name: "Teléfono", value: "+51 976 886 575", icon: faPhone },
		{ name: "Dirección", value: "Perú", icon: faLocationDot },
		{ name: "Mail", value: "informes@aldia.lat", icon: faEnvelope },
	];

	interface ContactProps {
		name: string;
		value: string;
		icon: IconDefinition;
	}

	const CardMap = (props: {item: ContactProps}) => (
		<div className="w-[200px] flex mx-auto gap-2" key={props?.item?.value}>
			<FontAwesomeIcon
				icon={props?.item?.icon}
				className={`
					text-[25px] bg-main-green text-link dark:text-gray-900 dark:bg-main-yellow rounded-full
					${props?.item?.name==="Dirección" ? "py-2 px-[10px]" : "p-2"}
				`}
			/>
			<span className="relative top-2 text-md">{props?.item?.value}</span>
		</div>
	);

	return (
		<div
			className={`w-full bg-light-green dark:bg-violet-blue-landing py-5 ${stylesLandingContainers}`}
			id="contact"
		>
			<h1 className="text-center text-3xl font-bold text-black pb-6">
				Contáctate con nosotros
			</h1>

			{/* grid content */}
			<div className="grid lg:flex lg:flex-wrap lg:gap-8 lg:justify-center w-full lg:w-11/12 xl:w-10/12 mx-auto">
				{/* form send message */}
				<form className="px-4" onSubmit={handleSubmit}>
					<div className="grid lg:grid-cols-2 gap-8">
						{/* name */}
						<div className="flex flex-col items-center">
							<label className="text-black">Nombre</label>
							<InputTransparent
								type="text"
								name="name"
								placeholder="ej. jorge amuchastegui"
								classes="w-full max-w-[350px] lg:min-w-[300px]"
								maxLength={40}
								handleChange={handleChangeInput}
								value={inputs?.name}
							/>
						</div>

						{/* email */}
						<div className="flex flex-col items-center">
							<label className="text-black">Email</label>
							<InputTransparent
								type="email"
								name="email"
								placeholder="ej. informes@aldia.lat"
								classes="w-full max-w-[350px] lg:max-w-[1000px]"
								maxLength={40}
								handleChange={handleChangeInput}
								value={inputs?.email}
							/>
						</div>
					</div>

					{/* asunto */}
					<div className="flex flex-col items-center py-2">
						<label className="text-black">Asunto</label>
						<InputTransparent
							type="text"
							name="subject"
							placeholder="ej. consulta de planes"
							classes="w-full max-w-[350px] lg:max-w-[1000px]"
							maxLength={50}
							handleChange={handleChangeInput}
							value={inputs?.subject}
						/>
					</div>

					{/* mensaje */}
					<div className="flex flex-col items-center py-2">
						<label className="text-black">Mensaje</label>
						<textarea
							className="border-gray-900 w-full max-w-[350px] lg:max-w-[1000px] border-[1px] text-gray-800 rounded-[12px] px-3 py-2 bg-transparent placeholder:text-gray-500
							focus:outline-blue-600 text-sm"
							placeholder="Texto"
							name="message"
							rows={6}
							maxLength={3000}
							onChange={handleChangeInput}
							value={inputs?.message}
						></textarea>
					</div>

					<div className="flex justify-center mt-4">
						<ButtonSolid classes="w-24 px-3 py-[6px]" onClick={() => ""}>
							Enviar
						</ButtonSolid>
					</div>
				</form>

				{/* contact info */}
				{props?.showInfo && 
				<div className="flex flex-col gap-2 mt-12 lg:my-4">
					{/* phone */}
					{dataContact?.map(item=><CardMap item={item} key={item?.value}/>)}
				</div>
				}
			</div>
		</div>
	);
};

export default Contact;
