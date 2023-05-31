import * as React from "react"
const SvgComponent = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Flat Color"
    viewBox="0 0 24 24"
    className='fill-main-yellow w-6 h-6'
    {...props}
  >
    <path
      d="M22 9.81a1 1 0 0 0-.83-.69l-5.7-.78-2.59-4.81a1 1 0 0 0-1.76 0L8.57 8.34l-5.7.78a1 1 0 0 0-.82.69 1 1 0 0 0 .28 1l4.09 3.73-1 5.24a1 1 0 0 0 1.46 1.12L12 18.38l5.12 2.52a1 1 0 0 0 .44.1 1 1 0 0 0 1-1.18l-1-5.24 4.09-3.73A1 1 0 0 0 22 9.81Z"
    />
  </svg>
)
export default SvgComponent