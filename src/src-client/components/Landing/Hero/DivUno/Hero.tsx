import { ButtonSolid, ButtonTransparent } from "../../../Styles/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import celular from "../../../../../../assets/Celular.svg";
import celular_light from "../../../../../../assets/celular_light.svg";
import { useRouter } from "next/router";

function HeroComponent() {
	const router = useRouter();
	return (
		<div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
			{/* Div 1 */}
			<div className="col-span-2">
				<div className="w-[90vw] lg:w-[80vw] xl:w-[60%] mx-auto my-20 md:my-32 grid gap-2">
					<div className="text-5xl xl:text-6xl text-center font-bold">
						CONTROLA TUS FINANZAS CON <span className="text-main-green dark:text-medium-blue">ALDIA</span>
					</div>
					<div className="flex align-items-center justify-center py-6 md:py-12">
						<p className="text-xl md:text-2xl text-center">Y con nosotros simplifica tu vida financiera</p>
					</div>
					<div className="flex align-items-center justify-center gap-4">
						<ButtonTransparent
							handleClick={() => router.push("/auth")}
							color="main-yellow"
							classes="px-4 py-2"
						>
							Iniciar sesión
						</ButtonTransparent>

						<ButtonSolid color="main-yellow" classes="px-4 py-2">
							Registrarse
						</ButtonSolid>
					</div>
				</div>
			</div>
			{/* div 2 dark */}
			<>
				{/* Div 2 desktop */}
				<div className="hidden dark:lg:flex items-center justify-center gap-4 ">
					<Image src={celular} alt="Hero" width={500} height={500} />
				</div>

				{/* Div 2 mobile */}
				<div className="hidden dark:flex dark:lg:hidden items-center justify-center gap-4 row-start-2 row-end-3 pb-16">
					<Image src={celular} alt="Hero" width={350} height={500} />
				</div>
			</>

			{/* div 2 light */}
			<>
				{/* Div 2 desktop */}
				<div className="hidden dark:hidden lg:flex items-center justify-center gap-4 ">
					<Image src={celular_light} alt="Hero" width={500} height={500} />
				</div>

				{/* Div 2 mobile */}
				<div className="flex dark:hidden lg:hidden dark:lg:hidden items-center justify-center gap-4 row-start-2 row-end-3 pb-16">
					<Image src={celular_light} alt="Hero" width={350} height={500} />
				</div>
			</>
		</div>
	);
}
export default HeroComponent;
