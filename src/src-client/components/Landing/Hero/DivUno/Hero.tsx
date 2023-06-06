import { ButtonSolid, ButtonTransparent } from "../../../Styles/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import celular from "../../../../../../assets/Celular.svg";

function HeroComponent() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
			{/* Div 1 */}
			<div className="col-span-2">
				<div className="w-[90vw] lg:w-[80vw] xl:w-[60%] mx-auto my-20 md:my-32 grid gap-2">
					<div className="text-5xl xl:text-6xl text-center font-bold">
						Simplifica tu vida financiera con ALDíA
					</div>
					<div className="flex align-items-center justify-center py-6 md:py-12">
						<p className="text-xl md:text-2xl text-center">Lorem ipsum dolor</p>
					</div>
					<div className="flex align-items-center justify-center gap-4">
						<ButtonTransparent
							handleClick={() => signIn("credentials")}
							color="main-yellow"
                            classes="px-4 py-2"
						>
							Iniciar sesión
						</ButtonTransparent>

						<ButtonSolid color="main-yellow" classes="px-4 py-2">Registrarse</ButtonSolid>
					</div>
				</div>
			</div>

			{/* Div 2 desktop */}
			<div className="hidden md:flex items-center justify-center gap-4">
				<Image src={celular} alt="Hero" width={180} height={380} />
			</div>

            {/* Div 2 mobile */}       
            <div className="flex md:hidden items-center justify-center gap-4 pb-12">
				<Image src={celular} alt="Hero" width={150} height={300} />
			</div>
		</div>
	);
}
export default HeroComponent;
