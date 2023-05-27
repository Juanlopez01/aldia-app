import React, { useEffect, useState } from "react";
import Logo from "../../../assets/ALDIA.png";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { getRole } from "../utilities/getRole";
import { ButtonSolid, ButtonTransparent } from "./Styles/Button";
import { links } from "@/utils/data";
// import { useRouter } from 'next/navigation';

const NavBarNvo = () => {
	const { data: session } = useSession();
	const [admin, setAdmin] = useState(false);
	const email = session?.user?.email;
	// const router = useRouter()

	useEffect(() => {
		if (!admin && session && session.user) getRole(email, setAdmin);
	}, [email, admin, session]);

	return <NavBarDesktop />;
};

const NavBarDesktop = () => {
	const { data: session } = useSession();

	return (
		<div className="w-full h-20 flex justify-between items-center bg-light-blue">
			<div className="w-full flex justify-around">
				<div>
					<Image src={Logo} alt="logo img" className="w-24" />
				</div>

				{!session ? (
					<>
						<ul className="text-white flex md:gap-x-6 xl:gap-x-10">
							{links?.notLoggedIn?.map((link) => (
									<Link href={link?.url} className="text-white no-underline" key={link?.name}>
										{link?.name}
									</Link>
								)
							)}
						</ul>
					</>
				) : (
					<>
						<ul className="flex md:gap-x-2 xl:gap-x-4">
							{links?.loggedIn[0]?.map((link) => (
									<Link href={link?.url} className="text-white no-underline" key={link?.name}>
										{link?.name}
									</Link>
								)
							)}
						</ul>

						<ul className="flex md:gap-x-2 xl:gap-x-4">
							{links?.loggedIn[1]?.map((link) => (
									<Link href={link?.url} className="text-white no-underline" key={link?.name}>
										{link?.name}
									</Link>
								)
							)}
						</ul>
					</>
				)}

				<div className="flex gap-2">
					{session && session.user ? (
						<>
							<ButtonTransparent handleClick={() => signOut()}>
								Cerrar sesión
							</ButtonTransparent>

							<ButtonSolid>Ver perfil</ButtonSolid>
						</>
					) : (
						<>
							<ButtonTransparent handleClick={() => signIn("credentials")}>
								Iniciar sesión
							</ButtonTransparent>

							<ButtonSolid>Registrarse</ButtonSolid>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const NavBarMobile = () => {
	const { data: session } = useSession();
	return (
		<div className="w-full h-20 flex justify-between items-center bg-light-blue">
			<div className="w-full flex justify-around">
				<div>
					<Image src={Logo} alt="logo img" className="w-24" />
				</div>

				<ul className="text-white flex gap-x-10">
					<Link href="" className="text-white no-underline">
						Nosotros
					</Link>

					<Link href="" className="text-white no-underline">
						Contacto
					</Link>

					<Link href="" className="text-white no-underline">
						Planes
					</Link>
				</ul>

				<div className="flex gap-2">
					{session && session.user ? (
						<>
							<ButtonTransparent handleClick={() => signOut()}>
								Cerrar sesión
							</ButtonTransparent>
							<ButtonSolid>Ver perfil</ButtonSolid>
						</>
					) : (
						<>
							<ButtonTransparent handleClick={() => signIn("credentials")}>
								Iniciar sesión
							</ButtonTransparent>
							<ButtonSolid>Registrarse</ButtonSolid>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBarNvo;
