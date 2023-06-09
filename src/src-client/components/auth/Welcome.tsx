import Image from "next/image";
import Star from "../svgs/star";
import Check from "../svgs/check";
import DarkMode from "../Navbar/DarkMode";

const PROS_QUOTES: String[] = [
	"Gestiona tus ingresos y egresos de manera intuitiva.",
	"Visualiza tu progreso con gráficos y reportes claros.",
	"Establece metas de ahorro y haz un seguimiento de tus progresos.",
];

export default function Welcome({ contentToShow }: { contentToShow: Boolean }) {
	return (
		<>
			<section
				className={`w-full md:w-8/12 lg:w-1/2 xl:w-1/3 bg-main-green dark:bg-darkest-blue text p-8 ${
					contentToShow ? "justify-between" : ""
				} text-white flex-col overflow-hidden flex-wrap md:py-16 relative z-[100] hidden md:flex`}
			>
				<header className="grid gap-2 pb-4  !overflow-clip">
					<h1 className="text-3xl xl:text-4xl font-black ">Bienvenido a ALDIA</h1>
					<p>La aplicación de finanzas por excelencia</p>
					<DarkMode />
				</header>
				<div>
					{contentToShow ? (
						<>
							<div>
								<article>
									<div className="flex mb-4">
										<Star /> <Star /> <Star /> <Star /> <Star />
									</div>
									<p>
										¡Nos encantó Aldia! La uso todo el tiempo para administrar la
										contabilidad de mi empresa.
									</p>
								</article>
								<div className="flex gap-2">
									<Image
										src="/quote-img.webp"
										width="40"
										height="40"
										alt="quote image"
										className="rounded-full"
									/>
									<div className="">
										<h4 className="font-semibold text-sm">Devon Lane</h4>
										<h5 className="text-xs ">CO-Founder, Desing.co</h5>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col gap-2 z-0">
								{PROS_QUOTES.map((quote, index) => (
									<article key={index} className="flex flex-row  items-center gap-2">
										<Check />
										<p className="m-0">{quote}</p>
									</article>
								))}
							</div>
						</>
					)}
					<div>
						<div className=" absolute rounded-full border-4 border-white -bottom-1/3 left-2/3 w-3/4 h-1/2 bg-transparent"></div>
						<div className=" absolute rounded-full border-4 border-white/20 -top-[20%] -left-1/2 w-2/3 h-1/3 bg-transparent"></div>
					</div>
				</div>
			</section>
		</>
	);
}
