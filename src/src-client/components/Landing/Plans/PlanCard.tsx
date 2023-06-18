import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import CheckoutModal from "./Checkout.modal";
import { PlansTypes } from "@/types/models.type";

const PlanCard = ({plan, isPricingPage}: plansProps) => {
	const { name, color, price, subtext, tags, value} = plan;
	const { bg, text, text_check, bg_button, color_border_button, color_text_button } = color;
	const text_color = text;
	const plan_bg_color = bg;

  const btnStyles= `bg-${bg_button} w-full rounded-[4px] px-2 py-2 mx-auto my-4
  text-center no-underline border-2
  outline-2 hover:bg-opacity-90 ${color_border_button} ${color_text_button}`
	return (
    <div
      className={`w-11/12 md:max-w-[380px] min-h-[60vh] rounded-[4px]
			border-[1px] border-gray-500 shadow-xl ${
        /* no anda sin validación */ bg === 'bg-secondary-yellow'
          ? 'bg-secondary-yellow'
          : bg
      } flex flex-col text-${text_color} px-3 py-2`}
    >
      {/* main info */}
      <div
        className={`w-full rounded-t-[4px] p-2 flex flex-col gap-y-2 ]`}
      >
        <span className="text-xl font-bold">{name}</span>
        <span>{subtext}</span>

        {/* description and price */}
        <div className={`text-${text_color}`}>
          <div className="flex items-center">
            <span className="text-[45px] font-bold">${price}</span>
            <span>&nbsp; / Mes</span>
          </div>
        </div>
      </div>

      {isPricingPage ? (
        <CheckoutModal
          value={value as PlansTypes}
          classBtn={btnStyles}
          name={name}
        />
      ) : (
        <Link href={`/pricing#${value}`} className={btnStyles}>
          Empieza ahora!
        </Link>
      )}

      {/* text container */}
      <div className={`text-${text_color} pt-2`}>
        {tags?.['check']?.map((tag: Array<string>, index: number) => (
          <div key={index} className="flex">
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 py-1 px-[6px] text-xl bg-gray-900 dark:bg-link text-link dark:text-gray-900 rounded-full`}
            />
            <p className="py-1 text-sm">{tag}</p>
          </div>
        ))}
        {tags?.['cross']?.map((tag: Array<string>, index: number) => (
          <div key={index} className="flex">
            <FontAwesomeIcon
              icon={faClose}
              className={`mr-3 py-1 px-[6px] text-xl bg-gray-900 dark:bg-link text-link dark:text-gray-900 rounded-full`}
            />
            <p className="py-1 text-sm">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

//*types
interface color {
	bg: string;
	text: string;
	bg_button?: string;
	color_border_button: string;
	color_text_button: string;
	text_check: string;
}

type plansProps = {
	isPricingPage: boolean;
	plan: {
		name: string;
		color: color;
		subtext: string;
		price: number;
		tags: any;
		value: string;
	};
};

export default PlanCard;
