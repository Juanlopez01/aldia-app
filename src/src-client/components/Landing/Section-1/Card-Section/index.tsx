import Image from "next/image";
import Imac from "../../../../../../assets/imac1.svg";
import CajaFuerte from "../../../../../../assets/open-vault1.svg";
import Locacion from "../../../../../../assets/map-location1.svg";

// Array de info
export const bdInfo = [
	{
		image: Imac,
		title: "En tus dispositivos",
		description: "Disponible para móvil, portátil y tablet.",
	},
	{
		image: CajaFuerte,
		title: "Toma decisiones inteligentes",
		description: "Con nuestras herramientas tendras el control.",
	},
	{
		image: Locacion,
		title: "Logra tus metas",
		description: "Cumple tus objetivos con el sistema de metas.",
	},
];

function CardSectionUno() {
	return (
		<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
			{bdInfo.map((info, index) => (
				<>
					<div key={index} className=" md:p-4 grid-rows-1 gap-3">
						{/* desktop img */}
						<div className="justify-center hidden md:flex pb-3">
							<Image src={info.image} alt={info.title} width={270} height={450} />
						</div>

						{/* mobile img */}
						<div className="justify-center flex md:hidden pb-3">
							<Image src={info.image} alt={info.title} width={180} height={320} />
						</div>

						{/* title */}
						<div className=" flex justify-center text-white">
							<h3 className=" font-bold mb-2 text-2xl md:text-3xl">{info.title}</h3>
						</div>

						{/* description */}
						<div className=" flex justify-center">
							<p className="text-link">{info.description}</p>
						</div>
					</div>
				</>
			))}
		</div>
	);
}
export default CardSectionUno;
