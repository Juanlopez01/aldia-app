import { stylesLandingContainers } from "../../Styles/Button";
import CardSectionUno from "./Card-Section";

function SectionUno() {
	return (
		<div className={`bg-[#212552] ${stylesLandingContainers}`}>
			<h1 className="text-center text-3xl font-bold py-5 text-white">
				Da un cambio en tu vida
			</h1>
			<CardSectionUno />
		</div>
	);
}
export default SectionUno;
