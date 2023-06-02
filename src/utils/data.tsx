import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBullseye, faUser, faPhone, faLandmarkDome, faChartSimple } from '@fortawesome/free-solid-svg-icons'

const links = {
	loggedIn: [
		[
			{ name: "General", url: "/", endpoint: "/general", icon: <FontAwesomeIcon icon={faUsers}/> },
			{ name: "Metas", url: "/goals", endpoint: "/metas", icon: <FontAwesomeIcon icon={faBullseye}/>  },
		],
		[
			{ name: "Personal", url: "/", endpoint: "/personal", icon: <FontAwesomeIcon icon={faUser}/>},
			{ name: "Administrador", url: "/admin", endpoint: "/admin", icon: <FontAwesomeIcon icon={faLandmarkDome}/> },
			{ name: "Compañías", url: "/company", endpoint: "/company", icon: <FontAwesomeIcon icon={faChartSimple}/> },
		],
	],
	notLoggedIn: [
		{ name: "Nosotros", url: "/", endpoint: "/us", icon: <FontAwesomeIcon icon={faUsers}/> },
		{ name: "Contacto", url: "/", endpoint: "/contact", icon: <FontAwesomeIcon icon={faPhone}/> },
		{ name: "Planes", url: "/", endpoint: "plans", },
	],
};

const plans = [
	{
		name: "Gratuito",
		color: {bg: "light-blue", text: "white"},
		subtext: "Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 0,
		// tags: [
		// 	/* check: tick in tag, cross: cruz in tag component */
		// 	{check: []},
		// 	{cross: []}
		// ]
	},
	{
		name: "Básico",
		color: {bg: "[#e1c512]", text: "black"},
		subtext: "Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 1000,
		// tags: [
		// 	/* check: tick in tag, cross: cruz in tag component */
		// 	{check: []},
		// 	{cross: []}
		// ]
	},
	{
		name: "Premium",
		color: {bg: "light-blue", text: "white"},
		subtext: "Ideal para controlar sus finanzas personales y las de sus negocios en un solo",
		price: 2000,
		// tags: [
		// 	/* check: tick in tag, cross: cruz in tag component */
		// 	{check: []},
		// 	{cross: []}
		// ]
	}
]

export {links, plans}