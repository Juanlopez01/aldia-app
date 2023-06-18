import React from "react";
import Logo from "../../../assets/ALDIA.png";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
    <footer className="flex flex-grow items-end">
      <div
        className={`
	  bg-main-green dark:bg-darkest-blue w-full min-h-[200px] border-t-2 border-gray-400 dark:border-gray-500
	  grid lg:grid-cols-3 lg:place-content-center pt-8 lg:pt-0 pb-8 lg:pb-0 z-[2000]`}
      >
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
          <Link href="/fqas" className="text-link link no-underline">
            FQAs
          </Link>
        </ul>

        <div className="text-[#CBD5E1] text-[12px] flex justify-center gap-2 py-2 lg:py-0">
          <Link href="" className="flex gap-3">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="bg-[#0a63bc] text-white p-[5px] text-[18px] rounded-full hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="bg-white text-red-500 p-[5px] text-[18px] rounded-full hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              className="bg-[#1773ea] text-white p-[5px] text-[18px] rounded-full hover:scale-110"
            />
          </Link>
        </div>

        <div className="text-[#CBD5E1] text-[12px] flex justify-center lg:col-start-1 lg:col-end-4">
          <p>@ Copyright 2023. All rights Reserved by ALDIA</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;