import React from "react";
import {
	Entretenimiento,
	Hobbies,
	Mercaderia,
	Negocio,
	Banco,
	Otros,
	Hogar
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
	Entretenimiento: Entretenimiento,
	Hobbies: Hobbies,
	Banco: Banco,
	Otros: Otros,
	Hogar: Hogar
};

const PhotoComponent: React.FC<Props> = ({ category, width, height }) => {
	const photo = photos?.[category] || photos.Otros

	return <div className="h-full flex items-center">
		<Image src={photo} alt="photo" width={width} height={height}/>
	</div>;
};

export default PhotoComponent;
