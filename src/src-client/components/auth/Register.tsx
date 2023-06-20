import { MouseEventHandler } from "react";
import Input from "../generals/Input";
import Button from "../generals/Button";
import { useAuth } from "@/src-client/hooks/use-auth";
import GoogleButton from "./GoogleButton";

const authProps = {
	action: "register",
	validate: true,
	initialState: {
		email: "",
		password: "",
		name: "",
		lastname: "",
	},
	success: {
		title: "Te enviamos un email",
		text: "Revisa tu bandeja de entrada o la carpeta de spam",
	},
};
export default function Register({
	showLogin,
}: {
	showLogin: MouseEventHandler;
}) {
	const { handerInputsChange, inputs, handlerFormSubmit, errors, isLoading } =
		useAuth(authProps);
	return (
		<>
			<section className="flex flex-col px-4 pt-12">
				<h1 className="text-xl font-semibold mb-2">Registra tu cuenta</h1>
				<div className="max-w-[500px]">
					<p>
						¡No pierdas más tiempo! Regístrate en ALDIA y toma el control de tus
						finanzas personales hoy mismo. Descubre cómo ALDIA puede simplificar tu
						vida financiera y ayudarte a alcanzar la estabilidad económica que
						mereces. ¡Empieza tu viaje hacia la libertad financiera ahora mismo!
					</p>
				</div>
				<form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
					<fieldset className="flex flex-row gap-2 max-w-[620px]">
						<div className="flex flex-col  w-full">
							<Input
								type="text"
								name="name"
								label="Nombre"
								placeholder="Jhon"
								value={inputs.name || ""}
								error={errors.name}
								onChange={handerInputsChange}
								classes="w-full"
							/>
						</div>
						<div className="flex flex-col w-full">
							<Input
								type="text"
								name="lastname"
								label="Apellido"
								placeholder="Doe"
								value={inputs.lastname || ""}
								error={errors.lastname}
								onChange={handerInputsChange}
								classes="w-full"
							/>
						</div>
					</fieldset>
					<Input
						type="email"
						name="email"
						label="Correo Electrónico"
						placeholder="jhon2023@gmail.com"
						value={inputs.email || ""}
						error={errors.email}
						onChange={handerInputsChange}
						classes="max-w-[620px]"
					/>
					<Input
						type="password"
						name="password"
						label="Contraseña"
						placeholder="**********"
						value={inputs.password || ""}
						error={errors.password}
						onChange={handerInputsChange}
						classes="max-w-[620px]"
					/>
					<Button
						loading={isLoading}
						classes="w-full md:w-fit item text-center flex justify-center my-4"
					>
						Registrate
					</Button>
				</form>
				<p className="text-sm mt-2">
					¿Tienes una cuenta?{" "}
					<span
						onClick={showLogin}
						className="hover:cursor-pointer font-semibold text-blue-600"
					>
						Ingresá
					</span>
				</p>
				<GoogleButton>Registrarse con</GoogleButton>
			</section>
		</>
	);
}
