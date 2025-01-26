import { FaChevronDown } from "react-icons/fa";

const SelectChevron = () => {
  return (
    <div className="absolute right-[5px] pe-[10px] w-[40px] h-[30px] bg-white flex justify-end items-center pointer-events-none opacity-[0] sm:opacity-[1]">
      <FaChevronDown />
    </div>
  );
};
export default SelectChevron;
