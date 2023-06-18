import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const DarkMode = () => {
	const { theme, setTheme } = useTheme();

	const router = useRouter();

	useEffect(() => {
		const darkStore = localStorage.getItem("theme");
		if (darkStore === "light") {
			setTheme("light");
		} else if (darkStore === "dark") {
			setTheme("dark");
		}
	}, []);// eslint-disable-line 

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return (
		<div className="w-[80px] flex items-center rounded-full border-2 border-black dark:border-gray-500">
			<FontAwesomeIcon
				icon={faSun}
				className={`text-main-yellow text-xl cursor-pointer p-2 rounded-md duration-200 ${
					theme === "dark" ? "opacity-0" : "opacity-1"
				}`}
				onClick={toggleTheme}
			/>
			<FontAwesomeIcon
				icon={faMoon}
				className={`text-white text-xl cursor-pointer p-2 rounded-md duration-200 ${
					theme === "light" ? "opacity-0" : "opacity-1"
				}`}
				onClick={toggleTheme}
			/>
		</div>
	);
};

export default DarkMode;
