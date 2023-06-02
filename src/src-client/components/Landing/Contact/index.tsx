import React from "react";
import { InputTransparent } from "../../Styles/Button";

const Contact = () => {
	return (
		<div
			className="w-full bg-violet-blue-landing py-5
			"
		>
			<h1 className="text-center text-3xl font-bold text-black">
				Contáctate con nosotros
			</h1>

			{/* grid content */}
			<div className="grid lg:grid-cols-2">
				<form action="" className="px-4">
					{/* email */}
					<div className="flex flex-col items-center py-2">
						<label className="text-black">Email</label>
						<InputTransparent
							type="text"
							name="email"
							placeholder="ej. al.dia.aplication@gmail.com"
							classes="w-full max-w-[400px]"
						/>
					</div>

					{/* asunto */}
					<div className="flex flex-col items-center py-2">
						<label className="text-black">Asunto</label>
						<InputTransparent
							type="text"
							name="asunto"
							placeholder="ej. consulta de planes"
							classes="w-full max-w-[400px]"
						/>
					</div>

					{/* mensaje */}
					<div className="flex flex-col items-center py-2">
						<label className="text-black">Mensaje</label>
						<textarea 
							className="w-full max-w-[400px] border-[1px] border-main-yellow text-gray-800 rounded-[12px] px-3 py-2 bg-transparent placeholder:text-gray-500
							focus:outline-blue-600"
							placeholder="Texto">
						</textarea>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Contact;
