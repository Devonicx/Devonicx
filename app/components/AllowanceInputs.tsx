import { useEffect, useState } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllowanceValuesR,
  setDeleteAllowance, 
} from "../store/SalaryIncrementLetter";
import { FaMinusCircle } from "react-icons/fa";
import { formatAmount } from "../functions/formats";
interface AllowanceInputProps {
  index: number; 
}
const AllowanceInputs: React.FC<AllowanceInputProps> = ({ index }) => {
  interface AllowanceType {
    name: string;
    amount: string;
  }

  let data: any = useSelector(
    (state: RootState) => state.SalaryIncrementLetter
  );
  let [allowanceName, setAllowanceName] = useState<string>(
    data?.allowance[index]?.name
  );
  let [allowanceAmount, setAllowanceAmount] = useState<string>(
    data?.allowance[index]?.amount
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAllowanceValuesR({
        name: allowanceName,
        amount: allowanceAmount,
        index: index,
      })
    );
  }, [allowanceName, allowanceAmount]);
  function deleteAllowance() {
    dispatch(setDeleteAllowance(index));
  }

  return (
    <div className="w-full flex justify-between flex-wrap">
      <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
        <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative ">
          Allowance Name
        </label>
        <input
          placeholder="Enter Allowance Name"
          type="text"
          className="w-[60%] h-[45px] rounded-[10px] px-3 border-2 border-color  text-[12px] md:text-[14px] xl:text-[18px]"
          onChange={(e) => {
            setAllowanceName(e.target.value);
          }}
          value={(data.allowance as AllowanceType[])[index]?.name}
        />
      </div>

      <div className="w-[100%] md:w-[45%] h-[70px] flex justify-start items-center relative">
        <label className="w-[40%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative ">
          Amount
        </label>
        <input
          placeholder="Enter Allowance Amount"
          type="text"
          className="w-[50%] h-[45px] rounded-[10px] px-3 border-2 border-color  text-[12px] md:text-[14px] xl:text-[18px]"
          onChange={(e) => {
            setAllowanceAmount(formatAmount(e.target.value));
          }}
          value={(data.allowance as AllowanceType[])[index]?.amount}
        />
        <button
          onClick={deleteAllowance}
          className="w-[20px] md:w-[30px] h-[20px] md:h-[30px] flex justify-between items-center absolute right-0"
        >
          <FaMinusCircle
            className="w-[100%] h-[100%] text-gray-700"
            title="delete this item"
          />
        </button>
      </div>
    </div>
  );
};
export default AllowanceInputs;
