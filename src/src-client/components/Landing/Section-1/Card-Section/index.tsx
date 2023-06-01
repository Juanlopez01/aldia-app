import Image from "next/image";
import Imac from "../../../../../../assets/imac1.svg";
import CajaFuerte from "../../../../../../assets/open-vault1.svg";
import Locacion from "../../../../../../assets/map-location1.svg";

// Array de info
export const bdInfo = [

    {
        image: Imac,
        title: 'En tus dispositivos',
        description: 'Disponible para móvil, portátil y tablet'
    },
    {
        image: CajaFuerte,
        title: 'Toma decisiones inteligentes',
        description: 'Con nuestras herramientas tendras el control'
    },
    {
        image: Locacion,
        title: 'Logra tus metas',
        description: 'Cumple tus objetivos con el sistema de metas'
    }
]

function CardSectionUno() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {bdInfo.map((info, index) => (
                <div key={index} className=" p-4 grid grid-rows-1 gap-3">
                    <div className=" flex justify-center">
                        <Image src={info.image} alt={info.title} width={247} height={407} />
                    </div>
                    <div className=" flex justify-center text-white">
                        <h3 className=" font-bold mb-2 text-3xl">{info.title}</h3>
                    </div>
                    <div className=" flex justify-center text-white">
                        <p className="text-1xl">{info.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CardSectionUno