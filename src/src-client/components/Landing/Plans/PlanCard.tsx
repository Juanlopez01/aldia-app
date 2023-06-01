import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PlanCard = (props: plansProps) => {
	const { name, color, price, subtext } = props?.plan;
	return (
		<div
			className={`w-10/12 md:max-w-[350px] min-h-[60vh] rounded-[4px]
    border-[1px] border-gray-500 shadow-xl bg-[#181a1b]
    flex flex-col text-${color.text}`}
		>
			{/* main info */}
			<div
				className={`w-full rounded-t-[4px] p-2 bg-${color.bg}
      flex flex-col gap-y-2 ]`}
			>
				<span className="text-xl font-bold">{name}</span>
				<span>{subtext}</span>

				{/* description and price */}
				<div className={`text-${color.text}`}>
					<span className="text-xl font-bold">${price} / mes</span>
				</div>
			</div>

			{/* text container */}
			<div className={`text-${color.text} flex flex-col px-2 pt-2`}>

				{/*tags, BORRAR y reemplazar por actual tags */}
				<div>
					<FontAwesomeIcon icon={faCheck} className={`text-white`}/>
					<span className={`text-white`}>{subtext}</span>
				</div>

				{/* button */}
				<div>
					<FontAwesomeIcon icon={faCheck} className={`text-white`}/>
					<span className={`text-white`}>{subtext}</span>
				</div>
				<div>
					<FontAwesomeIcon icon={faCheck} className={`text-white`}/>
					<span className={`text-white`}>{subtext}</span>
				</div>
				<button className={`bg-${color.bg} w-auto rounded-[4px] px-2 py-2 mx-auto my-4`}>Empieza ahora!</button>
			</div>
		</div>
	);
};

//*types
interface color {
	bg: string;
	text: string;
}

type plansProps = {
	plan: {
		name: string;
		color: color;
		subtext: string;
		price: number;
	};
};

export default PlanCard;
