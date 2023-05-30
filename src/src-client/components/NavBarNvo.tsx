import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import Logo from "../../../assets/ALDIA.png";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { signOut, useSession } from "next-auth/react";
import { getRole } from "../utilities/getRole";
import { ButtonTransparent } from "./Styles/Button";
import { links } from "@/utils/data";
import { usePathname, useRouter} from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

//*renders the lists
const GetNavLists = (props: {
	list: any;
	screen?: string;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	handleAnimateHamburger?: () => void;
	resolvedUrl?: any
}) => {
	const pathname = usePathname();

	return (
		<>
			{props?.list?.map((link: any) => (
				<div className="" key={link?.name}>
					<Link
						href={link?.url}
						className={`${pathname===link?.endpoint ? "unlink" : "text-link link"} no-underline`}
						onClick={() =>
							props?.screen === "mobile" &&
							props.setIsOpen &&
							props?.handleAnimateHamburger &&
							props?.handleAnimateHamburger()
						}
					>
						<span className="mr-[6px] inline lg:hidden xl:inline">{link?.icon}</span>
						<span>{link?.name}</span>
					</Link>
				</div>
			))}
		</>
	);
};

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
			<div className="hidden lg:block">
				<NavBarDesktop />
			</div>

			<div className="block lg:hidden">
				<NavBarMobile />
			</div>
		</>
	);
};

//todo DESKTOP NAV
const NavBarDesktop = () => {
	const { data: session } = useSession();
	const profile_image = session?.user?.image!;
	const [isOpenHeaderMenu, setIsOpenHeaderMenu] = useState(false);
	const router = useRouter();

	return (
		<div className="fixed z-[10000] w-full h-20 flex justify-between items-center bg-darkest-blue">
			<div className="w-full h-full flex justify-around items-center">
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
						<ul className="flex md:gap-x-2 xl:gap-x-6 relative top-2">
							<GetNavLists list={links?.loggedIn[0]} />
						</ul>

						{/* Personal, admin, compañías */}
						<ul className="flex md:gap-x-2 xl:gap-x-6 relative top-2">
							<GetNavLists list={links?.loggedIn[1]} />
						</ul>
					</>
				)}

				<div className="flex gap-2">
					{session && session?.user?.image ? (
						<>
							{session && (
								<>
									<div
									// onMouseOver={() => setIsOpenHeaderMenu(() => true)}
									// onMouseLeave={() => setIsOpenHeaderMenu(() => false)}
									>
										<img
											src={profile_image}
											alt="profile img"
											className="w-[50px] h-[50px] rounded-full cursor-pointer"
											onClick={() => setIsOpenHeaderMenu((prev) => !prev)}
										/>

										{/* transition animation */}
										{isOpenHeaderMenu && (
											<div className={`absolute z-[10000] w-[400px] text-[16px]`}>
												<ul
													className={`bg-gray-600 shadow-lg shadow-gray-600 relative right-[177px] top-1 flex flex-col w-1/2 py-3 rounded-[5px] text-white`}
												>
													<li
														className="hover:text-main-yellow cursor-pointer py-2"
														onClick={() => {
															setIsOpenHeaderMenu(false);
															router.push("/account");
														}}
													>
														Ver perfil
													</li>
													<li
														className="hover:text-main-yellow cursor-pointer py-2"
														onClick={() => signOutFunction()}
													>
														Cerrar Sesión
													</li>
												</ul>
											</div>
										)}
									</div>
								</>
							)}
						</>
					) : (
						<>
							<ButtonTransparent
								handleClick={() => router.push("/")}
								color="main-yellow"
							>
								Iniciar sesión
							</ButtonTransparent>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

//*todo MOBILE NAV
const NavBarMobile = () => {
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
				className={`bg-light-blue max-w-[300px] p-2 min-h-screen translateNav border-t-2 border-white
			${isOpen ? "block" : "hidden"}`}
			>
				{/* lists of links */}
				<div className="flex flex-col justify-between text-white">
					<>
						{!session ? (
							<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
								<GetNavLists
									list={links?.notLoggedIn}
									screen="mobile"
									setIsOpen={setIsOpen}
									handleAnimateHamburger={handleAnimateHamburger}
								/>
							</ul>
						) : (
							<>
								<hr className="border-2 border-darkest-blue"></hr>

								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLists
										list={links?.loggedIn[0]}
										screen="mobile"
										setIsOpen={setIsOpen}
										handleAnimateHamburger={handleAnimateHamburger}
									/>
								</ul>

								<hr className="border-2 border-darkest-blue"></hr>
								<ul className="text-white flex flex-col gap-y-4 relative right-4 pt-8">
									<GetNavLists
										list={links?.loggedIn[1]}
										screen="mobile"
										setIsOpen={setIsOpen}
										handleAnimateHamburger={handleAnimateHamburger}
									/>
								</ul>
							</>
						)}

						<hr className="border-2 border-darkest-blue"></hr>

						{/* ingresar, registrar */}
						<div className="flex gap-2 pl-4 pt-4">
							{!session ? (
								<div className="flex flex-col gap-y-4 text-black">
									<ButtonTransparent handleClick={() => router.push("/")}>
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

//* sign out function with sweet alert
function signOutFunction() {
	Swal.fire({
		title: "Está por cerrar sesión",
		text: "¿Estás seguro?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "Sí",
		cancelButtonText: "No",
	}).then((result) => {
		if (result.isConfirmed) {
			signOut();
		}
	});
}

export default NavBar;