import { plans } from "@/utils/data";
import React from "react";
import PlanCard from "./PlanCard";
import { stylesLandingContainers } from "../../Styles/Button";

const Plans = ({ isPricingPage=false}) => {
	return (
    <div
      className={`py-16 w-full bg-light-green dark:bg-darkest-blue ${stylesLandingContainers}`}
      id="plans"
    >
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-link pb-3">
        Nuestros planes
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        {plans?.map((plan, index) =>
            <PlanCard key={index} plan={plan} isPricingPage={isPricingPage}/>
        )}
      </div>
    </div>
  )
};

export default Plans;
