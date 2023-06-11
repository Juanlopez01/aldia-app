import React from "react";
import { GetNavLinks } from "./Functions";
import { links } from "@/utils/data";
import { useRouter } from "next/router";
import Logo from "../../../../assets/ALDIA.png";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { ButtonTransparent } from "../Styles/Button";
import Link from "next/link";

const DesktopNvo = () => {
  const { data: session } = useSession();
  const router = useRouter()
	return (
		<div
			className="fixed z-[10000] w-full h-20 flex justify-between items-center bg-darkest-blue
		border-b-2 border-gray-500"
		>
			<div className="w-full h-full flex justify-between px-4 items-center">
        <div>
        <Image src={Logo} alt="logo img" className="w-24" onClick={()=>router.push("/landing")}/>
        </div>
				<div>
					{session 
          ? <ul className="flex items-center gap-x-4">
						<GetNavLinks
							list={links?.loggedIn[0]}
							showIcons={false}
							section="sidenav"
              classes="px-12 py-1 relative top-2"
						/>
					</ul> 
          : <Link href='/auth'>
          <ButtonTransparent
            color="main-yellow"
            classes="px-3 py-[4px]"
          >
            Iniciar sesión
          </ButtonTransparent>
        </Link>}
					{/* {<Image src={Logo} alt="logo img" className="w-24 cursor-pointer" 
					onClick={()=>router.push("/landing")}/>} */}
				</div>
			</div>
		</div>
	);
};

export default DesktopNvo;
