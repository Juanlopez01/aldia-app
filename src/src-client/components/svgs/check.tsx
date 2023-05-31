import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="fill-current w-4 h-4"
    {...props}
  >
    <path d="M16 0C7.164 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.032C8.28 30.032 2 23.72 2 16S8.28 2 16 2s14 6.28 14 14-6.28 14.032-14 14.032zm6.386-19.886-9.388 9.446-4.228-4.227c-.39-.39-1.024-.39-1.415 0s-.391 1.023 0 1.414l4.95 4.95a1.002 1.002 0 0 0 1.534-.145l9.962-10.024a1.001 1.001 0 0 0-1.415-1.415z" />
  </svg>
)
export default SvgComponent
