import Image from "next/image";
import Button from "components/button";
import RocketIcon from "assets/RocketLaunch.svg";

const ContinueButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} className="w-[184px] flex items-center justify-between">
      <div>Continue</div>
      <Image width={20} height={20} src={RocketIcon} alt=""></Image>
    </Button>
  );
};

export default ContinueButton;
