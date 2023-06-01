const ButtonSolid = (props: any) => (
  <button className={`bg-main-yellow text-black rounded-[12px] px-3 py-[6px] ${props?.classes}`}
  onClick={()=>props?.onClick()}>
    {props?.children}
  </button>
)

const ButtonTransparent = (props: any) => (
  <button className={`border-[1px] border-main-yellow text-main-yellow rounded-[12px] px-3 py-[6px]`}
  onClick={props?.handleClick}>
    {props?.children}
  </button>
)

export {ButtonSolid, ButtonTransparent}