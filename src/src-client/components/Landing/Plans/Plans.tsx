import { plans } from "@/utils/data";
import React from "react";
import PlanCard from "./PlanCard";
import { stylesLandingContainers } from "../../Styles/Button";

const Plans = () => {
	return (
		<div className={`py-16 w-full bg-darkest-blue ${stylesLandingContainers}`}>
			<h1 className="text-center text-3xl md:text-4xl font-bold text-white pb-3">
				Nuestros planes
			</h1>
			<div className="flex flex-wrap justify-center gap-3">
				{plans?.map((plan, index) => (
					<PlanCard key={index} plan={plan} />
				))}
			</div>
		</div>
	);
};

export default Plans;
