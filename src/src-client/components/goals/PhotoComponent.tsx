import React from "react";
import {
	Entretenimiento,
	Hobbies,
	Mercaderia,
	Negocio,
	Banco,
} from "../../../../public/goals/index";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface Photos {
	[key: string]: StaticImageData;
}

interface Props {
	category: string;
}

const photos: Photos = {
	Mercaderia: Mercaderia,
	Negocio: Negocio,
	Entreteniminto: Entretenimiento,
	Hobbies: Hobbies,
	Banco: Banco,
};

const PhotoComponent: React.FC<Props> = ({ category }) => {
	const photo = photos?.[category];

	return <Image src={photo} alt="photo" width={50} height={50}/>;
};

export default PhotoComponent;
