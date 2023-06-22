import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faBullseye,
	faUser,
	faPhone,
	faLandmarkDome,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionType } from "@/types/general.types";

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
			url: "#section1",
			endpoint: "#section1",
			icon: <FontAwesomeIcon icon={faUsers} />,
		},
		{
			name: "Contacto",
			url: "#contact",
			endpoint: "#contact",
			icon: <FontAwesomeIcon icon={faPhone} />,
		},
		{ name: "Planes", url: "#plans", endpoint: "#plans" },
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
		name: "Plan Gratuito por 14 días",
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
			"Acceso completo a todas las funcionalidades de ALDIA durante 14 días.",
		price: "0",
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{ 
				check: [
					"Registro de ingresos y egresos ilimitados.",
					"Categorización de transacciones y seguimiento de gastos e ingresos.",
					"Generación de gráficos y reportes.",
					"Establecimiento de metas de ahorro.",
					"Notificaciones y recordatorios.",
					"Soporte técnico por correo electrónico durante el periodo de prueba."
				],
				cross: [
					"Soporte técnico prioritario por whatsapp.",
					"Actualizaciones regulares de nuevas características y mejoras.",
					"Descuento equivalente a dos meses de uso al pagar el plan anual.",
					"Acceso exclusivo a cursos de capacitación en temas de negocios para mejorar tus habilidades financieras.",
					"Contenido educativo adicional sobre estrategias de ahorro y gestión financiera."
				],
			},
	},
	{
		name: "Plan mensual",
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
			"Acceso completo a todas las funcionalidades de ALDIA.",
		price: 10,
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{
				check: [
					"Registro de ingresos y egresos ilimitados.",
					"Categorización de transacciones y seguimiento de gastos e ingresos.",
					"Generación de gráficos y reportes.",
					"Establecimiento de metas de ahorro.",
					"Notificaciones y recordatorios.", 
					"Soporte técnico prioritario por correo electrónico.",
					"Actualizaciones regulares de nuevas características y mejoras.",
				],
				cross: [
					"Descuento equivalente a dos meses de uso al pagar el plan anual.",
					"Acceso exclusivo a cursos de capacitación en temas de negocios para mejorar tus habilidades financieras.",
					"Contenido educativo adicional sobre estrategias de ahorro y gestión financiera."
				],
			},
	},
	{
		name: "Plan Anual o Premium",
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
			"Acceso completo a todas las funcionalidades de ALDIA.",
		price: 100,
		tags:
			/* check: tick in tag, cross: cruz in tag component */
			{
				check: [
					"Registro de ingresos y egresos ilimitados.",
					"Categorización de transacciones y seguimiento de gastos e ingresos.",
					"Generación de gráficos y reportes.",
					"Establecimiento de metas de ahorro.",
					"Notificaciones y recordatorios.",
					"Soporte técnico prioritario por whatsapp.",
					"Actualizaciones regulares de nuevas características y mejoras.",
					"Descuento equivalente a dos meses de uso al pagar el plan anual.",
					"Acceso exclusivo a cursos de capacitación en temas de negocios para mejorar tus habilidades financieras.",
					"Contenido educativo adicional sobre estrategias de ahorro y gestión financiera."
				],
				// cross: [
				// 	"Upload custom icons and fonts",
				// 	"Unlimited Sharing",
				// 	"Upload graphics & video in up to 4k",
				// 	"Unlimited Projects",
				// 	"Instant Access to our design system",
				// ],
			},
	},
];

const questions: QuestionType[] = [
	{
	  question: '¿Has realizado un pago y no tienes el plan que pagaste?',
	  solution:
		'La verificación del pago puede demorar alguno minutos o hasta horas, pero si ha pasado mas de 1 día comumnicate via email o whatsapp para agilizar la activación de tu plan',
	  extra: 'Whatsapp: +51976866575',
	},
	{
	  question: '¿No puedes acceder a tu cuenta?',
	  solution:
		'Si no puedes acceder a tu cuenta, no te procuepes, ve a la pagina de autenticación y preciona la opción de "Me olvidé mi constraseña", pon el email con el cual te registaste, esto te enviará un email en el cual te redigira a una pagina donde podras recuperar tu cuenta y elegir una nueva contraseña',
	  extra: 'Si lo aterior no funciona enviar un email con el asunto "RECOVER-ACCOUNT" en el cual expliques tu probelma en cuestion y sera soluciona en brevedad',
	},
	{
	  question: '¿Tienes un error de redirección o de datos erroneos?',
	  solution:
		'Cuando quieres ir a una pagina te redirecciona a otra o la infomación que se muesta es errornea. Envia una email o un mesaje de whatsapp con el asunto de "ISSUE" con una descripción del error en cuestión y sera resuelto a la brevedad ',
	  extra: 'Whatsapp: +51976866575',
	},
	{
	  question: '¿Quieres que se agregue una funcionalidad?',
	  solution:
		'Envia una email o un mesaje de whatsapp con el asunto de "FEATURE" para que la funcionalidad sea agregada proximamente y ayudes a la aplicación a ser mas efieciente y util para los demás usuarios',
	  extra: 'Whatsapp: +51976866575',
	},
  ]


export { links, plans, questions };
