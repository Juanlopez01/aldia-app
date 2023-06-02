import { MouseEventHandler, useState } from "react"


export const useToggle = (initialState? : boolean) => {
const [toggle, setToggle] = useState<boolean>(initialState ?? true)

const toggleHandler = () => setToggle(!toggle)
return { toggle, toggleHandler }
}