"use client";
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameR,
  setCnicR,
  setDesignationR,
  setBasicSalaryR,
  setMonthR,
  setDeductionR,
  setCurrentDateR,
  setResetDeduction,
  setPrintShowR,
  // setAllowanceR,
  // setResetAllowance,
} from "@/app/store/SalarySlip";
import { RootState } from "@/app/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { setAdminR, setFormsR, setRecentReloaderR, setUserNameR } from "@/app/store/Global";
import RecentRecord from "@/app/components/RecentRecord";
import { FaAsterisk, FaChevronLeft, FaPlus, FaPrint, FaTimes } from "react-icons/fa";
import { formatAmount, formatCNIC } from "@/app/functions/formats";
import DeductionInputs from "@/app/components/DeductionInputs";
// import AllowanceInputs from "@/app/components/AllowanceInputs";

import {
  hasEmptyField,
  hasEmptyFieldResDate,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SalarySlipPrint from "@/app/components/SaveForPrint/SalarySlip";
// import AllowanceInputsSalarySlip from "@/app/components/AllowanceInputsSalarySlip";

const SalarySlip: React.FC = () => {
  interface DeductionType {
    name: string;
    amount: string;
  }

  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.SalarySlip);
  let global = useSelector((state: RootState) => state.Global);

  let [name, setname] = useState(data.name);
  let [cnic, setcnic] = useState(data.cnic);
  let [designation, setdesignation] = useState(data.designation);
  let [basicSalary, setbasicSalary] = useState(data.basicSalary);
  let [month, setmonth] = useState(data.month);
  let [currentDate, setcurrentDate] = useState(data.currentDate);
  let [deduction, setdeduction] = useState<DeductionType[]>(data.deduction);
  // let [allowance, setAllowance] = useState<DeductionType[]>(data.allowance);

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
        if (!data.forms.includes("Salary-Slip")) {
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
    dispatch(setNameR(name)),
      dispatch(setCnicR(cnic)),
      dispatch(setDesignationR(designation)),
      dispatch(setBasicSalaryR(basicSalary)),
      dispatch(setMonthR(month));
    dispatch(setCurrentDateR(currentDate));
  }, [name, cnic, designation, basicSalary, month, currentDate]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        let { newDataChecker, ...dataToSend } = data;
        try {
          setSaveloading(true);
          await axios.post("/api/saveRecord", {
            type: "Salary-Slip",
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
  useEffect(() => {
    dispatch(setDeductionR(deduction));
  }, [deduction]);

  useEffect(() => {
    setdeduction(data.deduction);
  }, [data.deduction]);

  function addDeduction() {
    let newDeduction = { name: "", amount: "" };
    setdeduction([...data.deduction, newDeduction]);
  }

  function regenerate(newData: any) {
    setname(newData.name);
    setcnic(newData.cnic);
    setdesignation(newData.designation);
    setbasicSalary(newData.basicSalary);
    setmonth(newData.month);
    setcurrentDate(newData.currentDate);
    setdeduction(newData.deduction);
    // setAllowance(newData.allowance);
  }
  usePreventPrint(showPrint);

  useEffect(() => {
    dispatch(setPrintShowR(showPrint));
  }, [showPrint]);

  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : !showPrint ? (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue ">
              Salary Slip
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.name,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                />
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
                  placeholder="Enter Name"
                  type="date"
                  value={currentDate.split("-").reverse().join("-")}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.currentDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setcurrentDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.cnic,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  CNIC{" "}
                </label>

                <input
                  placeholder="Enter CNIC"
                  type="text"
                  maxLength={15}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.cnic,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setcnic(formatCNIC(e.target.value));
                  }}
                  value={cnic}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.designation,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Designation
                </label>
                <input
                  placeholder="Enter Designation"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.designation,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setdesignation(e.target.value);
                  }}
                  value={designation}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.month,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Month{" "}
                </label>

                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.month,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={month.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setmonth(e.target.value.split("-").reverse().join("-"));
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
                  placeholder="00000"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.basicSalary,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setbasicSalary(formatAmount(e.target.value));
                  }}
                  value={basicSalary}
                />
              </div>

              <div className="w-[100%]">
                <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative ">
                    Deductions
                  </label>
                  <div className="w-[60%] h-[45px] flex gap-[20px]">
                    <button
                      className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex justify-center items-center rounded-full border-2 border-color bg-[#27416b] text-white text-[20px] hover:opacity-[0.8]"
                      onClick={() => addDeduction()}
                    >
                      <FaPlus />
                    </button>
                    {data.deduction?.length > 0 ? (
                      <button
                        className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex justify-center items-center rounded-full border-2 border-color bg-red-500 text-white text-[20px]"
                        onClick={() => dispatch(setResetDeduction())}
                        title="Delete All Deductions"
                      >
                        <FaTimes />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              {data.deduction?.map((item: any, key: number) => (
                <div key={key} className="w-full">
                  <DeductionInputs index={key} />
                </div>
              ))}
            </div>

            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]`}
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
            letterType={"Salary-Slip"}
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
            <FaChevronLeft className="w-[80%] h-[80%] text-[#27416b]" />
          </button>
          <button
            className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] flex justify-center items-center fixed right-[2vh] md:right-[5vh] top-[50vh] rounded-full hideOnPrint bg-neutral-100 z-[200]"
            onClick={() => window.print()}
            title="Make Print"
          >
            <FaPrint className="w-[60%] h-[60%] text-[#27416b]" />
          </button>
          <div className="w-full h-full overflow-auto">


          <SalarySlipPrint />
        </div>
        </div>
      )}
    </>
  );
};

export default SalarySlip;
