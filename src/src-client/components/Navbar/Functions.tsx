import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

const GetNavLinks = (props: {
	list: Array<any>;
	screen?: string;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	handleAnimateHamburger?: () => void;
	resolvedUrl?: any;
	showIcons?: boolean;
	section?: string;
	classes?: string;
	isAdmin?: boolean;
}) => {
	const pathname = usePathname()
	return (
		<>
			{props?.list?.map((link: any) => {
				if(!props.isAdmin && link.name === 'Administrador') return null
				return (
					<div className="flex items-center" key={link?.name}>
						{props?.section !== "sidenav" 
						? (
							<Link
								href={link?.url}
								className={`${
									pathname === link?.endpoint ? "unlink" : "text-link link"
								} no-underline`}
								onClick={() =>
									props?.screen === "mobile" &&
									props.setIsOpen &&
									props?.handleAnimateHamburger &&
									props?.handleAnimateHamburger()
								}
							>
								{props?.showIcons && (
									<span className="mr-[6px] inline lg:hidden xl:inline">
										{link?.icon}
									</span>
								)}
								<span>{link?.name}</span>
							</Link>
						) 
						//*render in sidenav
						: (
							<Link
								href={link?.url}
								className={`${
									pathname !== link?.endpoint
										? "dark:text-link dark:bg-light-blue text-gray-900 bg-link"
										: "bg-main-yellow dark:hover:!bg-secondary-yellow text-black"
								}  no-underline rounded-full text-center w-full 
								relative right-3 ${props?.classes} ${props?.classes} 
								`}
								onClick={() =>
									props?.screen === "mobile" &&
									props.setIsOpen &&
									props?.handleAnimateHamburger &&
									props?.handleAnimateHamburger()
								}
							>
								{
								/* icon */
								props?.showIcons && (
									<span className="mr-[6px] inline lg:hidden xl:inline">
										{link?.icon}
									</span>
								)}
								<span>{link?.name}</span>
							</Link>
						)}
					</div>
				);
			})}
		</>
	);
};

const signOutFunction = () => {
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
};

export { signOutFunction, GetNavLinks };
