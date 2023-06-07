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
					</section>
				</div>
			</main>
		</>
	);
}
