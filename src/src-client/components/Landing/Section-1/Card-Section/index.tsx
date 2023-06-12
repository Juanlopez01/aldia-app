import Image from "next/image";
import Imac from "../../../../../../assets/imac1.svg";
import CajaFuerte from "../../../../../../assets/open-vault1.svg";
import Locacion from "../../../../../../assets/map-location1.svg";
import ImacLight from "../../../../../../assets/imac2.svg";
import CajaFuerteLight from "../../../../../../assets/open-vault2.svg";
import LocacionLight from "../../../../../../assets/map-location2.svg";

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

export const bdInfoLight = [
	{
		image: ImacLight,
		title: "En tus dispositivos",
		description: "Disponible para móvil, portátil y tablet.",
	},
	{
		image: CajaFuerteLight,
		title: "Toma decisiones inteligentes",
		description: "Con nuestras herramientas tendras el control.",
	},
	{
		image: LocacionLight,
		title: "Logra tus metas",
		description: "Cumple tus objetivos con el sistema de metas.",
	},
];

function CardSectionUno() {
	return (
		<>
			{/* dark */}
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
							<div className=" flex justify-center text-link">
								<h3 className=" font-bold mb-2 text-2xl md:text-3xl">{info.title}</h3>
							</div>

							{/* description */}
							<div className=" flex justify-center">
								<p className="text-gray-300">{info.description}</p>
							</div>
						</div>
					</>
				))}
			</div>
		</>
	);
}
export default CardSectionUno;



// {/* light mode, changes color images */}
// <div className="grid dark:hidden md:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
// 	{bdInfo.map((info, index) => (
// 		<>
// 			<div key={index} className=" md:p-4 grid-rows-1 gap-3">
// 				{/* desktop img */}
// 				<div className="justify-center hidden md:flex pb-3">
// 					<Image src={info.image} alt={info.title} width={410} height={550} />
// 				</div>

// 				{/* mobile img */}
// 				<div className="justify-center flex md:hidden pb-3">
// 					<Image src={info.image} alt={info.title} width={280} height={400} />
// 				</div>

// 				{/* title */}
// 				<div className=" flex justify-center text-gray-900 dark:text-link">
// 					<h3 className=" font-bold mb-2 text-2xl md:text-3xl">{info.title}</h3>
// 				</div>

// 				{/* description */}
// 				<div className=" flex justify-center">
// 					<p className="text-gray-900 dark:text-gray-400">{info.description}</p>
// 				</div>
// 			</div>
// 		</>
// 	))}
// </div>