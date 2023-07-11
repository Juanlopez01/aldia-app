import { stylesLandingContainers } from "../../Styles/Button"
import HeroComponent from "./DivUno/Hero"


function Hero() {
    return (
        <div className={`
        bg-difuminado
        ${stylesLandingContainers}`}>
            <HeroComponent />
        </div>
    )
}
export default Hero