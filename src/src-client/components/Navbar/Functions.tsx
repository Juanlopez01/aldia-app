import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

const GetNavLinks = (props: {
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
}

export {signOutFunction, GetNavLinks}