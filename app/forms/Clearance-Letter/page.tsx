"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameR,
  setCurrentDateR,
  setAddressR,
  setAssetsR,
  setChequeNoR,
  setClearanceDateR,
  setCnicR,
  setDesignationR,
  setEmployeeIdR,
  setJoiningDateR,
  setLastDateR,
  setPayableInWordsR,
  setPaymentDateR,
  setPayableR,
  setReasonForLeavingR,
  setDepartmentR,
  setPaymentModeR,
  setHrR,
  setPrR,
  setTltR,
  setPrintShowR,
} from "@/app/store/ClearanceLetter";
import { RootState } from "@/app/store";
import ClearanceLetterPrint from "@/app/components/SaveForPrint/ClearanceLetter";
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
import { FaAsterisk, FaChevronLeft, FaPrint } from "react-icons/fa";
import { formatAmount, formatCNIC } from "@/app/functions/formats";
import {
  hasEmptyField,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";

const ClearanceLetter: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.ClearanceLetter);
  let global = useSelector((state: RootState) => state.Global);

  let [name, setName] = useState(data.name);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [address, setaddress] = useState(data.address);
  let [employeeId, setEmployeeId] = useState(data.employeeId);
  let [designation, setDesignation] = useState(data.designation);
  let [department, setDepartment] = useState(data.department);
  let [joiningDate, setjoiningDate] = useState(data.joiningDate);
  let [lastDate, setlastDate] = useState(data.lastDate);
  let [cnic, setcnic] = useState(data.cnic);
  let [reasonForLeaving, setreasonForLeaving] = useState(data.reasonForLeaving);
  let [payable, setpayable] = useState(data.payable);
  let [payableInWords, setpayableInWords] = useState(data.payableInWords);
  let [chequeNo, setchequeNo] = useState(data.chequeNo);
  let [paymentDate, setpaymentDate] = useState(data.paymentDate);
  let [clearanceDate, setclearanceDate] = useState(data.clearanceDate);
  let [assets, setassets] = useState(data.assets);
  let [paymentMode, setPaymentMode] = useState(data.paymentMode);
  let [hr, setHr] = useState<any>(data.hr);
  let [pr, setPr] = useState<any>(data.pr);
  let [tlt, setTlt] = useState<any>(data.tlt);

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [showNote, setShowNote] = useState<boolean>(false);
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
        if (!data.forms.includes("Clearance-Letter")) {
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
    dispatch(setAddressR(address));
    dispatch(setAssetsR(assets));
    dispatch(setChequeNoR(chequeNo));
    dispatch(setClearanceDateR(clearanceDate));
    dispatch(setCnicR(cnic));
    dispatch(setDesignationR(designation));
    dispatch(setEmployeeIdR(employeeId));
    dispatch(setJoiningDateR(joiningDate));
    dispatch(setLastDateR(lastDate));
    dispatch(setPayableInWordsR(payableInWords));
    dispatch(setPaymentDateR(paymentDate));
    dispatch(setPayableR(payable));
    dispatch(setReasonForLeavingR(reasonForLeaving));
    dispatch(setDepartmentR(department));
    dispatch(setPaymentModeR(paymentMode));
    dispatch(setHrR(hr));
    dispatch(setPrR(pr));
    dispatch(setTltR(tlt));
  }, [
    name,
    currentDate,
    address,
    employeeId,
    designation,
    department,
    joiningDate,
    lastDate,
    cnic,
    reasonForLeaving,
    payable,
    payableInWords,
    chequeNo,
    paymentDate,
    clearanceDate,
    assets,
    paymentMode,
    hr,
    pr,
    tlt,
  ]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Clearance-Letter",
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
    setaddress(newData.address);
    setEmployeeId(newData.employeeId);
    setDesignation(newData.designation);
    setDepartment(newData.department);
    setjoiningDate(newData.joiningDate);
    setlastDate(newData.lastDate);
    setcnic(newData.cnic);
    setreasonForLeaving(newData.reasonForLeaving);
    setpayable(newData.payable);
    setpayableInWords(newData.payableInWords);
    setchequeNo(newData.chequeNo);
    setpaymentDate(newData.paymentDate);
    setclearanceDate(newData.clearanceDate);
    setassets(newData.assets);
    setPaymentMode(newData.paymentMode);
    setHr(newData.hr);
    setPr(newData.pr);
    setTlt(newData.tlt);
  }

  function noteShowFunction() {
    setShowNote(true);
  }
  usePreventPrint(showPrint);

  useEffect(() => {
    dispatch(setPrintShowR(showPrint));
  }, [showPrint]);
