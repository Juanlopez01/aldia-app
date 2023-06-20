import { stylesLandingContainers } from "../../Styles/Button";
import CardSectionUno from "./Card-Section";

function SectionUno() {
	return (
		<div className={`bg-main-green dark:bg-[#212552] ${stylesLandingContainers}`}>
			<h1 className="text-center text-4xl font-bold py-5 text-white">
			Lleva el control de tus ingresos y gastos de manera eficiente y alcanza tus metas de ahorro con ALDIA
			</h1>
			<CardSectionUno />
		</div>
	);
}
export default SectionUno;
