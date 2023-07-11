import React from "react";
import {
	Hogar,
	Transporte,
	Alimentacion,
	Salud,
	Entretenimiento,
	Educación,
	Deudas,
	Ahorro_e_inversión,
	Vestimenta_y_cuidado_personal,
	Regalos_y_donaciones,
	Mercaderia,
	Negocio,
	Success,
	Hobbies,
	Banco,
	Otros,
} from "../../../../public/goals/index";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface Photos {
	[key: string]: StaticImageData;
}

interface Props {
	category: string;
	width: number;
	height: number;
}

const photos: Photos = {
	Hogar : Hogar,
	Transporte : Transporte,
	Alimentacion : Alimentacion,
	Salud : Salud,
	Entretenimiento : Entretenimiento,
	Educación : Educación,
	Deudas : Deudas,
	'Ahorro e inversión' : Ahorro_e_inversión,
	'Vestimenta y cuidado personal' : Vestimenta_y_cuidado_personal,
	'Regalos y donaciones' : Regalos_y_donaciones,
	Mercaderia : Mercaderia,
	Negocio : Negocio,
	Success : Success,
	Hobbies : Hobbies,
	Banco : Banco,
	Otros: Otros,
};

const PhotoComponent: React.FC<Props> = ({ category, width, height }) => {
	const photo = photos?.[category] || photos.Otros

	return <div className="h-full flex items-center">
		<Image src={photo} alt="photo" width={width} height={height}/>
	</div>;
};

export default PhotoComponent;
