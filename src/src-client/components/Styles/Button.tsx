const ButtonSolid = (props: any) => (
	<button
		className={`bg-main-yellow text-black rounded-[12px] ${props?.classes}`}
		onClick={() => props?.onClick()}
	>
		{props?.children}
	</button>
);

const ButtonTransparent = (props: any) => (
	<button
		className={`border-[1px] border-main-yellow text-main-yellow rounded-[12px] ${props?.classes}`}
		onClick={props?.handleClick}
	>
		{props?.children}
	</button>
);

const InputTransparent = (props: any) => (
	<input
		type={props?.type}
		className={`border-[1px] border-main-yellow text-gray-800 text-sm rounded-[12px] px-3 py-2 bg-transparent placeholder:text-gray-500 focus:outline-blue-600
    ${props?.classes}`}
		placeholder={props?.placeholder}
		onChange={props?.handleChange}
		maxLength={props?.maxLength}
		name={props?.name}
		value={props?.value}
	>
		{props?.children}
	</input>
);

export { ButtonSolid, ButtonTransparent, InputTransparent };
