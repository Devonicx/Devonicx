"use client";

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressR,
  setCurrentDateR,
  setEndingDateR,
  setGenderR,
  setSectionR,
  setNameR,
  setStartingDateR,
  setCommentsR,
  setPrintShowR,
} from "@/app/store/TerminationLetter";
import { RootState } from "@/app/store";
import TerminationLetterPrint from "@/app/components/SaveForPrint/TerminationLetter";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import RecentRecord from "@/app/components/RecentRecord";
import { setAdminR, setFormsR, setRecentReloaderR, setUserNameR } from "@/app/store/Global";
import {
  FaAsterisk,
  FaChevronDown,
  FaChevronLeft,
  FaPrint,
} from "react-icons/fa";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "@/app/components/SelectChevron";

const TerminationLetter: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.TerminationLetter);
  let global = useSelector((state: RootState) => state.Global);
  let [gender, setGender] = useState(data.gender);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [name, setName] = useState(data.name);
  let [address, setAddress] = useState(data.address);
  let [section, setSection] = useState(data.section);
  let [startingDate, setStartingDate] = useState(data.startingDate);
  let [endingDate, setEndingDate] = useState(data.endingDate);

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [comments, setComments] = useState<string>(data.comments);
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
        if (!data.forms.includes("Termination-Letter")) {
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
    dispatch(setSectionR(section));
    dispatch(setStartingDateR(startingDate));
    dispatch(setEndingDateR(endingDate));
    dispatch(setCommentsR(comments));
  }, [
    gender,
    currentDate,
    name,
    address,
    section,
    startingDate,
    endingDate,
    comments,
  ]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Termination-Letter",
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
    setSection(newData.section);
    setStartingDate(newData.startingDate);
    setEndingDate(newData.endingDate);
    setComments(newData.comments);
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
              Termination Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.section,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Section No
                </label>
                <input
                  placeholder="Enter Section Number"
                  type="number"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.section,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setSection(e.target.value);
                  }}
                  value={section}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.startingDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Effective Date
                </label>
                <input
                  type="date"
                  value={startingDate.split("-").reverse().join("-")}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.endingDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Clearance Date
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
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
              </div>{" "}
              <div className="w-[100%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%] md:w-[15%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  Add Comments
                </label>
                <input
                  placeholder="Add Comments"
                  type="text"
                  value={comments}
                  className={`w-[60%] md:w-[82%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] border-color`}
                  onChange={(e) => {
                    setComments(e.target.value);
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
            letterType={"Termination-Letter"}
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
            <TerminationLetterPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default TerminationLetter;
