"use client";
"use client";
"use client";

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDesignationR,
  setNameR,
  setCurrentDateR,
  setCnicR,
  setEmployeeIdR,
  setPrintShowR,
} from "@/app/store/SocialMediaConsent";
import { RootState } from "@/app/store";
import SocialMediaConsentPrint from "@/app/components/SaveForPrint/SocialMediaConsent";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/app/components/Loader";
import { setAdminR, setFormsR, setRecentReloaderR, setUserNameR } from "@/app/store/Global";
import RecentRecord from "@/app/components/RecentRecord";
import { FaAsterisk, FaChevronLeft, FaPrint } from "react-icons/fa";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";

const SocialMediaConsent: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.SocialMediaConsent);
  let global = useSelector((state: RootState) => state.Global);
  let [name, setName] = useState(data.name);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [designation, setDesignation] = useState(data.designation);
  let [cnic, setCnic] = useState(data.cnic);
  let [employeeId, setEmployeeId] = useState(data.employeeId);
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
        if (!data.forms.includes("Social-Media-Consent")) {
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
    dispatch(setNameR(name));
    dispatch(setCurrentDateR(currentDate));
    dispatch(setDesignationR(designation));
    dispatch(setCnicR(cnic));
    dispatch(setEmployeeIdR(employeeId));
  }, [name, currentDate, designation, cnic, employeeId]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;
          await axios.post("/api/saveRecord", {
            type: "Social-Media-Consent",
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
    setName(newData.name);
    setCurrentDate(newData.currentDate);
    setDesignation(newData.designation);
    setCnic(newData.cnic);
    setEmployeeId(newData.employeeId);
  }
  const formatCNIC = (value: any) => {
    let formattedValue = value.replace(/\D/g, "");

    if (formattedValue.length > 5) {
      formattedValue =
        formattedValue.substring(0, 5) + "-" + formattedValue.substring(5);
    }
    if (formattedValue.length > 13) {
      formattedValue =
        formattedValue.substring(0, 13) + "-" + formattedValue.substring(13);
    }

    return formattedValue;
  };

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
            <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[20px] xl:text-[25px] font-[600] flex items-center justify-start text-main-blue px-3 md:px-10 xl:px-20 ">
              Social Media Consent
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
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
                </label>{" "}
                <input
                  placeholder="Enter Name"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.name,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
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
                      data.cnic,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  CNIC{" "}
                </label>{" "}
                <input
                  placeholder="00000-0000000-0"
                  type="text"
                  maxLength={15}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.cnic,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setCnic(formatCNIC(e.target.value))}
                  value={cnic}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.designation,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Designation
                </label>{" "}
                <input
                  placeholder="Enter Designation"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.designation,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
                />
              </div>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit  text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={`text-[8px] mt-[4px] w-fit ${redColor(
                        data.employeeId,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Employee ID
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Last Ref No: {data.lastEmployeeId}
                  </span>
                </label>
                <input
                  placeholder="Enter ID"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.employeeId,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  value={employeeId}
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
            letterType={"Social-Media-Consent"}
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
            <SocialMediaConsentPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMediaConsent;
