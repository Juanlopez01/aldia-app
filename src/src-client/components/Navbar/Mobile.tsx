import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import { ButtonTransparent } from '../Styles/Button';
import { GetNavLinks, signOutFunction } from './Functions';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Logo from "../../../../assets/ALDIA.png";
import { links } from '@/utils/data';
import Image from 'next/image';

//*todo MOBILE NAV
const NavbarMobile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: session } = useSession();
	const profile_image = session?.user?.image!;

	const refBtn = useRef<any>(null);
	const router = useRouter();

	const handleAnimateHamburger = (changeToggle = true) => {
		//*animation
		if (refBtn.current) {
			const element = refBtn.current;
			refBtn.current?.classList?.toggle("toggle-btn");
		}
		if (changeToggle === true) {
			setIsOpen((prev) => !prev);
		}
	};

	return (
		<div className="fixed z-[1000000] w-full">
			<div
				className={`top-0 w-full
				${isOpen ? "bg-light-blue" : "bg-darkest-blue"}
			`}
			>
				<div className="w-[90vw] flex justify-between p-4">
					<Image src={Logo} alt="logo img" className="w-24" onClick={()=>router.push("/landing")}/>
					<button
						id="hamburger-menu"
						className="text-3xl lg:hidden cursor-pointer relative w-8 h-8"
						ref={refBtn}
						onClick={() => handleAnimateHamburger()}
					>
						<div
							className={`bg-white ${
								isOpen ? "w-0" : "w-8"
							} h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500 before:content-[''] before:bg-white before:w-8 before:h-1 before:rounded before:absolute before:transition-all before:duration-500 before:-translate-x-4 before:-translate-y-3
							after:content-[''] after:bg-white after:w-8 after:h-1 after:rounded after:absolute after:transition-all after:duration-500 after:-translate-x-4 after:translate-y-3`}
						></div>
					</button>
				</div>
			</div>
			<div
				className={`bg-light-blue max-w-[300px] p-2 min-h-screen translateNav border-t-2 border-white
			${isOpen ? "block" : "hidden"}`}
			>
				{/* lists of links */}
				<div className="flex flex-col justify-between text-white">
					<>
						{!session ? (
							<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
								<GetNavLinks
									list={links?.notLoggedIn}
									screen="mobile"
									setIsOpen={setIsOpen}
									handleAnimateHamburger={handleAnimateHamburger}
									showIcons={true}
								/>
							</ul>
						) : (
							<>
								<hr className="border-2 border-darkest-blue"></hr>

								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLinks
										list={links?.loggedIn[0]}
										screen="mobile"
										setIsOpen={setIsOpen}
										handleAnimateHamburger={handleAnimateHamburger}
										showIcons={true}
									/>
								</ul>

								<hr className="border-2 border-darkest-blue"></hr>
								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLinks
										list={links?.loggedIn[1]}
										screen="mobile"
										setIsOpen={setIsOpen}
										handleAnimateHamburger={handleAnimateHamburger}
										showIcons={true}
									/>
								</ul>
							</>
						)}

						<hr className="border-2 border-darkest-blue"></hr>

						{/* ingresar, registrar */}
						<div className="flex gap-2 pl-4 pt-4">
							{!session ? (
								<div className="flex flex-col gap-y-4 text-black">
									<ButtonTransparent handleClick={() => router.push("/")}
									classes="px-3 py-[4px]">
										Iniciar sesión
									</ButtonTransparent>

									{/* <ButtonSolid>Registrarse</ButtonSolid> */}
								</div>
							) : (
								<div className="w-full bg-darkest-blue shadow-lg rounded-full px-3 py-2 flex justify-center items-center gap-x-3">
									<button className="">
										<img
											src={profile_image}
											alt="profile img"
											className="w-[60px] rounded-full"
											onClick={() => {
												handleAnimateHamburger();
												router.push("/account");
											}}
										/>
									</button>
									<span className="w-full truncate drow-shadow-xl">{session?.user?.name}</span>

									{/* log out */}
									<FontAwesomeIcon
										icon={faRightFromBracket}
										className="text-xl cursor-pointer"
										onClick={()=>{
											handleAnimateHamburger();
											signOutFunction();
										}}
									/>
								</div>
							)}
						</div>
					</>
				</div>
			</div>
		</div>
	);
};

export default NavbarMobile
