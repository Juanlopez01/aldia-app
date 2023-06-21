import Contact from "@/src-client/components/Landing/Contact";
import { FAQuestion } from "@/src-client/components/faqs/FAQuestions";
import { questions } from "@/utils/data";

export default function PageFQAs() {
	return (
		<>
			<div className="bg-light-green dark:bg-violet-blue-landing min-h-[70vh]">
				<main className="grid-cols-2 pt-12 flex flex-wrap gap-4 justify-center mx-auto max-w-[1400px]">
					<header className="max-w-lg flex flex-col gap-2">
						<h1 className="m-0 text-4xl font-extrabold text-medium-blue">¡Hola!</h1>
						<h2 className="m-0 text-xl font-bold">¿En qué podemos ayudarte?</h2>
						<p className="m-0 text-base">
							Ésta es la página ayuda, preguntas frecuentes o FAQs
							{` (Frequently Asked Questions en inglés).`}
						</p>
						<p className="m-0 text-base">
							Si no encuentras una FAQ que solucione tu inconveniente, no dudes en
							enviar un Email en la seccion de &lsquo;Contáctate con nosotros&lsquo; y
							en campo de &lsquo;Asunto&lsquo; coloca el problema que tuviste.
						</p>
					</header>
					<section className="max-w-[1400px] w-auto px-4">
						{questions.map((question, i) => (
							<FAQuestion key={i} {...question} />
						))}
					</section>
					{/* <footer>
						<Contact showInfo={false} />
					</footer> */}
				</main>
			</div>
		</>
	);
}
