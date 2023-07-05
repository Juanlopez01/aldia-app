import Register from "./auth/Register";
import Login from "./auth/Login";
import { useToggle } from "../hooks/use-toggle";
import Welcome from "./auth/Welcome";

export default function Auth() {
	const { toggle, toggleHandler } = useToggle();

	return (
		<>
			<div className="bg-[#dfe2e6] dark:bg-violet-blue-profile w-full min-h-screen flex flex-col items-center overflow-hidden py-24 px-4 mt:pt-0">
				<main className="md:flex md:flex-row md:w-[90vw] xl:w-[80vw] 2xl:w-[75vw] mx-auto my-auto self-center">
					<Welcome contentToShow={toggle} />
					<div className="w-full flex justify-center items-center bg-light-green dark:bg-gray-300">
						<section className="w-full h-full flex flex-col md:pl-[10vw]  justify-center py-12 md:p-6 my-auto">
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
