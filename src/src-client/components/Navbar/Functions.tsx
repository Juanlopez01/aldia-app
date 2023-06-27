import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
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
	activeSection?: { left: string; top: string };
	setActiveSection?: SetStateAction<any>;
}) => {
	const pathname = usePathname();

	useEffect(() => {
		if (
			pathname === "/home" ||
			pathname === "/admin" ||
			pathname === "/company"
		) {
			if (props.setActiveSection && pathname) {
				props.setActiveSection({ ...props.activeSection, left: pathname });
			}
		}
	}, [pathname]);

	return (
		<>
			{props?.list?.map((link: any) => {
				return (
					<div className={`flex items-center ${props?.activeSection?.left==="/admin" ? "hidden" : "flex"}`} key={link?.name}>
						{props?.section !== "sidenav" ? (
							<Link
								href={pathname?.includes("/company") ? "/company" + (link.url==="/home" ? "/" : link.url) : link?.url}
								className={`${
									!pathname?.includes(link?.endpoint) ? "unlink" : "text-link link"
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
						) : (
							//*render in sidenav
							<Link
								href={props?.activeSection?.left==="/company" ? "/company" + link?.url : link?.url}
								className={`${
									!pathname?.includes(link?.endpoint)
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
									)
								}
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
