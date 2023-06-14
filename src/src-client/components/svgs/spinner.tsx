import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={`${
      props.className ? props.className : 'fill-current w-fit h-6'
    } animate-spin`}
    {...props}
  >
    <title>{'spinner-one-third'}</title>
    <path d="M16 .75a1.25 1.25 0 0 0 0 2.5c7.042.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016a1.25 1.25 0 0 0 1.77 1.766 15.203 15.203 0 0 0 4.465-10.782C31.251 7.578 24.423.75 16.001.75z" />
  </svg>
)
export default SvgComponent