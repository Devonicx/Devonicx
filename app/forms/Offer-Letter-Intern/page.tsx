"use client";

import { useEffect, useReducer, useState } from "react";
import OfferLetterInternEmail from "@/app/components/SaveForEmail/OfferLetterIntern";
import OfferLetterInternPrint from "@/app/components/SaveForPrint/OfferLetterIntern";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressR,
  setCurrentDateR,
  setDurationR,
  setEmailShowR,
  setEndingDateR,
  setGenderR,
  setHiringR,
  setNameR,
  setPrintShowR,
  setResponseDateR,
  setStartingDateR,
  setStipendR,
  setStipendTextR,
} from "@/app/store/OfferLetterIntern";
import { RootState } from "@/app/store";
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
  FaStar,
} from "react-icons/fa";
import {
  hasEmptyFieldResDate,
  redBorder,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "@/app/components/SelectChevron";

const OfferLetterIntern: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.OfferLetterIntern);
  let global = useSelector((state: RootState) => state.Global);
  let [gender, setGender] = useState(data.gender);
  let [currentDate, setCurrentDate] = useState(data.currentDate);
  let [name, setName] = useState(data.name);
  let [address, setAddress] = useState(data.address);
  let [hiring, setHiring] = useState(data.hiring);
  let [duration, setDuration] = useState(data.duration);
  let [startingDate, setStartingDate] = useState(data.startingDate);
  let [endingDate, setEndingDate] = useState(data.endingDate);
  let [responseDate, setResponseDate] = useState(data.responseDate);
  let [stipend, setStipend] = useState(data.stipend);
  let [stipendText1, setStipendText1] = useState(
    "We offer you an <b>unpaid</b> internship for the duration mentioned above."
  );
  let [stipendText2, setStipendText2] = useState(
    "We offer you an unpaid internship for the first month which can be increased up to <b>Rs: =15,000/- (Fifteen Thousand Rupees)</b> in total for the remaining months as per your performance. You will get a stipend increment letter once your stipend will be increased."
  );
  let [stipendText3, setStipendText3] = useState(
    "We offer you a paid internship and your monthly stipend will be <b>Rs: =10,000 (Ten Thousand Rupees)</b> for the duration mentioned above."
  );
  let [stipendText4, setStipendText4] = useState(
    "We offer you a paid internship and your first-month stipend will be <b>Rs: =10,000/- (Ten Thousand Rupees)</b> and can be increased up to Rs: =15,000/- (Fifteen Thousand Rupees) in total for the remaining months as per your performance. You will get a stipend increment letter once your stipend is increased."
  );
  let [stipendText, setStipendText] = useState(data.stipendText);
  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [animation, setAnimation] = useState<string>("");
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
        if (!data.forms.includes("Offer-Letter-Intern")) {
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
    dispatch(setHiringR(hiring));
    dispatch(setDurationR(duration));
    dispatch(setStartingDateR(startingDate));
    dispatch(setEndingDateR(endingDate));
    dispatch(setResponseDateR(responseDate));
    dispatch(setStipendR(stipend));
    dispatch(setStipendTextR(stipendText));
  }, [
    gender,
    currentDate,
    name,
    address,
    hiring,
    duration,
    startingDate,
    endingDate,
    responseDate,
    stipend,
    stipendText,
  ]);

  useEffect(() => {
    if (stipend === "Totally unpaid") {
      setStipendText(stipendText1);
    } else if (stipend === "first month unpaid") {
      setStipendText(stipendText2);
    } else if (stipend === "paid internship fix") {
      setStipendText(stipendText3);
    } else if (stipend === "paid internship unFix") {
      setStipendText(stipendText4);
    }
  }, [stipend, stipendText1, stipendText2, stipendText3, stipendText4]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Offer-Letter-Intern",
            dataToSend,
            createdBy: global.username,
          });
        } catch (err) {
          console.log(err);
        } finally {
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
    setHiring(newData.hiring);
    setDuration(newData.duration);
    setStartingDate(newData.startingDate);
    setEndingDate(newData.endingDate);
    setResponseDate(newData.responseDate);
    setStipend(newData.stipend);
    setStipendText(newData.stipendText);
    if (newData.stipend === "Totally unpaid") {
      setStipendText1(newData.stipendText);
    } else if (newData.stipend === "first month unpaid") {
      setStipendText2(newData.stipendText);
    } else if (newData.stipend === "paid internship fix") {
      setStipendText3(newData.stipendText);
    } else if (newData.stipend === "paid internship unFix") {
      setStipendText4(newData.stipendText);
    }
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
          <div
            className={`flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden `}
          >
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue">
              Internship Offer Letter
            </h2>
            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 bg-blue-40">
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.gender,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Gender
                </label>

                <select
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.currentDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Current Date
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] lg:text-[18px]  ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.gender,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Address
                </label>
                <input
                  placeholder="Enter Address"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.hiring,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Hiring Position
                </label>
                <input
                  placeholder="Enter Hiring Position"
                  type="text"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
                    data.hiring,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setHiring(e.target.value);
                  }}
                  value={hiring}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.gender,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Duration
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Months{" "}
                  </span>
                </label>
                <input
                  placeholder="Enter Duration"
                  type="number"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
                    data.duration,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  value={duration}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
                    data.startingDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={startingDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setStartingDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
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
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]   ${redBorder(
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
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative ">
                <label className="w-fit flex flex-col justify-end items-end">
                  <span className="w-fit text-[12px] md:text-[14px] xl:text-[18px]  font-[500]">
                    Response Date
                  </span>
                  <span className=" text-[9px] md:text-[10px] xl:text-[12px]  font-[400]">
                    Only For Emails
                  </span>
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  border-color`}
                  value={responseDate?.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setResponseDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>

              <div className="w-[100%] h-fit md:h-[70px] flex justify-between items-start md:items-center">
                <label className="w-[15%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] ">
                  Stipend
                </label>
                <div className="w-[60%] md:w-[82%] h-fit flex flex-col md:flex-row gap-y-2 md:gap-y-0 justify-between items-center text-[12px] md:text-[14px] xl:text-[18px]  ">
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.stipend === "Totally unpaid" ? "bg-blue-100" : null
                    }`}
                    onClick={() => {
                      setStipend("Totally unpaid"),
                        setStipendText(stipendText1);
                    }}
                  >
                    Totally Unpaid
                  </button>
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.stipend === "first month unpaid"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setStipend("first month unpaid"),
                        setStipendText(stipendText2);
                    }}
                  >
                    First Month Unpaid
                  </button>
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.stipend === "paid internship fix"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setStipend("paid internship fix"),
                        setStipendText(stipendText3);
                    }}
                  >
                    Paid Internship Fix
                  </button>
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.stipend === "paid internship unFix"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setStipend("paid internship unFix"),
                        setStipendText(stipendText4);
                    }}
                  >
                    Paid Internship Unfix
                  </button>
                </div>
              </div>
              <div className="w-[100%] h-fit flex justify-end items-center ">
                <div className="w-[60%]  md:w-[82%] flex justify-start items-center gap-[20px] mt-2 md:mt-0">
                  <div className="w-full h-fit rounded-[10px] border-2 border-color flex justify-start items-center text-[12px] md:text-[14px] xl:text-[18px] ">
                    {stipend === "Totally unpaid" ? (
                      <input
                        className="w-full h-full py-3 px-5 rounded-[10px]"
                        value={stipendText1}
                        onChange={(e) => {
                          setStipendText1(e.target.value);
                        }}
                      />
                    ) : stipend === "first month unpaid" ? (
                      <input
                        className="w-full h-full py-3 px-5 rounded-[10px]"
                        value={stipendText2}
                        onChange={(e) => {
                          setStipendText2(e.target.value);
                        }}
                      />
                    ) : stipend === "paid internship fix" ? (
                      <input
                        className="w-full h-full py-3 px-5 rounded-[10px]"
                        value={stipendText3}
                        onChange={(e) => {
                          setStipendText3(e.target.value);
                        }}
                      />
                    ) : stipend === "paid internship unFix" ? (
                      <input
                        className="w-full h-full py-3 px-5 rounded-[10px]"
                        value={stipendText4}
                        onChange={(e) => {
                          setStipendText4(e.target.value);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]`}
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
                className="text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]"
                onClick={() => dispatch(setEmailShowR(true))}
              >
                Save for Email
              </button>
            </div>
          </div>
          <RecentRecord
            letterType={"Offer-Letter-Intern"}
            regenerate={regenerate}
            setShowPrint={setShowPrint}
          />
          {data.emailShow ? <OfferLetterInternEmail /> : null}
        </div>
      ) : (
        <div className="w-full h-fit flex justify-center items-center overflow-auto">
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
            <OfferLetterInternPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default OfferLetterIntern;

          {/* <div className="transform scale-[40%] md:transform md:scale-[70%] lg:transform lg:scale-[100%] translate-y-[-15%] lg:translate-y-[0%] print:transform print:scale-[100%] print:translate-y-[0%] w-fit h-fit scrollNone" > */}