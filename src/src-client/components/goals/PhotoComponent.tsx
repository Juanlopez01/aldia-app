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
	width: number;
	height: number;
}

const photos: Photos = {
	Mercaderia: Mercaderia,
	Negocio: Negocio,
	Entreteniminto: Entretenimiento,
	Hobbies: Hobbies,
	Banco: Banco,
};

const PhotoComponent: React.FC<Props> = ({ category, width, height }) => {
	const photo = photos?.[category];

	return <div className="h-full flex items-center">
		<Image src={photo} alt="photo" width={width} height={height}/>
	</div>;
};

export default PhotoComponent;
