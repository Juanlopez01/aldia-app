import React from "react";
import Logo from "../../../assets/ALDIA.png";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
<<<<<<< HEAD
import IsLogged from "./IsLogged/IsLogged";
import { useSession } from "next-auth/react";
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
>>>>>>> 5ee239922af9a095b0b08b5f6f9ebb1b327b09ab

const Footer = () => {

	const { data: session } = useSession()

	const footerClass = session?.user ? "fixed bottom-0 left-0" : ""

	return (
<<<<<<< HEAD
		<div className={`bg-light-blue w-full min-h-[200px] grid lg:grid-cols-3 lg:place-content-center py-8 lg:py-12 leading-10 ${footerClass}`}>
=======
		<div
			className="bg-darkest-blue w-full min-h-[200px]
    grid lg:grid-cols-3 lg:place-content-center py-8 lg:py-12 leading-10"
		>
>>>>>>> 5ee239922af9a095b0b08b5f6f9ebb1b327b09ab
			<div className="flex justify-center pb-4 lg:pb-0">
				<Image src={Logo} alt="logo img" className="w-[120px]" />
			</div>

			<ul className="w-full flex justify-around text-[14px] lg:text-[16px]">
				<Link href="/" className="text-link link no-underline">
					Product
				</Link>
				<Link href="/" className="text-link link no-underline">
					Features
				</Link>
				<Link href="/" className="text-link link no-underline">
					Pricing
				</Link>
				<Link href="/" className="text-link link no-underline">
					Resources
				</Link>
			</ul>

<<<<<<< HEAD
			<div className="text-[#CBD5E1] text-[12px] flex justify-center gap-2 py-2 lg:py-0">
				<p className="bg-[#1E293B] rounded-full w-[21px] h-[21px]"></p>
				<p className="bg-[#1E293B] rounded-full w-[21px] h-[21px]"></p>
				<p className="bg-[#1E293B] rounded-full w-[21px] h-[21px]"></p>
				<p className="bg-[#1E293B] rounded-full w-[21px] h-[21px]"></p>
			</div>
=======
      <div className="text-[#CBD5E1] text-[12px] flex justify-center gap-2 py-2 lg:py-0">
        <Link href="" className="flex gap-3">
					<FontAwesomeIcon icon={faLinkedinIn} className="bg-[#0a63bc] text-white p-[5px] text-[18px] rounded-full hover:scale-110"/>
					<FontAwesomeIcon icon={faInstagram} className="bg-white text-red-500 p-[5px] text-[18px] rounded-full hover:scale-110"/>
					<FontAwesomeIcon icon={faFacebook} className="bg-[#1773ea] text-white p-[5px] text-[18px] rounded-full hover:scale-110"/>
				</Link>
      </div>
>>>>>>> 5ee239922af9a095b0b08b5f6f9ebb1b327b09ab

			<div className="text-[#CBD5E1] text-[12px] flex justify-center lg:col-start-1 lg:col-end-4">
				<p>@ Copyright 2023. All rights Reserved by ALDIA</p>
			</div>
		</div>
	);
};

export default Footer;
