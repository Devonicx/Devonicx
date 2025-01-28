import { useEffect, useState } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setDeductionValuesR, setDeleteDeduction } from "../store/SalarySlip";
import { FaMinusCircle } from "react-icons/fa";
import { formatAmount } from "../functions/formats";
interface DeductionInputProps {
  index: number;
}
const DeductionInputs: React.FC<DeductionInputProps> = ({ index }) => {
  interface DeductionType {
    name: string;
    amount: string;
  }

  let data: any = useSelector((state: RootState) => state.SalarySlip);
  let [deductionName, setDeductionName] = useState<string>(
    data?.deduction[index]?.name
  );
  let [deductionAmount, setDeductionAmount] = useState<string>(
    data?.deduction[index]?.amount
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setDeductionValuesR({
        name: deductionName,
        amount: deductionAmount,
        index: index,
      })
    );
  }, [deductionName, deductionAmount]);

  function deleteDeduction() {
    dispatch(setDeleteDeduction(index));
  }

  return (
    <div className="w-[100%] flex justify-between flex-wrap ">
      <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between items-center">
        <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative ">
          Deduction Name
        </label>
        <input
          placeholder="Enter Deduction Name"
          type="text"
          className="w-[60%] h-[45px] rounded-[10px] px-3 border-2 border-color  text-[12px] md:text-[14px] xl:text-[18px]"
          onChange={(e) => {
            setDeductionName(e.target.value);
          }}
          value={(data.deduction as DeductionType[])[index]?.name}
        />
      </div>

      <div className="w-[100%] md:w-[45%] h-[70px] flex justify-start items-center relative">
        <label className="w-[40%] text-[12px] md:text-[14px] xl:text-[18px] font-[500]">Amount</label>
        <input
          placeholder="Enter Deduction Amount"
          type="text"
          className="w-[50%] h-[45px] rounded-[10px] px-3 border-2 border-color  text-[12px] md:text-[14px] xl:text-[18px]"
          onChange={(e) => {
            setDeductionAmount(formatAmount(e.target.value));
          }}
          value={(data.deduction as DeductionType[])[index]?.amount}
        />
        <button
          onClick={deleteDeduction}
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
export default DeductionInputs;
