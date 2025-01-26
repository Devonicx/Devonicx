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
  setNewStipendR,
  setNewStipendInWordsR,
  setPrintShowR,

} from "@/app/store/StipendIncrementLetter";
import { RootState } from "@/app/store";
import StipendIncrementLetterPrint from "@/app/components/SaveForPrint/StipendIncrementLetter";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import RecentRecord from "@/app/components/RecentRecord";
import { setAdminR, setFormsR, setRecentReloaderR, setUserNameR } from "@/app/store/Global";
import { FaAsterisk, FaChevronDown, FaChevronLeft, FaPrint } from "react-icons/fa";
import { formatAmount } from "@/app/functions/formats";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "@/app/components/SelectChevron";

const StipendIncrementLetter: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.StipendIncrementLetter);
  let global = useSelector((state: RootState) => state.Global);
  let [gender, setGender] = useState(data.gender);
  let [name, setName] = useState(data.name);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [address, setAddress] = useState(data.address);
  let [effectiveDate, seteffectiveDate] = useState(data.effectiveDate);
  let [addLine, setAddLine] = useState(data.addLine);
  let [newStipend, setNewStipend] = useState(data.newStipend);
  let [newStipendInWords, setNewStipendInWords] = useState(
    data.newStipendInWords
  );

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
        if (!data.forms.includes("Stipend-Increment-Letter")) {
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
    dispatch(setNewStipendR(newStipend));
    dispatch(setNewStipendInWordsR(newStipendInWords));
  }, [
    gender,
    currentDate,
    name,
    address,
    effectiveDate,
    addLine,
    newStipend,
    newStipendInWords,
  ]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Stipend-Increment-Letter",
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

  // function sameData() {
  //   if (data.newDataChecker) {
  //     if (
  //       gender === data.newDataChecker.gender &&
  //       name === data.newDataChecker.name &&
  //       currentDate === data.newDataChecker.currentDate &&
  //       address === data.newDataChecker.address &&
  //       effectiveDate === data.newDataChecker.effectiveDate &&
  //       addLine === data.newDataChecker.addLine &&
  //       newStipend === data.newDataChecker.newStipend &&
  //       newStipendInWords === data.newDataChecker.newStipendInWords
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  function regenerate(newData: any) {
    setGender(newData.gender);
    setName(newData.name);
    setCurrentDate(newData.currentDate);
    setAddress(newData.address);
    seteffectiveDate(newData.effectiveDate);
    setAddLine(newData.addLine);
    setNewStipend(newData.newStipend);
    setNewStipendInWords(newData.newStipendInWords);

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
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue">
              Stipend Increment Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8  px-3 md:px-10 xl:px-20">
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.currentDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Gender
                </label>
                <select
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
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
                  value={currentDate.split("-").reverse().join("-")}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.currentDate,
                    fieldEmpty,
                    printClicked
                  )}`}
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
                  Name
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
                  Address{" "}
                </label>
                <input
                  placeholder="Enter Address"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
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
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
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
                  value={effectiveDate.split("-").reverse().join("-")}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.effectiveDate,
                    fieldEmpty,
                    printClicked
                  )}`}
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
                      data.newStipend,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  New Stipend
                </label>
                <input
                  placeholder="Enter New Stipend"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] ${redBorder(
                    data.newStipend,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setNewStipend(formatAmount(e.target.value));
                  }}
                  value={newStipend}
                />
              </div>

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
                  <h5 className=" text-[12px] md:text-[14px] xl:text-[14px] font-[400]">
                    The increment can be lift off if we feel your
                    responsibilities are compromised in future.
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
            letterType={"Stipend-Increment-Letter"}
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

          <StipendIncrementLetterPrint />
        </div>
        </div>
      )}
    </>
  );
};

export default StipendIncrementLetter;
