import { stylesLandingContainers } from "../../Styles/Button";
import CardSectionUno from "./Card-Section";

function SectionUno() {
	return (
		<div className={`bg-main-green dark:bg-[#212552] ${stylesLandingContainers}`}
			id="section1"
		>
			<h1 className="text-center text-4xl font-bold pt-5 px-4 pb-2 text-white">
			Alcanza tus metas de ahorro con ALDIA
			</h1>
			<CardSectionUno />
		</div>
	);
}
export default SectionUno;
