import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faBullseye,
	faUser,
	faPhone,
	faLandmarkDome,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const links = {
	loggedIn: [
		[
			{
				name: "General",
				url: "/home",
				endpoint: "/home",
				icon: <FontAwesomeIcon icon={faUsers} />,
			},
			{
				name: "Metas",
				url: "/goals",
				endpoint: "/goals",
				icon: <FontAwesomeIcon icon={faBullseye} />,
			},
			{
				name: "Créditos",
				url: "/credit",
				endpoint: "/credit",
				icon: <FontAwesomeIcon icon={faBullseye} />,
			},
		],
		[
			{
				name: "Personal",
				url: "/home",
				endpoint: "/",
				icon: <FontAwesomeIcon icon={faUser} />,
			},
			{
				name: "Administrador",
				url: "/admin",
				endpoint: "/admin",
				icon: <FontAwesomeIcon icon={faLandmarkDome} />,
			},
			{
				name: "Compañías",
				url: "/company",
				endpoint: "/company",
				icon: <FontAwesomeIcon icon={faChartSimple} />,
			},
		],
	],
	notLoggedIn: [
		{
			name: "Nosotros",
			url: "/",
			endpoint: "/us",
			icon: <FontAwesomeIcon icon={faUsers} />,
		},
		{
			name: "Contacto",
			url: "/",
			endpoint: "/contact",
			icon: <FontAwesomeIcon icon={faPhone} />,
		},
		{ name: "Planes", url: "/", endpoint: "plans" },
	],
};

const colors = {
	lightGreen: "light-green",
	blue: "light-blue",
	yellow: "secondary-yellow",
	light_text: "link",
	dark_text: "gray-900",
	hover_btn: "#4b58bd"
};

const { blue, yellow, light_text, dark_text, hover_btn, lightGreen } = colors;

const plans = [
	{
		name: "Gratuito",
		value: 'free',
		color: {
			bg: `dark:bg-${blue} bg-${lightGreen} `,
			text: ` text-${dark_text} dark:text-${light_text}`,
			text_check: `${dark_text}`,
			text_color: `${dark_text}`,
			color_border_button: `border-${dark_text} text-${dark_text} dark:border-main-yellow`,
			color_text_button: ` text-gray-900 dark:text-${light_text} `,
		},
		subtext:
			"Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 0,
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{ 
				check: [
					"20,000+ of PNG & SVG graphics",
					"Access to 100 million stock images",
				],
				cross: [
					"Upload custom icons and fonts",
					"Unlimited Sharing",
					"Upload graphics & video in up to 4k",
					"Unlimited Projects",
					"Instant Access to our design system",
				],
			},
	},
	{
		name: "Básico",
			value: 'basic',
		color: {
			bg: `bg-${yellow}`,
			text: dark_text,
			text_check: light_text,
			bg_button: `bg-${blue} hover:bg-[${hover_btn}] `,
			color_border_button: `border-${dark_text} text-${dark_text}`,
			color_text_button: ` text-gray-900 dark:bg-light-blue dark:text-${light_text}`,
		},
		subtext:
			"Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 10,
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{
				check: [
					"20,000+ of PNG & SVG graphics",
					"Access to 100 million stock images",
					"20,000+ of PNG & SVG graphics",
					"Access to 100 million stock images",
				],
				cross: [
					"Upload custom icons and fonts",
					"Unlimited Sharing",
				],
			},
	},
	{
		name: "Premium",
		value: 'premium',
		color: {
			bg: `dark:bg-${blue} bg-${lightGreen} `,
			text: ` text-${dark_text} dark:text-${light_text}`,
			text_check: `${dark_text}`,
			bg_button: `bg-transparent hover:bg-[${hover_btn}] `,
			color_border_button: `border-${dark_text} text-${dark_text} dark:border-main-yellow`,
			color_text_button: ` text-gray-900 dark:text-${light_text} `,
		},
		subtext:
			"Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 20,
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{
				check: [
					"20,000+ of PNG & SVG graphics",
					"Access to 100 million stock images",
				],
				cross: [
					"Upload custom icons and fonts",
					"Unlimited Sharing",
					"Upload graphics & video in up to 4k",
					"Unlimited Projects",
					"Instant Access to our design system",
				],
			},
	},
];

export { links, plans };
