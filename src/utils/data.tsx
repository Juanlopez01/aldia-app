import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBullseye, faUser, faPhone, faLandmarkDome, faChartSimple } from '@fortawesome/free-solid-svg-icons'

const links = {
	loggedIn: [
		[
			{ name: "General", url: "/", endpoint: "/general", icon: <FontAwesomeIcon icon={faUsers}/> },
			{ name: "Metas", url: "/", endpoint: "/metas", icon: <FontAwesomeIcon icon={faBullseye}/>  },
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

export {links}