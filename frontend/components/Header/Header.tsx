import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "../Button/Button";
import { IoAddSharp } from "react-icons/io5";
import Loader from "../Loader/Loader";

export default function Header(props: {
  onAddHighlight: () => void;
  isLoading?: boolean;
}) {
  return (
    <>
      <div className="flex gap-2 text-xl py-4 px-6  items-center border border-collapse border-border">
        <span className="text-brand font-medium">Property highlights</span>
        <BsFillInfoCircleFill className="text-[14px] text-gray-500" />

        {props.isLoading && (
          <div className="pl-5">
            <Loader />
          </div>
        )}

        <div className="flex-1"></div>
        <Button onClick={props.onAddHighlight}>
          <span>
            <IoAddSharp className="text-[21px]" />
          </span>
          <span> Add Highlight</span>
        </Button>
      </div>
    </>
  );
}
