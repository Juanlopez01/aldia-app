const ButtonSolid = (props: any) => (
  <button className="bg-main-yellow rounded-[12px] px-3 py-[5px]">
    {props?.children}
  </button>
)

const ButtonTransparent = (props: any) => (
  <button className="border-2 border-main-yellow text-main-yellow rounded-[12px] px-3 py-[5px]"
  onClick={props?.handleClick}>
    {props?.children}
  </button>
)

export {ButtonSolid, ButtonTransparent}