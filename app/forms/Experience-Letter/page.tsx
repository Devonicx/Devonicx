"use client";

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDesignationR,
  setCurrentDateR,
  setNameR,
  setGenderR,
  setStartingDateR,
  setEndingDateR,
  setRefNoR,
  setPrintShowR,
} from "@/app/store/ExperienceLetter";
import { RootState } from "@/app/store";
import ExperienceLetterPrint from "@/app/components/SaveForPrint/ExperienceLetter";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import RecentRecord from "@/app/components/RecentRecord";
import { setAdminR, setFormsR, setRecentReloaderR, setUserNameR } from "@/app/store/Global";
import { FaAsterisk, FaChevronDown, FaChevronLeft, FaPrint } from "react-icons/fa";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "../../components/SelectChevron";

const ExperienceLetter: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.ExperienceLetter);
  let global = useSelector((state: RootState) => state.Global);

  let [gender, setGender] = useState(data.gender);
  let [name, setName] = useState(data.name);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [designation, setDesignation] = useState(data.designation);
  let [refNo, setRefNo] = useState(data.refNo);
  let [startingDate, setStartingDate] = useState(data.startingDate);
  let [endingDate, setEndingDate] = useState(data.endingDate);

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [oldRefNo, setOldRefNo] = useState<any>(null);
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
                if (!data.forms.includes("Experience-Letter")) {
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
    dispatch(setDesignationR(designation));
    dispatch(setRefNoR(refNo));
    dispatch(setStartingDateR(startingDate));
    dispatch(setEndingDateR(endingDate));
  }, [gender, currentDate, name, designation, refNo, startingDate, endingDate]);
  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Experience-Letter",
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
  //       designation === data.newDataChecker.designation &&
  //       refNo === data.newDataChecker.refNo &&
  //       startingDate === data.newDataChecker.startingDate &&
  //       endingDate === data.newDataChecker.endingDate
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
    setDesignation(newData.designation);
    setRefNo(newData.refNo);
    setStartingDate(newData.startingDate);
    setEndingDate(newData.endingDate);
    setOldRefNo(newData.refNo);
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
              Experience Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.gender,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Gender{" "}
                </label>
                <select
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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

              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={`text-[8px] mt-[4px] w-fit ${redColor(
                        data.refNo,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Reference No
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Last Ref No: {data.lastRefNo}
                  </span>
                </label>

                <input
                  placeholder="Enter Reference No"
                  type="number"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.refNo,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setRefNo(e.target.value);
                  }}
                  value={refNo}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.designation,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                  value={designation}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  placeholder="Enter Salary"
                  type="date"
                  value={startingDate.split("-").reverse().join("-")}
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.startingDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setStartingDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.endingDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Ending Date
                </label>
                <input
                  placeholder="Enter Salary"
                  type="date"
                  className={`w-[60%]  text-[12px] md:text-[14px] xl:text-[18px] h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.endingDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={endingDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setEndingDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
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
            letterType={"Experience-Letter"}
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
            <ExperienceLetterPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceLetter;
