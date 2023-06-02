import { MouseEventHandler, useState } from "react"


export const useToggle = (initialState? : boolean) => {
const [toggle, setToggle] = useState<boolean>(initialState ?? true)

const toggleHandler: MouseEventHandler = () => setToggle(!toggle)
return { toggle, toggleHandler }
}