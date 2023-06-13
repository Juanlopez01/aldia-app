import { stylesLandingContainers } from "../../Styles/Button"
import HeroComponent from "./DivUno/Hero"


function Hero() {
    return (
        <div className={`bg-light-green dark:bg-[#9BA1CE] ${stylesLandingContainers}`}>
            <HeroComponent />
        </div>
    )
}
export default Hero