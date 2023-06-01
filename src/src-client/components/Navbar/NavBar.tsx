import { getRole } from "@/src-client/utilities/getRole";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavbarDesktop from "./Desktop";
import NavbarMobile from "./Mobile"

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
				<NavbarDesktop />
			</div>

			<div className="block lg:hidden">
				<NavbarMobile />
			</div>
		</>
	);
};

export default NavBar