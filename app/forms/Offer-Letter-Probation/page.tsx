"use client";
"use client";

import { useEffect, useReducer, useState } from "react";
import OfferLetterProbationEmail from "@/app/components/SaveForEmail/OfferLetterProbation";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressR,
  setCurrentDateR,
  setBasicSalaryR,
  setEmailShowR,
  setProbationPeriodR,
  setGenderR,
  setDesignationR,
  setNameR,
  setResponseDateR,
  setStartingDateR,
  setExtProbationR,
  setTerminationDaysR,
  setPriorNoticeR,
  setIncrementR,
  setAllowanceR,
  setResetAllowance,
  setPrintShowR,
  setComLineR,
  setCommissionR,
} from "@/app/store/OfferLetterProbation";
import { RootState } from "@/app/store";
import {
  setAdminR,
  setFormsR,
  setRecentReloaderR,
  setUserNameR,
} from "@/app/store/Global";
import RecentRecord from "@/app/components/RecentRecord";
import OfferLetterProbationPrint from "@/app/components/SaveForPrint/OfferLetterProbation";
import AllowanceInputsProbation from "@/app/components/AllowanceInputsProbation";
import {
  FaAsterisk,
  FaChevronDown,
  FaChevronLeft,
  FaPlus,
  FaPrint,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { formatAmount } from "@/app/functions/formats";
import {
  hasEmptyFieldResDate,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "../../components/SelectChevron";

const OfferLetterProbation: React.FC = () => {
  interface AllowanceType {
    name: string;
    amount: string;
  }

  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.OfferLetterProbation);
  let global = useSelector((state: RootState) => state.Global);
  let [gender, setGender] = useState(data.gender);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [name, setName] = useState(data.name);
  let [address, setAddress] = useState(data.address);
  let [designation, setDesignation] = useState(data.designation);
  let [basicSalary, setBasicSalary] = useState(data.basicSalary);
  let [ProbationPeriod, setProbationPeriod] = useState(data.probationPeriod);
  let [ExtProbation, setExtProbation] = useState(data.extProbation);
  let [startingDate, setStartingDate] = useState(data.startingDate);
  let [responseDate, setResponseDate] = useState(data.responseDate);
  let [terminationDays, setTerminationDays] = useState(data.terminationDays);
  let [priorNotice, setPriorNotice] = useState(data.priorNotice);
  let [increment, setIncrement] = useState(data.increment);
  let [allowance, setAllowance] = useState<AllowanceType[]>(data.allowance);
  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [printClicked, setPrintClicked] = useState<boolean>(false);
  let [fieldEmpty, setFieldEmpty] = useState<boolean>(true);
  let [comLineTemp, setcomLineTemp] = useState<boolean>(data.comLine);
  let [commission, setcommission] = useState(data.commission);

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
        if (!data.forms.includes("Offer-Letter-Probation")) {
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
    dispatch(setDesignationR(designation));
    dispatch(setBasicSalaryR(basicSalary));
    dispatch(setProbationPeriodR(ProbationPeriod));
    dispatch(setExtProbationR(ExtProbation));
    dispatch(setResponseDateR(responseDate));
    dispatch(setStartingDateR(startingDate));
    dispatch(setTerminationDaysR(terminationDays));
    dispatch(setPriorNoticeR(priorNotice));
    dispatch(setIncrementR(increment));
    dispatch(setComLineR(comLineTemp));
    dispatch(setCommissionR(commission));
  }, [
    gender,
    currentDate,
    name,
    address,
    designation,
    basicSalary,
    startingDate,
    ProbationPeriod,
    responseDate,
    ExtProbation,
    terminationDays,
    priorNotice,
    increment,
    comLineTemp,
    commission,
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
            type: "Offer-Letter-Probation",
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
    setCurrentDate(newData.currentDate);
    setName(newData.name);
    setAddress(newData.address);
    setDesignation(newData.designation);
    setBasicSalary(newData.basicSalary);
    setProbationPeriod(newData.probationPeriod);
    setExtProbation(newData.extProbation);
    setStartingDate(newData.startingDate);
    setResponseDate(newData.responseDate);
    setTerminationDays(newData.terminationDays);
    setPriorNotice(newData.priorNotice);
    setIncrement(newData.increment);
    setAllowance(newData.allowance);
    setcomLineTemp(newData.comLine);
    setcommission(newData.commission);
  }

  usePreventPrint(showPrint);

  useEffect(() => {
    dispatch(setPrintShowR(showPrint));
  }, [showPrint]);
  console.log(data.commission);

  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : !showPrint ? (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
            <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[20px] xl:text-[25px] font-[600] flex items-center justify-start text-main-blue px-3 md:px-10 xl:px-20">
              Offer Letter Probation
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
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.gender,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setGender(e.target.value)}
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
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.currentDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  placeholder=""
                  type="date"
                  value={currentDate.split("-").reverse().join("-")}
                  onChange={(e) =>
                    setCurrentDate(
                      e.target.value.split("-").reverse().join("-")
                    )
                  }
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
                  Name
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.name,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setName(e.target.value)}
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
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.address,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.designation,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
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
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.basicSalary,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setBasicSalary(formatAmount(e.target.value))}
                  value={basicSalary}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={`text-[8px] mt-[4px] w-fit ${redColor(
                        data.probationPeriod,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Probation Period
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    months
                  </span>
                </label>
                <input
                  placeholder="Enter In Months"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.probationPeriod,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setProbationPeriod(e.target.value)}
                  value={ProbationPeriod}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.extProbation,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Ext. Probation
                </label>
                <input
                  placeholder="Enter In Months"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.extProbation,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setExtProbation(e.target.value)}
                  value={ExtProbation}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.terminationDays,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Termination Days
                </label>
                <input
                  placeholder="Enter In Days"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.terminationDays,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setTerminationDays(e.target.value)}
                  value={terminationDays}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.priorNotice,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Prior Notice
                </label>
                <input
                  placeholder="Enter Prior Notice"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.priorNotice,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setPriorNotice(e.target.value)}
                  value={priorNotice}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={`text-[8px] mt-[4px] w-fit ${redColor(
                        data.increment,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Increment
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    %
                  </span>
                </label>
                <input
                  placeholder="%"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.increment,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setIncrement(e.target.value)}
                  value={increment}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.startingDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Starting Date
                </label>
                <input
                  placeholder=""
                  type="date"
                  onChange={(e) =>
                    setStartingDate(
                      e.target.value.split("-").reverse().join("-")
                    )
                  }
                  value={startingDate.split("-").reverse().join("-")}
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.startingDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center ">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px] font-[500]">
                    Response Date
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Only For Emails
                  </span>
                </label>
                <input
                  onChange={(e) =>
                    setResponseDate(
                      e.target.value.split("-").reverse().join("-")
                    )
                  }
                  type="date"
                  value={responseDate?.split("-").reverse().join("-")}
                  className="text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2 border-color"
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    Commission
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    %
                  </span>
                </label>
                <input
                  placeholder="%"
                  type="number"
                  className={`text-[12px] md:text-[18px] w-[60%] h-[45px] rounded-[10px] px-3 border-2  `}
                  onChange={(e) => setcommission(e.target.value)}
                  value={data.commission}
                />
              </div>
              <div className="w-[100%] h-[70px] flex justify-start gap-[10px] items-center pb-1">
                <input
                  className="w-[30% text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative "
                  type="checkbox"
                  onChange={(e) => {
                    setcomLineTemp(!comLineTemp);
                  }}
                  checked={data.comLine ? data.comLine : false}
                />
                <div className="w-[1000%] h-[45px] ">
                  <h4 className=" text-[12px] md:text-[14px] xl:text-[18px] font-[500]">
                    Add this line?
                  </h4>
                  <h5 className=" text-[12px] md:text-[12px] xl:text-[14px] font-[400]">
                    In addition, you will receive a {data.commission}%
                    commission upon the successful completion of projects on
                    boarded by you, and a 5% commission on projects sourced by
                    teams under your supervision (Referred to commission terms).
                  </h5>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between items-center">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] relative mb-2 md:mb-0">
                    Allowance
                  </label>
                  <div className="w-[60%] h-[45px] flex gap-[20px]">
                    <button
                      className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex justify-center items-center rounded-full border-2 border-color bg-[rgb(0,162,255)] text-white text-[20px]"
                      onClick={() => addAllowance()}
                    >
                      <FaPlus />
                    </button>
                    {data.allowance.length > 0 ? (
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

              {data.allowance?.map((item: any, key: any) => (
                <div key={key} className="w-full">
                  <AllowanceInputsProbation index={key} />
                </div>
              ))}
            </div>
            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px] font-[600] bg-[rgb(0,162,255)] text-white rounded-[10px] hover:opacity-[0.8]`}
                onClick={() =>
                  hasEmptyFieldResDate(
                    data,
                    setPrintClicked,
                    setFieldEmpty,
                    setShowPrint
                  )
                }
              >
                Save PDF
              </button>
              <button
                className="text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px] font-[600] bg-[rgb(0,162,255)] text-white rounded-[10px] hover:opacity-[0.8]"
                onClick={() => dispatch(setEmailShowR(true))}
              >
                Save for Email
              </button>
            </div>
          </div>
          <RecentRecord
            letterType={"Offer-Letter-Probation"}
            regenerate={regenerate}
            setShowPrint={setShowPrint}
          />

          {data.emailShow ? <OfferLetterProbationEmail /> : null}
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
            <OfferLetterProbationPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default OfferLetterProbation;
