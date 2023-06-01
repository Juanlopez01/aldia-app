import { ButtonSolid, ButtonTransparent } from "../../../Styles/Button"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import celular from "../../../../../../assets/Celular.svg"

function HeroComponent() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Div 1 */}
            <div className="col-span-2">
                <div className="mx-48 my-32 grid grid-rows-3 gap-2">
                    <div className=" text-6xl text-center font-bold">Simplifica tu vida financiera con ALDíA</div>
                    <div className="flex align-items-center justify-center">
                        <p className="text-2xl text-center">Lorem ipsum dolor</p>
                    </div>
                    <div className=" flex align-items-center justify-center gap-4">
                        <ButtonTransparent
                            handleClick={() => signIn("credentials")}
                            color="main-yellow"
                        >
                            Iniciar sesión
                        </ButtonTransparent>

                        <ButtonSolid color="main-yellow">Registrarse</ButtonSolid>
                    </div>
                </div>
            </div>

            {/* Div 2 */}
            <div className=" flex align-items-center justify-center gap-4">
                <Image
                    src={celular}
                    alt="Hero"
                    width={209}
                    height={426}
                />
            </div>
        </div>
    )
}
export default HeroComponent