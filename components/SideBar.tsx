import { RoughNotation } from "react-rough-notation";
import bgImage from "../public/assets/bgframe.png";

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div style={{ backgroundRepeat: "no-repeat",backgroundSize: "inherit", backgroundImage: "url(" + bgImage.src + ")" }} className="absolute -top-20 left-0 w-full md:w-[45%] md:relative md:top-0 md:left-0">
    </div>
  );
};

export default SideBar;