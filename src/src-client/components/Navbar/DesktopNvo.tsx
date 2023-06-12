import React, { useEffect, useState } from "react";
import { GetNavLinks } from "./Functions";
import { links } from "@/utils/data";
import { useRouter } from "next/router";
import Logo from "../../../../assets/ALDIA.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ButtonTransparent } from "../Styles/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const DesktopNvo = () => {
	const [darkMode, setDarkMode] = useState(false)

	const { data: session } = useSession();
	const router = useRouter();

	useEffect(()=>{
		const darkStore = localStorage.getItem("darkMode")
		if(darkMode){
			setDarkMode(darkStore==="false" ? true : false)
		}
	}, [])

	const toggleTheme = () => {
		setDarkMode(prev=>!prev)
		if(!darkMode){
			localStorage.setItem("darkMode", "true")
		} else {
			localStorage.setItem("darkMode", "false")
		}
	}

	return (
		<div
			className="fixed z-[10000] w-full h-20 flex justify-between items-center bg-darkest-blue
		border-b-2 border-gray-500"
		>
			<div className="w-full h-full flex justify-between px-4 items-center">
				<div>
					<Image
						src={Logo}
						alt="logo img"
						className="w-24"
						onClick={() => router.push("/landing")}
					/>
				</div>
				<div>
					{session ? (
						<ul className="flex items-center gap-x-4">
							<GetNavLinks
								list={links?.loggedIn[0]}
								showIcons={false}
								section="sidenav"
								classes="px-12 py-1 relative top-2"
							/>
						</ul>
					) : (
						<>
							<ButtonTransparent
								handleClick={() => router.push("/")}
								color="main-yellow"
								classes="px-3 py-[4px]"
							>
								Iniciar sesión
							</ButtonTransparent>
						</>
					)}
				</div>
				<div className="w-[50px]">
					<FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="text-main-yellow text-xl cursor-pointer hover:text-white p-2 rounded-md duration-200"
					onClick={()=>toggleTheme()}/>
				</div>
				{/* <form>
					<input
						id="dark-mode"
						className="toggle text-darkest-blue "
						type="checkbox"
						name="Dark mode"
						role="switch"
						value="on"
					/>
					<div className="curtain"></div>
				</form> */}
			</div>
		</div>
	);
};

export default DesktopNvo;
