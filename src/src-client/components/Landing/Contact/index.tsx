import React, { useState } from "react";
import { ButtonSolid, InputTransparent } from "../../Styles/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faLocationDot,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import validateForm from "./validateForm";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const initialInputs = {
		name: "",
		email: "",
		subject: "",
		message: "",
	};

	const [inputs, setInputs] = useState(initialInputs);
	const [errors, setErrors] = useState({name: "El campo nombre debe estar completo"});

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
						to_name: "Nicolás",
						from_email: inputs?.email,
						to_email: "nicovon24@gmail.com",
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
					setInputs(initialInputs)
					setErrors({name: "El campo nombre debe estar completo"})
				});
		}
	};

	return (
		<div
			className="w-full bg-violet-blue-landing py-5
			"
		>
			<h1 className="text-center text-3xl font-bold text-black pb-6">
				Contáctate con nosotros
			</h1>

			{/* grid content */}
			<div className="grid lg:grid-cols-2 w-full lg:w-11/12 xl:w-10/12 mx-auto">
				{/* contact info */}
				<div className="row-start-2 row-end-3 lg:row-start-1 lg:row-end-2 flex flex-col gap-2 mt-8 md:my-0">
					{/* phone */}
					<div className="w-[200px] flex mx-auto gap-2">
						<FontAwesomeIcon
							icon={faPhone}
							className="text-md p-2 md:text-lg text-main-yellow bg-black rounded-full"
						/>
						<span className="relative top-2 text-sm">+54 351 2111 611</span>
					</div>

					{/* location */}
					<div className="w-[200px] flex mx-auto gap-2">
						<FontAwesomeIcon
							icon={faLocationDot}
							className="text-md py-2 px-[10px] md:text-lg text-main-yellow bg-black rounded-full"
						/>
						<span className="relative top-2 text-sm">Av. Libertadores 123</span>
					</div>

					{/* email */}
					<div className="w-[200px] flex mx-auto gap-2">
						<FontAwesomeIcon
							icon={faEnvelope}
							className="text-md p-2 md:text-lg text-main-yellow bg-black rounded-full"
						/>
						<span className="relative top-2 text-sm">nep@gmail.com</span>
					</div>
				</div>

				{/* form send message */}
				<form className="px-4" onSubmit={handleSubmit}>
					<div className="grid lg:grid-cols-2 gap-4">
						{/* name */}
						<div className="flex flex-col items-center">
							<label className="text-black">Nombre</label>
							<InputTransparent
								type="text"
								name="name"
								placeholder="ej. jorge amuchastegui"
								classes="w-full max-w-[350px] lg:max-w-[1000px]"
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
								placeholder="ej. al.dia.aplication@gmail.com"
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
							className="w-full max-w-[350px] lg:max-w-[1000px] border-[1px] border-main-yellow text-gray-800 rounded-[12px] px-3 py-2 bg-transparent placeholder:text-gray-500
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
				{/* whatsapp */}
			</div>
		</div>
	);
};

export default Contact;
