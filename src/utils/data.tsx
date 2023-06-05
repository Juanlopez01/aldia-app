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
			{ name: "General", url: "/", endpoint: "/general", icon: <FontAwesomeIcon icon={faUsers}/> },
			{ name: "Metas", url: "/", endpoint: "/metas", icon: <FontAwesomeIcon icon={faBullseye}/>  },
		],
		[
			{
				name: "Personal",
				url: "/",
				endpoint: "/personal",
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
	blue: "light-blue",
	yellow: "secondary-yellow",
	light_text: "white",
	dark_text: "black",
	hover_btn: "#4b58bd"
};

const { blue, yellow, light_text, dark_text, hover_btn } = colors;

const plans = [
	{
		name: "Gratuito",
		color: {
			bg: `bg-${blue}`,
			text: light_text,
			text_check: dark_text,
			bg_button: `bg-transparent hover:bg-[${hover_btn}] `,
			color_border_button: `border-${yellow}`,
			color_text_button: `text-${yellow} border-2`,
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
		color: {
			bg: `bg-${yellow}`,
			text: dark_text,
			text_check: light_text,
			bg_button: `bg-${blue} hover:bg-[${hover_btn}] `,
			color_border_button: `bg-${blue} border-${blue}`,
			color_text_button: `text-${light_text} border-2`,
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
		color: {
			bg: `bg-${blue}`,
			text: light_text,
			text_check: dark_text,
			bg_button: "bg-transparent",
			color_border_button: `border-${yellow} hover:bg-[${hover_btn}] `,
			color_text_button: `text-${yellow} border-2`,
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
