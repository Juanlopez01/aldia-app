import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../assets/ALDIA.png";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { getRole } from "../utilities/getRole";
import { ButtonSolid, ButtonTransparent } from "./Styles/Button";
import { links } from "@/utils/data";
// import { useRouter } from 'next/navigation';

//*renders the lists
const GetNavLists = (props: { list: any }) => (
	<>
		{props?.list?.map((link: any) => (
			<Link href={link?.url} className="text-white no-underline" key={link?.name}>
				{link?.name}
			</Link>
		))}
	</>
);

//*render the desktop or mobile nav
const NavBar = () => {
	const { data: session } = useSession();
	const [admin, setAdmin] = useState(false);
	const email = session?.user?.email;
	// const router = useRouter()

	useEffect(() => {
		if (!admin && session && session.user) getRole(email, setAdmin);
	}, [email, admin, session]);

	return (
		<>
			<div className="hidden md:block">
				<NavBarDesktop />
			</div>

			<div className="block md:hidden">
				<NavBarMobile />
			</div>
		</>
	);
};

//todo DESKTOP NAV
const NavBarDesktop = () => {
	const { data: session } = useSession();

	return (
		<div className="fixed z-[10000] w-full h-20 flex justify-between items-center bg-light-blue">
			<div className="w-full flex justify-around">
				<div>
					<Image src={Logo} alt="logo img" className="w-24" />
				</div>

				{!session ? (
					<>
						{/* nosotros, contacto planes */}
						<ul className="text-white flex md:gap-x-6 xl:gap-x-10 relative top-2">
							<GetNavLists list={links?.notLoggedIn} />
						</ul>
					</>
				) : (
					<>
						{/* General, metas */}
						<ul className="flex md:gap-x-2 xl:gap-x-4 relative top-2">
							<GetNavLists list={links?.loggedIn[0]} />
						</ul>

						{/* Personal, admin, compañías */}
						<ul className="flex md:gap-x-2 xl:gap-x-4 relative top-2">
							<GetNavLists list={links?.loggedIn[1]} />
						</ul>
					</>
				)}

				<div className="flex gap-2">
					{!session ? (
						<>
							<ButtonTransparent
								handleClick={() => signIn("credentials")}
								color="main-yellow"
							>
								Iniciar sesión
							</ButtonTransparent>

							<ButtonSolid color="main-yellow">Registrarse</ButtonSolid>
						</>
					) : (
						<>
							<ButtonTransparent handleClick={() => signOut()} color="main-yellow">
								Cerrar sesión
							</ButtonTransparent>

							<ButtonSolid color="main-yellow">Ver perfil</ButtonSolid>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

//*todo MOBILE NAV
const NavBarMobile = () => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	const refBtn = useRef<any>(null);

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
				className="top-0 w-full
				bg-light-blue 
			"
			>
				<div className="w-[90vw] flex justify-between p-4">
					<Image src={Logo} alt="logo img" className="w-24" />
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
				className={`w-[50vw] bg-light-blue p-2 min-h-screen translateNav
			${isOpen ? "block" : "hidden"}`}
			>
				<div className="flex flex-col justify-between text-white">
					<>
						{!session ? (
							<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
								{links?.notLoggedIn?.map((link) => (
									<Link
										href={link?.url}
										className="text-white no-underline text-[18px]"
										key={link?.name}
									>
										{link?.name}
									</Link>
								))}
							</ul>
						) : (
							<>
								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLists list={links?.loggedIn[0]} />
								</ul>

								<hr className="border-2 border-darkest-blue"></hr>

								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLists list={links?.loggedIn[1]} />
								</ul>
							</>
						)}

						<hr className="border-2 border-darkest-blue"></hr>

						{/* ingresar, registrar */}
						<div className="flex gap-2 pl-4 pt-4">
							{!session ? (
								<div className="flex flex-col gap-y-4 text-black">
									<ButtonTransparent handleClick={() => signIn("credentials")}>
										Iniciar sesión
									</ButtonTransparent>

									<ButtonSolid>Registrarse</ButtonSolid>
								</div>
							) : (
								<div className="flex flex-col gap-y-6">
									<ButtonTransparent handleClick={() => signOut()}>
										Cerrar sesión
									</ButtonTransparent>

									<ButtonSolid>Ver perfil</ButtonSolid>
								</div>
							)}
						</div>
					</>
				</div>
			</div>
			)
		</div>
	);
};

export default NavBar;