console.log(data);

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
              Clearance Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 ">
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.employeeId,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Employee ID
                </label>
                <input
                  placeholder="Devonicx-00"
                  type="text"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.employeeId,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                  }}
                  value={employeeId}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.department,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Department
                </label>
                <input
                  placeholder="Enter Department"
                  type="text"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.department,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  value={department}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.joiningDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Joining Date
                </label>
                <input
                  placeholder="Joining"
                  type="date"
                  value={joiningDate.split("-").reverse().join("-")}
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.joiningDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setjoiningDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.lastDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Last Date
                </label>
                <input
                  type="date"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.lastDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={lastDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setlastDate(e.target.value.split("-").reverse().join("-"));
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.cnic,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  CNIC{" "}
                </label>
                <input
                  placeholder="00000-0000000-0"
                  type="text"
                  maxLength={15}
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.address,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  value={address}
                />
              </div>
              <div className="w-[100%] h-fit md:h-[70px] flex justify-between items-center ">
                <label className="w-[30%] md:w-[15%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.reasonForLeaving,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Reason For Leaving
                </label>
                <div
                  className={`w-[60%] md:w-[82%] gap-1 md:gap-0 flex flex-wrap justify-between items-center rounded-[10px] `}
                >
                  <button
                    onClick={() => {
                      setreasonForLeaving("End of Internship");
                    }}
                    className={`w-[48%] md:w-[23%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px]  border-color flex justify-center items-center hover:border-black ${
                      data.reasonForLeaving === "End of Internship"
                        ? "bg-blue-100"
                        : null
                    }
                    
                      `}
                  >
                    End of Internship
                  </button>
                  <button
                    onClick={() => {
                      setreasonForLeaving("End of Probation");
                    }}
                    className={`w-[48%] md:w-[23%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] border-color flex justify-center items-center hover:border-black ${
                      data.reasonForLeaving === "End of Probation"
                        ? "bg-blue-100"
                        : null
                    }`}
                  >
                    End of Probation
                  </button>
                  <button
                    onClick={() => {
                      setreasonForLeaving("Termination");
                    }}
                    className={`w-[48%] md:w-[23%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] border-color flex justify-center items-center hover:border-black ${
                      data.reasonForLeaving === "Termination"
                        ? "bg-blue-100"
                        : null
                    }`}
                  >
                    Termination
                  </button>
                  <button
                    onClick={() => {
                      setreasonForLeaving("Resignation");
                    }}
                    className={`w-[48%] md:w-[23%] h-[45px] rounded-[10px] px-3 border-2  text-[12px] md:text-[14px] xl:text-[18px] border-color flex justify-center items-center hover:border-black ${
                      data.reasonForLeaving === "Resignation"
                        ? "bg-blue-100"
                        : null
                    }`}
                  >
                    Resignation
                  </button>
                </div>
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px]  mt-[4px] w-fit ${redColor(
                        data.payable,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Payable{" "}
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Clearance
                  </span>
                </label>

                <input
                  placeholder="000000"
                  type="text"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.payable,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setpayable(formatAmount(e.target.value));
                  }}
                  value={payable}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.chequeNo,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Cheque No
                </label>
                <input
                  placeholder="0000000"
                  type="number"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.chequeNo,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setchequeNo(e.target.value);
                  }}
                  value={chequeNo}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  {/* <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit text-transparent`}
                  /> */}
                  Payment Date
                </label>
                <input
                  placeholder="0000000"
                  type="date"
                  value={paymentDate.split("-").reverse().join("-")}
                    className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2`}
                  onChange={(e) => {
                    setpaymentDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.paymentMode,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Payment Mode
                </label>
                <input
                  placeholder="Enter Mode Of Payment"
                  type="text"
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.paymentMode,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setPaymentMode(e.target.value);
                  }}
                  value={paymentMode}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                <label className="w-[30%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px]  mt-[4px] w-fit ${redColor(
                      data.clearanceDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Clearance Date
                </label>
                <input
                  placeholder="0000000"
                  type="date"
                  value={clearanceDate.split("-").reverse().join("-")}
                  className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.clearanceDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setclearanceDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] h-[70px] flex justify-start  items-center">
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center">
                  <label className="w-fit flex flex-col justify-end items-end">
                    <span className="w-fit   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] flex items-start justify-start gap-[5px]">
                      {/* <FaAsterisk
                        className={` text-[8px]  mt-[4px] w-fit  text-transparent`}
                      /> */}
                      Assets
                    </span>
                    <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                      Requirable
                    </span>
                  </label>
                  <input
                    placeholder="Asset1, Asset2, Asset3"
                    type="text"
                    className={`w-[60%]   text-[12px] md:text-[14px] xl:text-[18px]   h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                      data.assets,
                      fieldEmpty,
                      printClicked
                    )}`}
                    onChange={(e) => {
                      setassets(e.target.value);
                    }}
                    onFocus={() => {
                      noteShowFunction();
                    }}
                    value={assets}
                  />
                </div>
                {showNote && (
                  <span className="w-[50%] h-[70px] flex justify-between items-center px-5 shower">
                    Add a comma between two Assets
                  </span>
                )}
              </div>

              <div className="w-[100%] min-h-[70px] max-h-fit flex justify-between items-center py-4 2xl:py-0">
                <span className="w-[15%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] ">
                  Human Resource
                </span>
                <div className="w-[60%] md:w-[82%]  h-[70px h-fit flex justify-start items-center flex-wrap gap-x-[2.6%] gap-y-2">
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={hr?.Skype_Credentials_Change}
                      onChange={(e) =>
                        setHr((prHr: any) => ({
                          ...prHr,
                          Skype_Credentials_Change: e.target.checked,
                        }))
                      }
                    />
                    <label>Skype Credentials Change</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={hr?.Official_Email_Restriction}
                      onChange={(e) =>
                        setHr((prHr: any) => ({
                          ...prHr,
                          Official_Email_Restriction: e.target.checked,
                        }))
                      }
                    />
                    <label>Official Email Restriction</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={hr?.File_Management}
                      onChange={(e) =>
                        setHr((prHr: any) => ({
                          ...prHr,
                          File_Management: e.target.checked,
                        }))
                      }
                    />
                    <label>File Management </label>
                  </div>
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={hr?.Assets_Recovery}
                      onChange={(e) =>
                        setHr((prHr: any) => ({
                          ...prHr,
                          Assets_Recovery: e.target.checked,
                        }))
                      }
                    />
                    <label>Assets Recovery</label>
                  </div>
                </div>
              </div>
              <div className="w-[100%] min-h-[70px] max-h-fit flex justify-between items-center py-4 2xl:py-0">
                <span className="w-[15%]   text-[12px] md:text-[14px] xl:text-[18px]   font-[500] ">
                  Project Manager
                </span>
                <div className="w-[60%] md:w-[82%]  h-[70px h-fit flex justify-start items-center flex-wrap gap-x-[2.6%] gap-y-2">
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={pr?.Change_All_Technical}
                      onChange={(e) =>
                        setPr((prPr: any) => ({
                          ...prPr,
                          Change_All_Technical: e.target.checked,
                        }))
                      }
                    />
                    <label>Change/Remove All Technical</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={pr?.Account_Permission}
                      onChange={(e) =>
                        setPr((prPr: any) => ({
                          ...prPr,
                          Account_Permission: e.target.checked,
                        }))
                      }
                    />
                    <label>Account Permission</label>
                  </div>
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={pr?.Configuration_of_All_TL_Data}
                      onChange={(e) =>
                        setPr((prPr: any) => ({
                          ...prPr,
                          Configuration_of_All_TL_Data: e.target.checked,
                        }))
                      }
                    />
                    <label>Configuration of All TL Data</label>
                  </div>
                </div>
              </div>
              <div className="w-[100%] min-h-[70px] max-h-fit flex justify-between items-center py-4 2xl:py-0">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit   text-[12px] md:text-[14px] xl:text-[18px]   font-[500]">
                    Team Leader
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Technical
                  </span>
                </label>
                <div className="w-[60%] md:w-[82%]  h-[70px h-fit flex justify-start items-center flex-wrap gap-x-[2.6%] gap-y-2">
                  <div
                    className={`w-[100%] md:w-fit h-[45px] rounded-[10px] px-3 border-2 border-color flex justify-start items-center gap-[10px]  text-[12px] md:text-[14px] xl:text-[18px]`}
                  >
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={tlt?.Retrieve_All_Technical_Data}
                      onChange={(e) =>
                        setTlt((prTlt: any) => ({
                          ...prTlt,
                          Retrieve_All_Technical_Data: e.target.checked,
                        }))
                      }
                    />
                    <label>Retrieve All Technical Data</label>
                  </div>
                </div>
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
            letterType={"Clearance-Letter"}
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
            <ClearanceLetterPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default ClearanceLetter;
