"use client";

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressR,
  setCurrentDateR,
  setNameR,
  setGenderR,
  setEffectiveDateR,
  setAddLineR,
  setAmountR,
  setBasicSalaryR,
  setAllowanceR,
  setResetAllowance,
  setPrintShowR,
  setIncrementR,
  setAddIncLineR,
} from "@/app/store/SalaryIncrementLetter";
import {
  FaAsterisk,
  FaChevronDown,
  FaChevronLeft,
  FaPlus,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

import { RootState } from "@/app/store";
import SalaryIncrementLetterPrint from "@/app/components/SaveForPrint/SalaryIncrementLetter";
import AllowanceInputs from "@/app/components/AllowanceInputs";
import Loader from "@/app/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  setAdminR,
  setFormsR,
  setRecentReloaderR,
  setUserNameR,
} from "@/app/store/Global";
import RecentRecord from "@/app/components/RecentRecord";
import { formatAmount } from "@/app/functions/formats";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "@/app/components/SelectChevron";

const SalaryIncrementLetter: React.FC = () => {
  interface AllowanceType {
    name: string;
    amount: string;
  }

  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.SalaryIncrementLetter);
  let global = useSelector((state: RootState) => state.Global);
  let [gender, setGender] = useState(data.gender);
  let [name, setName] = useState(data.name);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [address, setAddress] = useState(data.address);
  let [effectiveDate, seteffectiveDate] = useState(data.effectiveDate);
  let [addLine, setAddLine] = useState(data.addLine);
  let [amount, setAmount] = useState(data.amount);
  let [basicSalary, setBasicSalary] = useState(data.basicSalary);
  let [allowance, setAllowance] = useState<AllowanceType[]>(data.allowance);

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [printClicked, setPrintClicked] = useState<boolean>(false);
  let [fieldEmpty, setFieldEmpty] = useState<boolean>(true);

  let router = useRouter();

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        await axios.get("/api/verifyToken");
        let { data } = await axios.get("/api/userDataName");
        dispatch(setFormsR(data.forms));
        dispatch(setUserNameR(data.username));
        dispatch(setAdminR(data.admin));
        if (!data.forms.includes("Salary-Increment-Letter")) {
          router.push("/");
        } else {
          setIsVerified(true);
        }
      } catch (err) {
        router.push("/");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    verifyTokenApi();
  }, []);

  useEffect(() => {
    dispatch(setGenderR(gender));
    dispatch(setCurrentDateR(currentDate));
    dispatch(setNameR(name));
    dispatch(setAddressR(address));
    dispatch(setEffectiveDateR(effectiveDate));
    dispatch(setAddLineR(addLine));
    dispatch(setAmountR(amount));
    dispatch(setBasicSalaryR(basicSalary));
  }, [
    gender,
    currentDate,
    name,
    address,
    effectiveDate,
    addLine,
    amount,
    basicSalary,
  ]);
  useEffect(() => {
    dispatch(setAllowanceR(allowance));
  }, [allowance]);

  useEffect(() => {
    setAllowance(data.allowance);
  }, [data.allowance]);

  function addAllowance() {
    let newAllowance = { name: "", amount: "" };
    setAllowance([...data.allowance, newAllowance]);
  }

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Salary-Increment-Letter",
            dataToSend,
            createdBy: global.username,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setSaveloading(false);
          dispatch(setRecentReloaderR(global.recentReloader + 1));
        }
      }
      saveRecord();
    };
  }

  function regenerate(newData: any) {
    setGender(newData.gender);
    setName(newData.name);
    setCurrentDate(newData.currentDate);
    setAddress(newData.address);
    seteffectiveDate(newData.effectiveDate);
    setAddLine(newData.addLine);
    setAmount(newData.amount);
    setBasicSalary(newData.basicSalary);
    setAllowance(newData.allowance);
    dispatch(setIncrementR(newData.increment));
    dispatch(setAddIncLineR(newData.addIncLine));
  }

  usePreventPrint(showPrint);

  useEffect(() => {
    dispatch(setPrintShowR(showPrint));
  }, [showPrint]);
  console.log(data.increment);

  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : !showPrint ? (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue">
              Salary Increment Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20">
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.gender,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Gender
                </label>

                <select
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.gender,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <SelectChevron />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.currentDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Current Date
                </label>
                <input
                  placeholder=""
                  type="date"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.currentDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={currentDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setCurrentDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.name,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Name{" "}
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.name,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.address,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Address
                </label>
                <input
                  placeholder="Enter Address"
                  type="text"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.address,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center ">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.effectiveDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Effective Date
                </label>
                <input
                  placeholder="Enter Designation"
                  type="date"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.effectiveDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={effectiveDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    seteffectiveDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>

              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.basicSalary,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Basic Salary
                </label>
                <input
                  placeholder="Enter Basic Salary"
                  type="text"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.basicSalary,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setBasicSalary(formatAmount(e.target.value));
                  }}
                  value={basicSalary}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  Increment
                </label>
                <input
                  placeholder="Enter Increment"
                  type="number"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2`}
                  onChange={(e) => {
                    dispatch(setIncrementR(e.target.value));
                  }}
                  value={data.increment}
                />
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center bg-red-20">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative mb-2 md:mb-0">
                    Allowance
                  </label>
                  <div className="w-[60%]  text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] flex gap-[20px]">
                    <button
                      className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex justify-center items-center rounded-full border-2 border-color bg-[rgb(0,162,255)] text-white text-[20px]"
                      onClick={() => addAllowance()}
                    >
                      <FaPlus />
                    </button>
                    {data.allowance?.length > 0 ? (
                      <button
                        className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex justify-center items-center rounded-full border-2 border-color bg-red-500 text-white text-[20px]"
                        onClick={() => dispatch(setResetAllowance())}
                        title="Delete All Allowance"
                      >
                        <FaTimes />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              {data.allowance?.map((item: any, key: number) => (
                <div key={key} className="w-full">
                  <AllowanceInputs index={key} />
                </div>
              ))}

              <div className="w-[100%] h-[70px] flex justify-start gap-[10px] items-center ">
                <input
                  className="w-[30% text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative "
                  type="checkbox"
                  onChange={(e) => {
                    setAddLine(!addLine);
                  }}
                  checked={data.addLine}
                />
                <div className="w-[1000%] h-[45px] ">
                  <h4 className=" text-[12px] md:text-[14px] xl:text-[18px] font-[500]">
                    Add this line?
                  </h4>
                  <h5 className=" text-[12px] md:text-[12px] xl:text-[14px] font-[400]">
                    The increment can be lift off if we feel your
                    responsibilities are compromised in future.
                  </h5>
                </div>
              </div>

              <div className="w-[100%] h-[70px] flex justify-start gap-[10px] items-center ">
                <input
                  className="w-[30% text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative "
                  type="checkbox"
                  onChange={(e) => {
                    dispatch(setAddIncLineR(!data.addIncLine));
                  }}
                  checked={data.addIncLine}
                />
                <div className="w-[1000%] h-[45px] ">
                  <h4 className=" text-[12px] md:text-[14px] xl:text-[18px] font-[500]">
                    Add this line?
                  </h4>
                  <h5 className=" text-[12px] md:text-[12px] xl:text-[14px] font-[400]">
                    The next performance evaluation is scheduled for 8 months
                    from now, with a potential salary increase of up to{" "}
                    {data.increment}%, based on your performance.
                  </h5>
                </div>
              </div>
            </div>
            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[rgb(0,162,255)] text-white rounded-[10px] hover:opacity-[0.8]`}
                onClick={() =>
                  hasEmptyField(
                    data,
                    setPrintClicked,
                    setFieldEmpty,
                    setShowPrint
                  )
                }
              >
                Save PDF
              </button>
            </div>
          </div>
          <RecentRecord
            letterType={"Salary-Increment-Letter"}
            regenerate={regenerate}
            setShowPrint={setShowPrint}
          />
        </div>
      ) : (
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] flex justify-start items-center fixed left-[2vh] md:left-[5vh] top-[50vh] rounded-full hideOnPrint bg-neutral-100 z-[200]"
            onClick={() => setShowPrint(false)}
            title="Back To Form"
          >
            <FaChevronLeft className="w-[80%] h-[80%] text-[rgb(0,162,255)]" />
          </button>
          <button
            className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] flex justify-center items-center fixed right-[2vh] md:right-[5vh] top-[50vh] rounded-full hideOnPrint bg-neutral-100 z-[200]"
            onClick={() => window.print()}
            title="Make Print"
          >
            <FaPrint className="w-[60%] h-[60%] text-[rgb(0,162,255)]" />
          </button>
          <div className="w-full h-full overflow-auto">
            <SalaryIncrementLetterPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryIncrementLetter;
