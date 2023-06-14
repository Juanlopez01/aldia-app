import { MouseEventHandler } from "react";
import Input from "../generals/Input";
import Button from "../generals/Button";
import { useAuth } from "@/src-client/hooks/use-auth";
import ForgotPass from "./ForgotPass";
import GoogleButton from "./GoogleButton";

const authProps = {
	action: "login",
	redirect: "company",
	initialState: {
		email: "",
		password: "",
	},
	success: {
		title: "¡Te has logueado correctamente!",
		text: "Ya puedes seguir manejando tus finanzas",
		timer: 1000,
	},
};

export default function Login({
	showRegister,
}: {
	showRegister: MouseEventHandler;
}) {
	const { handerInputsChange, inputs, handlerFormSubmit, errors, isLoading } =
		useAuth(authProps);
	return (
		<>
			<section className="flex flex-col gap-2 w-full md:pt-12 p-4">
				<form onSubmit={handlerFormSubmit} className="flex flex-col gap-2">
					<h1 className="text-xl font-semibold mb-2">Ingresa a tu cuenta</h1>
					<div className="max-w-[500px]">
						<p >
							ALDIA permite hacer un seguimiento de tus finanzas personales y
							organizacionales para mejorar tu toma de decisiones.
						</p>
					</div>
					<fieldset className="flex flex-col text-start gap-2 justify-start ">
						<Input
							type="email"
							name="email"
							label="Email"
							onChange={handerInputsChange}
							value={inputs.email || ""}
							error={errors.email}
							classes="max-w-[600px]"
						/>
						<Input
							type="password"
							name="password"
							label="Contraseña"
							onChange={handerInputsChange}
							value={inputs.password || ""}
							error={errors.password}
							classes="max-w-[600px]"
						/>
					</fieldset>
					<div className="py-3 ">
						<Button
							loading={isLoading}
							classes="w-full md:w-fit text-center flex justify-center max-w-[600px] my-2"
						>
							Ingresar
						</Button>
					</div>
				</form>

				<GoogleButton>Continuar con </GoogleButton>

				<div className="xl:flex flex-wrap justify-between max-w-[610px]">
					<p className="text-sm m-0 pb-3 xl:pb-0 ">
						¿No tienes una cuenta?{" "}
						<span
							onClick={showRegister}
							className="hover:cursor-pointer font-semibold text-main-green dark:text-medium-blue"
						>
							Registrate
						</span>
					</p>
					<ForgotPass />
				</div>
			</section>
		</>
	);
}
