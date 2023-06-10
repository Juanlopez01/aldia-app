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
			<div className=" bg-violet-blue-profile w-full min-h-screen flex flex-col items-center overflow-hidden py-24 px-4 mt:pt-0">
				<main className="md:flex md:flex-row md:w-[90vw] xl:w-[80vw] 2xl:w-[75vw] mx-auto my-auto self-center">
					<Welcome contentToShow={toggle} />
					<div className="w-full flex justify-center">
						<section className="max-w-2xl h-full flex flex-col md:pl-[10vw] m-auto self-center py-12 md:py-6 bg-gray-300 ">
							{toggle ? (
								<Login showRegister={toggleHandler} />
							) : (
								<Register showLogin={toggleHandler} />
							)}
							<hr />
						</section>
					</div>
				</main>
			</div>
		</>
	);
}
