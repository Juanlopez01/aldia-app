import { MouseEventHandler, useState } from "react"


export const useToggle = () => {
const [toggle, setToggle] = useState<Boolean>(true)

const toggleHandler: MouseEventHandler = () => setToggle(!toggle)
return { toggle, toggleHandler }
}