import { getRole } from "@/src-client/utilities/getRole";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavbarMobile from "./Mobile"
import DesktopNvo from "./DesktopNvo";

//*render the desktop or mobile nav
const NavBar = () => {
	const { data: session } = useSession();
	const [admin, setAdmin] = useState(false);
	const email = session?.user?.email;
  const [activeSection, setActiveSection] = useState({
    left: "/home", top: ""
  });

	useEffect(() => {
		if (!admin && session && session.user) getRole(email, setAdmin);
	}, [email, admin, session]);

	return (
    <nav className="h-20">
      <div className="hidden lg:block">
        <DesktopNvo activeSection={activeSection} setActiveSection={setActiveSection}/>
      </div>

      <div className="block lg:hidden">
        <NavbarMobile activeSection={activeSection} setActiveSection={setActiveSection}/>
      </div>
    </nav>
  )
};

export default NavBar