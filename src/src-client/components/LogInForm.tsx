import { signIn } from "next-auth/react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { useToggle } from "../hooks/use-toggle";
import Google from "./svgs/google";
import Welcome from "./auth/Welcome";

export default function Auth() {
	const { toggle, toggleHandler } = useToggle();

	return (
		<>
			<main className="md:flex md:flex-row w-full self-center">
				<Welcome contentToShow={toggle} />
				<div className="w-full flex justify-center">
					<section className="w-full h-full flex flex-col pl-[10vw] m-auto self-center py-12 md:py-6 bg-gray-300 ">
						{toggle ? (
							<Login showRegister={toggleHandler} />
						) : (
							<Register showLogin={toggleHandler} />
						)}
						<hr />
						<section className="flex flex-col gap-4 md:max-w-[230px] px-4">
							<button
								onClick={() =>
									signIn("google", {
										callbackUrl: `${window.location.origin}/company`,
									})
								}
								className="flex items-center justify-center gap-2 py-2 border-2 border-main-green bg-white rounded "
							>
								<p className="m-0 ">Continuar con </p>
								<Google className="h-4 w-4" />
							</button>
							{/* <button onClick={() => signIn('facebook')}>
              Continuar con Facebook
            </button> */}
						</section>
					</section>
				</div>
			</main>
		</>
	);
}
