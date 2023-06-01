import React, { useState } from 'react'
import { ButtonTransparent } from '../Styles/Button';
import { GetNavLinks, signOutFunction } from './Functions';
import { links } from '@/utils/data';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Logo from "../../../../assets/ALDIA.png";
import Image from 'next/image';

const NavbarDesktop = () => {
	const { data: session } = useSession();
	const profile_image = session?.user?.image!;
	const [isOpenHeaderMenu, setIsOpenHeaderMenu] = useState(false);
	const router = useRouter();

	return (
		<div className="fixed z-[10000] w-full h-20 flex justify-between items-center bg-darkest-blue
		border-b-2 border-gray-500">
			<div className="w-full h-full flex justify-around items-center">
				<div>
					<Image src={Logo} alt="logo img" className="w-24" 
					onClick={()=>router.push("/")}/>
				</div>

				{!session ? (
					<>
						{/* nosotros, contacto planes */}
						<ul className="text-white flex md:gap-x-6 xl:gap-x-10 relative top-2">
							<GetNavLinks list={links?.notLoggedIn} />
						</ul>
					</>
				) : (
					<>
						{/* General, metas */}
						<ul className="flex md:gap-x-2 xl:gap-x-6 relative top-2">
							<GetNavLinks list={links?.loggedIn[0]} />
						</ul>

						{/* Personal, admin, compañías */}
						<ul className="flex md:gap-x-2 xl:gap-x-6 relative top-2">
							<GetNavLinks list={links?.loggedIn[1]} />
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
export default NavbarDesktop
