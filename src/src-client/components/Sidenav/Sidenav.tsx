import { ButtonSolid } from "../Styles/Button";
import { GetNavLinks, signOutFunction } from "../Navbar/Functions";
import { links } from "@/utils/data";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
// const regexImg = /\.(jpeg|jpg|gif|png|webp)$/;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/src-client/hooks/use-redux";

const Sidenav = () => {
	const { data: session } = useSession();
	const profile_image = session?.user?.image!;
	const router = useRouter();

	const { user } = useAppSelector((s) => s.PersonalReducer);

	return (
		<div
			className={`w-[20vw] bg-main-green dark:bg-darkest-blue text-white hidden lg:flex flex-col px-2 min-h-screen ${
				session ? "" : "hidden"
			}`}
		>
			<div className="h-screen flex flex-col justify-around">
				{/* profile container and links */}
				<div className="gap-2 pr-2 pt-4">
					{
						/* profile */
						!session ? (
							""
						) : (
							<div
								className="w-full bg-main-yellow shadow-lg rounded-full px-3 py-2 flex justify-center items-center gap-x-3
							cursor-pointer"
								onClick={() => {
									router.push("/account");
								}}
							>
								<button className="">
									<Image
										src={profile_image}
										alt="profile img"
										className="w-[60px] rounded-full"
										width={60}
										height={60}
										onClick={() => {
											router.push("/account");
										}}
									/>
								</button>
								<span className="w-full truncate drow-shadow-xl text-black font-bold">
									{session?.user?.name + " " + user?.lastname}
								</span>

								{/* log out */}
							</div>
						)
					}

					{/* navlinks: personal, admin, companies */}
					<ul className="flex flex-col gap-y-6 pt-12">
						<GetNavLinks
							list={user?.role === 'admin' ? links?.loggedIn[2] : links.loggedIn[1]}
							showIcons={false}
							section="sidenav"
							classes="px-6 py-2 hover:opacity-80"
							isAdmin={user?.role === 'admin'}
						/>
					</ul>
				</div>

				{/* */}
				<div className="pl-4 pr-2">
					<ButtonSolid
						classes="w-full p-2 flex justify-center items-center gap-2"
						onClick={() => signOutFunction()}
					>
						Cerrar sesión
						<FontAwesomeIcon
							icon={faRightFromBracket}
							className="text-md cursor-pointer text-black"
						/>
					</ButtonSolid>
				</div>
			</div>
		</div>
	);
};

export default Sidenav;
