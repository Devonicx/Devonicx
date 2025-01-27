"use client";

import { useEffect, useReducer, useState } from "react";
import ContractPrint from "@/app/components/SaveForPrint/Contract";
import { useDispatch, useSelector } from "react-redux";
import {
  setaddressR,
  setceoR,
  setcurrentDateR,
  setdeliverablesR,
  setendDateR,
  setnameR,
  setprojectDescriptionR,
  setsoftwareHouseR,
  setstartDateR,
  settitleR,
  setamountR,
  setPrintShowR,
  setSignPicR,
  setDeadlineR,
  setDeadlineTextR,
  setPaymentR,
  setPaymentTextR,
  setphoneR,
  setemailR,
  setWrittenByTextR,
  setWrittenByR,
  setForIndividualR,
  setRefNameR,
  setRefPhoneR,
  setRefEmailR,
  resetValues,
  setRefCnicR,
  setRefDesignationR,
  setCeoNameR,
  setProvinceR,
  setCityR,
  setCompanyTypeR,
} from "@/app/store/Contract";
import { RootState } from "@/app/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import RecentRecordContract from "@/app/components/RecentRecordContract";
import {
  setAdminR,
  setFormsR,
  setRecentReloaderR,
  setUserNameR,
} from "@/app/store/Global";
import {
  FaArrowAltCircleDown,
  FaAsterisk,
  FaChevronCircleDown,
  FaChevronDown,
  FaChevronLeft,
  FaPrint,
  FaStar,
} from "react-icons/fa";
import {
  hasEmptyFieldContract,
  hasEmptyFieldResDate,
  redBorder,
  redBorderEmail,
  redColor,
} from "@/app/functions/formRequiredFields";
import usePreventPrint from "@/app/functions/printPreventer";
import SelectChevron from "@/app/components/SelectChevron";
import { formatAmount, formatCNIC } from "@/app/functions/formats";
import { formValidation } from "@/app/registration/formValidation";
import { date } from "yup";

const Contract: React.FC = () => {
  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => state.Contract);
  let global = useSelector((state: RootState) => state.Global);

  let [currentDate, setcurrentDate] = useState(data.currentDate);
  let [name, setname] = useState(data.name);
  let [softwareHouse, setsoftwareHouse] = useState(data.softwareHouse);
  let [address, setaddress] = useState(data.address);
  let [projectDescription, setprojectDescription] = useState(
    data.projectDescription
  );
  let [deliverables, setdeliverables] = useState(data.deliverables);
  let [startDate, setstartDate] = useState(data.startDate);
  let [endDate, setendDate] = useState(data.endDate);
  let [ceo, setceo] = useState(data.ceo);
  let [title, settitle] = useState(data.title);
  let [amount, setamount] = useState(data.amount);
  let [phone, setphone] = useState(data.phone);
  
  let [email, setemail] = useState(data.email);
  let [signPic, setsignPic]: any = useState(data.signPic);
  let [refName, setrefName] = useState(data.refName);
  let [refPhone, setrefPhone] = useState(data.refPhone);
  let [refCnic, setrefCnic] = useState(data.refCnic);
  let [refEmail, setrefEmail] = useState(data.refEmail);
  let [refDesignation, setrefDesignation] = useState(data.refDesignation);
  let [ceoName, setceoName] = useState(data.ceoName);
  let [deadline, setdeadline] = useState(data.deadline);
  let [deadlineText1, setdeadlineText1] = useState(
    `Service Provider agrees to deliver all project deliverables (as defined in Project Details and Deliverables) by [Date].`
  );
  let [deadlineText2, setdeadlineText2] = useState(
    `Service Provider agrees to deliver all project deliverables (as defined in Project Details and Deliverables) in milestones mentioned below: 
Task 1     [Date]
Task 2     [Date]`
  );
  let [deadlineText, setdeadlineText] = useState(data.deadlineText);
  let [payment, setpayment] = useState(data.payment);
  let [paymentText1, setpaymentText1] = useState(
    `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee"). The Fee will be paid upon Contractor's completion of all deliverables (as defined in Project Description & Deliverables) and Client's approval thereof, following successful testing and acceptance of the project by Client with in 2 banking days from the date of approval of the project.`
  );
  let [paymentText2, setpaymentText2] = useState(
    `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee"). [50]% of the Fee will be paid to Service Provider upon execution of this Agreement. The remaining Fee will be paid upon Contractor's completion of all deliverables (as defined in Project Description & Deliverables) and Client's approval thereof, following successful testing and acceptance of the project by Client with in 2 banking days from the date of approval of the project.`
  );
  let [paymentText3, setpaymentText3] = useState(
    `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee") in given project milestones deliverables. The milestones amount will be paid upon Service Provider's completion of all deliverables (as defined in the each milestone) and Client's approval thereof, following successful testing and acceptance of the project milestone by Client with in 1 banking day from the date of approval of each project milestone.
Milestone 1   [50%]   First Task 
Milestone 2   [30%]   Second Task`
  );
  let [paymentText4, setpaymentText4] = useState(
    `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee") in given project milestones deliverables. [50]% of the Fee will be paid to Service Provider upon execution of this Agreement. The remaining fee is divided into milestones that will be paid upon Service Provider's completion of all deliverables (as defined in the each milestone) and Client's approval thereof, following successful testing and acceptance of the project milestone by Client with in 1 banking day from the date of approval of each project milestone.
Milestone 1   [50%]   First Task 
Milestone 2   [30%]   Second Task`
  );
  let [paymentText, setpaymentText] = useState(data.paymentText);
  let [writtenBy, setwrittenBy] = useState(data.writtenBy);
  let [writtenByText, setwrittenByText] = useState(data.writtenByText);
  let [writtenByText1, setwrittenByText1] = useState(
    `Mohammad Rehan Arshad
Chief Executive Officer
Devonicx`
  );
  let [writtenByText2, setwrittenByText2] = useState(
    `Haseeb Arkam
Chief Technical Officer
Devonicx`
  );
  let [writtenByText3, setwrittenByText3] = useState(
    `[Name]
Project Manager
Devonicx`
  );

  let [isVerified, setIsVerified] = useState<any>(undefined);
  let [loading, setLoading] = useState<any>(true);
  let [saveloading, setSaveloading] = useState<boolean>(false);
  let [showPrint, setShowPrint] = useState<boolean>(data.printShow);
  let [animation, setAnimation] = useState<string>("");
  let [printClicked, setPrintClicked] = useState<boolean>(false);
  let [fieldEmpty, setFieldEmpty] = useState<boolean>(true);
  let [forIndividual, setForIndividual] = useState<boolean>(data.forIndividual);
  let [city, setCity] = useState<any>(data.city);
  let [province, setProvince] = useState<any>(data.province);
  let [companyType, setcompanyType] = useState<any>(data.companyType);

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
        if (!data.forms.includes("Contract")) {
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
    dispatch(setcurrentDateR(currentDate));
    dispatch(setnameR(name));
    dispatch(setaddressR(address));
    dispatch(setprojectDescriptionR(projectDescription));
    dispatch(setphoneR(phone));
    dispatch(setemailR(email));
    dispatch(setdeliverablesR(deliverables));
    dispatch(setstartDateR(startDate));
    dispatch(setendDateR(endDate));
    dispatch(setceoR(ceo));
    dispatch(settitleR(title));
    dispatch(setamountR(amount));
    dispatch(setSignPicR(signPic));
    dispatch(setDeadlineR(deadline));
    dispatch(setDeadlineTextR(deadlineText));
    dispatch(setPaymentR(payment));
    dispatch(setPaymentTextR(paymentText));
    dispatch(setWrittenByR(writtenBy));
    dispatch(setWrittenByTextR(writtenByText));
    dispatch(setForIndividualR(forIndividual));
    if (forIndividual) {
      dispatch(setRefNameR("_"));
      dispatch(setRefPhoneR("_"));
      dispatch(setRefEmailR("demy@gmail.com"));
      dispatch(setRefDesignationR("_"));
      dispatch(setCeoNameR("_"));
      dispatch(setProvinceR("_"));
      dispatch(setCompanyTypeR("_"));
      dispatch(setRefCnicR("_"));
      dispatch(setCityR("_"));
      dispatch(setsoftwareHouseR(softwareHouse));
    } else {
      dispatch(setRefNameR(refName));
      dispatch(setRefPhoneR(refPhone));
      dispatch(setRefCnicR(refCnic));
      dispatch(setRefEmailR(refEmail));
      dispatch(setRefDesignationR(refDesignation));
      dispatch(setCeoNameR(ceoName));
      dispatch(setCompanyTypeR(companyType));
      dispatch(setProvinceR(province));
      dispatch(setCityR(city));
      dispatch(setsoftwareHouseR("_"));
    }
  }, [
    currentDate,
    name,
    softwareHouse,
    address,
    refName,
    refPhone,
    refCnic,
    refEmail,
    refDesignation,
    ceoName,
    companyType,
    projectDescription,
    phone,
    email,
    deliverables,
    startDate,
    endDate,
    ceo,
    title,
    amount,
    signPic,
    deadline,
    deadlineText,
    payment,
    paymentText,
    writtenBy,
    writtenByText,
    forIndividual,
    province,
    city,
  ]);
  useEffect(() => {
    if (payment === "One time Payment after Project") {
      setpaymentText(paymentText1);
    } else if (payment === "One time Payment after Advance.") {
      setpaymentText(paymentText2);
    } else if (payment === "Payment in Milestones without advance") {
      setpaymentText(paymentText3);
    } else if (payment === "Payment in Milestones with Advance") {
      setpaymentText(paymentText4);
    }
  }, [payment, paymentText1, paymentText2, paymentText3, paymentText4]);

  useEffect(() => {
    if (deadline === "One Sharp Deadline") {
      setdeadlineText(deadlineText1);
    } else if (deadline === "Milestones Wise") {
      setdeadlineText(deadlineText2);
    }
  }, [deadline, deadlineText1, deadlineText2]);

  useEffect(() => {
    if (writtenBy === "CEO") {
      setwrittenByText(writtenByText1);
    } else if (writtenBy === "CTO") {
      setwrittenByText(writtenByText2);
    } else if (writtenBy === "PM") {
      setwrittenByText(writtenByText3);
    }
  }, [writtenBy, writtenByText3, writtenByText2, writtenByText1]);

  if (typeof window !== "undefined") {
    window.onafterprint = (event) => {
      async function saveRecord() {
        try {
          setSaveloading(true);
          let { newDataChecker, emailShow, ...dataToSend } = data;

          await axios.post("/api/saveRecord", {
            type: "Contract",
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
    setcurrentDate(newData.currentDate);
    setname(newData.name);
    setsoftwareHouse(newData.softwareHouse);
    setaddress(newData.address);
    setprojectDescription(newData.projectDescription);
    setphone(newData.phone);
    setemail(newData.email);
    setdeliverables(newData.deliverables);
    setstartDate(newData.startDate);
    setendDate(newData.endDate);
    setceo(newData.ceo);
    settitle(newData.title);
    setamount(newData.amount);
    setsignPic(newData.signPic);
    setrefName(newData.refName);
    setrefPhone(newData.refPhone);
    setrefCnic(newData.refCnic);
    setrefDesignation(newData.refDesignation);
    setceoName(newData.ceoName);
    setcompanyType(newData.companyType);
    setCity(newData.city);
    setProvince(newData.province);
    setrefEmail(newData.refEmail);
    setdeadline(newData.deadline);
    setForIndividual(newData.forIndividual);
    setdeadlineText(newData.deadlineText);
    if (newData.deadline === "One Sharp Deadline") {
      setdeadlineText1(newData.deadlineText);
    } else if (newData.deadline === "Milestones Wise") {
      setdeadlineText2(newData.deadlineText);
    }
    setwrittenBy(newData.writtenBy);
    setwrittenByText(newData.writtenByText);
    if (newData.writtenBy === "CEO") {
      setwrittenByText1(newData.writtenByText);
    } else if (newData.writtenBy === "CTO") {
      setwrittenByText2(newData.writtenByText);
    } else if (newData.writtenBy === "PM") {
      setwrittenByText3(newData.writtenByText);
    }
    setpayment(newData.payment);
    setpaymentText(newData.paymentText);
    if (newData.payment === "One time Payment after Project") {
      setpaymentText1(newData.paymentText);
    } else if (newData.payment === "One time Payment after Advance.") {
      setpaymentText2(newData.paymentText);
    } else if (newData.payment === "Payment in Milestones without advance") {
      setpaymentText3(newData.paymentText);
    } else if (newData.payment === "Payment in Milestones with Advance") {
      setpaymentText4(newData.paymentText);
    }
  }

  usePreventPrint(showPrint);

  useEffect(() => {
    dispatch(setPrintShowR(showPrint));
  }, [showPrint]);

  useEffect(() => {
    const handleKeydown = (event: any) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "p" || event.key === "P")
      ) {
        if (showPrint) {
          window.scrollTo({
            top: 0,
            behavior: "instant",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [showPrint]);
  function resetValuesState() {
    setcurrentDate("");
    setname("");
    setsoftwareHouse("");
    setaddress("");
    setstartDate("");
    setendDate("");
    setamount("");
    setphone("");
    settitle("");
    setprojectDescription("");
    setemail("");
    setdeliverables("");
    setdeadline("One Sharp Deadline");
    setdeadlineText(
      `Service Provider agrees to deliver all project deliverables (as defined in Project Details and Deliverables) by [Date].`
    );
    setdeadlineText2(
      `Service Provider agrees to deliver all project deliverables (as defined in Project Details and Deliverables) in milestones mentioned below: 
Task 1     [Date]
Task 2     [Date]`
    );

    setpayment("One time Payment after Project");
    setpaymentText(
      `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee"). The Fee will be paid upon Contractor's completion of all deliverables (as defined in Project Description & Deliverables) and Client's approval thereof, following successful testing and acceptance of the project by Client with in 2 banking days from the date of approval of the project.`
    );
    setpaymentText2(
      `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee"). [50]% of the Fee will be paid to Service Provider upon execution of this Agreement. The remaining Fee will be paid upon Contractor's completion of all deliverables (as defined in Project Description & Deliverables) and Client's approval thereof, following successful testing and acceptance of the project by Client with in 2 banking days from the date of approval of the project.`
    );
    setpaymentText3(
      `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee") in given project milestones deliverables. The milestones amount will be paid upon Service Provider's completion of all deliverables (as defined in the each milestone) and Client's approval thereof, following successful testing and acceptance of the project milestone by Client with in 1 banking day from the date of approval of each project milestone.
Milestone 1   [50%]   First Task 
Milestone 2   [30%]   Second Task`
    );
    setpaymentText4(
      `Client shall pay Service Provider a total fee of [AMOUNT] for the Services (the "Fee") in given project milestones deliverables. [50]% of the Fee will be paid to Service Provider upon execution of this Agreement. The remaining fee is divided into milestones that will be paid upon Service Provider's completion of all deliverables (as defined in the each milestone) and Client's approval thereof, following successful testing and acceptance of the project milestone by Client with in 1 banking day from the date of approval of each project milestone.
Milestone 1   [50%]   First Task 
Milestone 2   [30%]   Second Task`
    );
    setwrittenBy("");
    setwrittenByText("");
    setrefName("");
    setrefPhone("");
    setrefCnic("");
    setrefDesignation("");
    setceoName("");
    setcompanyType("");
    setCity("");
    setProvince("");
    setrefEmail("");
  }

  function OptionalIndividual() {
    setrefName("_");
    setrefPhone("_");
    setrefCnic("_");
    setrefDesignation("_");
    setceoName("_");
    setcompanyType("_");
    setCity("_");
    setProvince("_");
    setrefEmail("demy@gmail.com");
  }

  function OptionalCompany() {
    setsoftwareHouse("_");
  }
  const pakistanData: any = {
    provinces: {
      Punjab: [
        "Lahore",
        "Faisalabad",
        "Rawalpindi",
        "Multan",
        "Gujranwala",
        "Sialkot",
        "Bahawalpur",
        "Gujrat",
        "Sargodha",
        "Sheikhupura",
        "Jhang",
        "Rahim Yar Khan",
        "Kasur",
        "Okara",
        "Sahiwal",
        "Attock",
        "Mandi Bahauddin",
        "Dera Ghazi Khan",
        "Mianwali",
        "Chiniot",
        "Khanewal",
        "Bhakkar",
        "Toba Tek Singh",
        "Vehari",
        "Chakwal",
        "Lodhran",
        "Nankana Sahib",
        "Khushab",
        "Rajanpur",
        "Layyah",
        "Pakpattan",
        "Muzaffargarh",
        "Narowal",
        "Hafizabad",
        "Bahawalnagar",
        "Chishtian",
      ],
      Sindh: [
        "Karachi",
        "Hyderabad",
        "Sukkur",
        "Larkana",
        "Nawabshah (Shaheed Benazirabad)",
        "Mirpur Khas",
        "Khairpur",
        "Dadu",
        "Tando Allahyar",
        "Jacobabad",
        "Shikarpur",
        "Thatta",
        "Badin",
        "Ghotki",
        "Sanghar",
        "Kashmore",
        "Jamshoro",
        "Umerkot",
      ],
      "Khyber Pakhtunkhwa": [
        "Peshawar",
        "Abbottabad",
        "Mardan",
        "Swat",
        "Mansehra",
        "Kohat",
        "Haripur",
        "Nowshera",
        "Chitral",
        "Charsadda",
        "Dera Ismail Khan",
        "Bannu",
        "Batagram",
        "Hangu",
        "Karak",
        "Swabi",
        "Tank",
        "Lakki Marwat",
        "Upper Dir",
        "Lower Dir",
        "Malakand",
        "Shangla",
        "Kohistan",
        "Buner",
      ],
      Balochistan: [
        "Quetta",
        "Gwadar",
        "Khuzdar",
        "Chaman",
        "Turbat",
        "Hub",
        "Sibi",
        "Zhob",
        "Loralai",
        "Mastung",
        "Kharan",
        "Nushki",
        "Kalat",
        "Dera Bugti",
        "Panjgur",
        "Mach",
        "Gwargo",
        "Jiwani",
      ],
      "Gilgit-Baltistan": [
        "Gilgit",
        "Skardu",
        "Chilas",
        "Ghanche",
        "Khaplu",
        "Astore",
        "Diamer",
        "Ghizer",
        "Hunza",
      ],
      "Azad Jammu and Kashmir (AJK)": [
        "Muzaffarabad",
        "Mirpur",
        "Kotli",
        "Rawalakot",
        "Bagh",
        "Bhimber",
        "Haveli",
      ],
    },
  };
  const companyTypesArray = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Cooperative",
    "Nonprofit Organization",
    "Joint Venture",
    "Franchise",
    "Holding Company",
    "Subsidiary",
    "Public Limited Company (PLC)",
    "Private Limited Company (Ltd.)",
    "Government-Owned Corporation",
  ];
  return (
    <>
      {loading || isVerified === undefined || isVerified === false ? (
        <div className="w-fit m-auto py-24">
          <Loader />
        </div>
      ) : !showPrint ? (
        <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
          <div
            className={`flex flex-col bg-[rgb(250,250,250)] ${animation} justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden `}
          >
            <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-start text-main-blue capitalize">
              Project Outsource Contract
            </h2>

            <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20">
              <div className="w-full h-fit flex flex-col justify-start items-start  text-[13px] md:text-[16px] xl:text-[20px] font-[500] mb-5 text-white bg-main-blu">
                <div className="w-full h-fit flex justify-between items-center">
                  <button
                    className={`w-[50%]   text-[13px] md:text-[16px] xl:text-[20px] font-[700]  py-1 md:py-2 xl:py-2  px-3 md:px-2 xl:px-3  text-center z-[50] ${
                      !forIndividual
                        ? "text-black bg-[rgb(254,213,0)]"
                        : "text-white bg-main-blue"
                    }`}
                    onClick={() => {
                      setForIndividual(true),
                        forIndividual ? null : resetValuesState(),
                        OptionalIndividual();
                    }}
                  >
                    For Individuals
                  </button>
                  <button
                    className={`w-[50%]   text-[13px] md:text-[16px] xl:text-[20px] font-[700]  py-1 md:py-2 xl:py-2  px-3 md:px-2 xl:px-3  text-center z-[50] ${
                      forIndividual
                        ? "text-black bg-[rgb(254,213,0)]"
                        : "text-white bg-main-blue"
                    }`}
                    onClick={() => {
                      setForIndividual(false),
                        !forIndividual ? null : resetValuesState(),
                        OptionalCompany();
                    }}
                  >
                    For Agencies
                  </button>
                </div>
                <div
                  className={`w-full h-fit flex ${
                    forIndividual ? "justify-start" : "justify-end"
                  } items-center`}
                >
                  {forIndividual ? (
                    <div className="w-[50%]   text-[13px] md:text-[16px] xl:text-[20px] font-[700]   px-3 md:px-2 xl:px-3  text-center flex justify-center items-center z-[0]">
                      <div className="w-[15px] md:w-[20px] xl:w-[30px] h-[15px] md:h-[20px] xl:h-[30px]  bg-main-blue rotate-45 relative top-[-10px] md:top-[-15px] xl:top-[-15px]"></div>
                    </div>
                  ) : (
                    <div className="w-[50%]  float-left text-[13px] md:text-[16px] xl:text-[20px] font-[700]   px-3 md:px-2 xl:px-3  text-center flex justify-center items-center z-[0]">
                      <div className="w-[15px] md:w-[20px] xl:w-[30px] h-[15px] md:h-[20px] xl:h-[30px]  bg-main-blue rotate-45 relative top-[-10px] md:top-[-15px] xl:top-[-15px]"></div>
                    </div>
                  )}
                </div>
              </div>
              <h2 className="w-full border-b-[1px] border-color  text-[13px] md:text-[16px] xl:text-[20px] font-[500]  py-1 md:py-2 xl:py-2  px-3 md:px-2 xl:px-3  mb-7 flex items-center justify-start text-white bg-main-blue">
                {forIndividual
                  ? "Contractor Information"
                  : "Agency Information"}
              </h2>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
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
                  type="text"
                  placeholder={`${
                    forIndividual
                      ? "Enter Contractor Name"
                      : "Enter Company Name"
                  }`}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.name,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </div>
              {forIndividual ? (
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.softwareHouse,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    CNIC
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="Enter Contractor CNIC"
                    className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.softwareHouse,
                      fieldEmpty,
                      printClicked
                    )}`}
                    value={softwareHouse}
                    onChange={(e) => {
                      setsoftwareHouse(formatCNIC(e.target.value));
                    }}
                  />
                </div>
              ) : null}
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[35%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.address,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Address
                </label>
                <input
                  type="text"
                  placeholder={`${
                    forIndividual
                      ? "Enter Contractor Address"
                      : "Enter Company Address"
                  }`}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.address,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={address}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.phone,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Phone
                </label>
                <input
                  type="number"
                  placeholder={`${
                    forIndividual
                      ? "Enter Contractor Phone"
                      : "Enter Company Phone"
                  }`}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.phone,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={phone}
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.email,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Email
                </label>
                <input
                  type="text"
                  placeholder={`${
                    forIndividual
                      ? "Enter Contractor Email"
                      : "Enter Company Email"
                  }`}
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorderEmail(
                    data.email,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              {!forIndividual ? (
                <>
                  <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                    <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                      <FaAsterisk
                        className={` text-[8px] mt-[4px] w-fit ${redColor(
                          data.ceoName,
                          fieldEmpty,
                          printClicked
                        )}`}
                      />
                      CEO Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter CEO Name"
                      className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                        data.ceoName,
                        fieldEmpty,
                        printClicked
                      )}`}
                      value={ceoName}
                      onChange={(e) => {
                        setceoName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                    <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                      <FaAsterisk
                        className={`text-[8px] mt-[4px] w-fit  ${redColor(
                          data.province,
                          fieldEmpty,
                          printClicked
                        )}`}
                      />
                      Province
                    </label>
                    <select
                      className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                        data.province,
                        fieldEmpty,
                        printClicked
                      )}`}
                      onChange={(e) => {
                        setProvince(e.target.value);
                        setCity("");
                      }}
                      value={data.province}
                    >
                      <option value="">Select Province</option>
                      {Object.keys(pakistanData.provinces).map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                  <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                    <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                      <FaAsterisk
                        className={`text-[8px] mt-[4px] w-fit  ${redColor(
                          data.city,
                          fieldEmpty,
                          printClicked
                        )}`}
                      />
                      City
                    </label>
                    <select
                      className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                        data.city,
                        fieldEmpty,
                        printClicked
                      )}`}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      value={data.city}
                    >
                      <option value="">Select City</option>
                      {pakistanData.provinces[province]?.map((city: any) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                  <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                    <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                      <FaAsterisk
                        className={`text-[8px] mt-[4px] w-fit  ${redColor(
                          data.companyType,
                          fieldEmpty,
                          printClicked
                        )}`}
                      />
                      Company Type
                    </label>
                    <select
                      className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                        data.companyType,
                        fieldEmpty,
                        printClicked
                      )}`}
                      onChange={(e) => {
                        setcompanyType(e.target.value);
                      }}
                      value={data.companyType}
                    >
                      <option value="">Select Company Type</option>
                      {companyTypesArray.map((type: any) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </>
              ) : null}
              {!forIndividual ? (
                <>
                  <h2 className="w-full border-b-[1px] border-color  text-[13px] md:text-[16px] xl:text-[20px] font-[500] px-3 md:px-2  py-1 md:py-2 xl:py-2  mt-7 mb-7 xl:px-3 flex items-center justify-start text-white bg-main-blue">
                    Reference Person Information
                  </h2>
                  <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                    <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                      <FaAsterisk
                        className={` text-[8px] mt-[4px] w-fit ${redColor(
                          data.refName,
                          fieldEmpty,
                          printClicked
                        )}`}
                      />
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                        data.refName,
                        fieldEmpty,
                        printClicked
                      )}`}
                      value={refName}
                      onChange={(e) => {
                        setrefName(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : null}
              {!forIndividual ? (
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.refPhone,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone"
                    className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.refPhone,
                      fieldEmpty,
                      printClicked
                    )}`}
                    value={refPhone}
                    onChange={(e) => {
                      setrefPhone(e.target.value);
                    }}
                  />
                </div>
              ) : null}
              {!forIndividual ? (
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.refCnic,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    CNIC
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="Enter CNIC"
                    className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.refCnic,
                      fieldEmpty,
                      printClicked
                    )}`}
                    value={refCnic}
                    onChange={(e) => {
                      setrefCnic(formatCNIC(e.target.value));
                    }}
                  />
                </div>
              ) : null}
              {!forIndividual ? (
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.refEmail,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorderEmail(
                      data.refEmail,
                      fieldEmpty,
                      printClicked
                    )}`}
                    value={refEmail}
                    onChange={(e) => {
                      setrefEmail(e.target.value);
                    }}
                  />
                </div>
              ) : null}
              {!forIndividual ? (
                <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                  <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                    <FaAsterisk
                      className={` text-[8px] mt-[4px] w-fit ${redColor(
                        data.refDesignation,
                        fieldEmpty,
                        printClicked
                      )}`}
                    />
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Designation"
                    className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.refDesignation,
                      fieldEmpty,
                      printClicked
                    )}`}
                    value={refDesignation}
                    onChange={(e) => {
                      setrefDesignation(e.target.value);
                    }}
                  />
                </div>
              ) : null}
              <h2 className="w-full border-b-[1px] border-color  text-[13px] md:text-[16px] xl:text-[20px] font-[500] px-3 md:px-2  py-1 md:py-2 xl:py-2  mt-7 mb-7 xl:px-3 flex items-center justify-start text-white bg-main-blue">
                Other Terms
              </h2>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.currentDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Contract Date
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.currentDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={currentDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setcurrentDate(
                      e.target.value.split("-").reverse().join("-")
                    );
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.amount,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Project Cost
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Cost"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.amount,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={amount}
                  onChange={(e) => {
                    setamount(formatAmount(e.target.value));
                  }}
                />
              </div>{" "}
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.title,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Title"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.title,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.startDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Start Date
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.startDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={startDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setstartDate(e.target.value.split("-").reverse().join("-"));
                  }}
                />
              </div>{" "}
              <div className="w-[100%] md:w-[45%] h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.endDate,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Completion Date
                </label>
                <input
                  type="date"
                  className={`w-[60%] h-[45px] rounded-[10px] px-3 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.endDate,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={endDate.split("-").reverse().join("-")}
                  onChange={(e) => {
                    setendDate(e.target.value.split("-").reverse().join("-"));
                  }}
                />
              </div>
              <div className="w-[100%] h-fit md:h-[70px] flex justify-between items-start pt-3">
                <label className="w-[30%] sm:w-[15%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start gap-[5px] pt-2">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.deadlineText,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Deadline
                </label>
                <div className="w-[60%] md:w-[82%] flex flex-col md:flex-row gap-y-2 md:gap-y-0 justify-start gap-x-2 md:gap-x-5 items-center text-[12px] md:text-[14px] xl:text-[18px]  ">
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.deadline === "One Sharp Deadline"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setdeadline("One Sharp Deadline"),
                        setdeadlineText(deadlineText1);
                    }}
                  >
                    One Sharp Deadline
                  </button>
                  <button
                    className={`w-full md:w-[23%] h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.deadline === "Milestones Wise" ? "bg-blue-100" : null
                    }`}
                    onClick={() => {
                      setdeadline("Milestones Wise"),
                        setdeadlineText(deadlineText2);
                    }}
                  >
                    Milestones Wise
                  </button>
                </div>
              </div>
              <div className="w-[100%] h-fit flex justify-end items-center ">
                <div className="w-[60%]  md:w-[82%] flex justify-start items-center gap-[20px] mt-2 md:mt-0">
                  <div className="w-full h-fit rounded-[10px] flex justify-start items-center text-[12px] md:text-[14px] xl:text-[18px] ">
                    {deadline === "One Sharp Deadline" ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.deadlineText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={deadlineText1}
                        onChange={(e) => {
                          setdeadlineText1(e.target.value);
                        }}
                      />
                    ) : deadline === "Milestones Wise" ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.deadlineText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={deadlineText2}
                        onChange={(e) => {
                          setdeadlineText2(e.target.value);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>{" "}
              <div className="w-[100%] min-h-[70px] max-h-fit flex justify-between  items-start relative pt-6">
                <label className="w-[30%] sm:w-[15%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start pt-2 gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.projectDescription,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter Project Details"
                  className={`w-[60%] md:w-[82%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.projectDescription,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={projectDescription}
                  onChange={(e) => {
                    setprojectDescription(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%] min-h-[70px] max-h-fit flex justify-between  items-start relative pt-6">
                <label className="w-[30%] sm:w-[15%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start pt-2 gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit text-red-500`}
                  />
                  Deliverables
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter Deliverables"
                  className={`w-[60%] md:w-[82%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                    data.deliverables,
                    fieldEmpty,
                    printClicked
                  )}`}
                  value={deliverables}
                  onChange={(e) => {
                    setdeliverables(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%] h-fit md:h-fit pt-6 flex justify-between items-start ">
                <label className="w-[30%] sm:w-[15%] text-[12px] md:text-[14px] xl:text-[18px] font-[500] flex items-start justify-start pt-2 gap-[5px]">
                  <FaAsterisk
                    className={` text-[8px] mt-[4px] w-fit ${redColor(
                      data.paymentText,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Payments
                </label>
                <div className="w-[60%] md:w-[82%] flex flex-col md:flex-row gap-y-2 md:gap-y-2 justify-betwee flex-wrap gap-x-0 md:gap-x-3 items-center text-[12px] md:text-[14px] xl:text-[18px]  ">
                  <button
                    className={`w-full md:w-fit px-3 h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.payment === "One time Payment after Project"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setpayment("One time Payment after Project"),
                        setpaymentText(paymentText1);
                    }}
                  >
                    One time Payment after Project
                  </button>
                  <button
                    className={`w-full md:w-fit px-3 h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.payment === "One time Payment after Advance."
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setpayment("One time Payment after Advance."),
                        setpaymentText(paymentText2);
                    }}
                  >
                    {" "}
                    One time Payment after Advance.
                  </button>
                  <button
                    className={`w-full md:w-fit px-3 h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.payment === "Payment in Milestones without advance"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setpayment("Payment in Milestones without advance"),
                        setpaymentText(paymentText3);
                    }}
                  >
                    Payment in Milestones without advance
                  </button>
                  <button
                    className={`w-full md:w-fit px-3 h-[45px] rounded-[10px] border-2 border-color flex justify-center items-center hover:border-black ${
                      data.payment === "Payment in Milestones with Advance"
                        ? "bg-blue-100"
                        : null
                    }`}
                    onClick={() => {
                      setpayment("Payment in Milestones with Advance"),
                        setpaymentText(paymentText4);
                    }}
                  >
                    Payment in Milestones with Advance
                  </button>
                </div>
              </div>
              <div className="w-[100%] h-fit flex justify-end items-center pt-3">
                <div className="w-[60%]  md:w-[82%] flex justify-start items-center gap-[20px] mt-2 md:mt-0">
                  <div className="w-full h-fit rounded-[10px] flex justify-start items-center text-[12px] md:text-[14px] xl:text-[18px] ">
                    {payment === "One time Payment after Project" ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.paymentText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={paymentText1}
                        onChange={(e) => {
                          setpaymentText1(e.target.value);
                        }}
                      />
                    ) : payment === "One time Payment after Advance." ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.paymentText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={paymentText2}
                        onChange={(e) => {
                          setpaymentText2(e.target.value);
                        }}
                      />
                    ) : payment === "Payment in Milestones without advance" ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.paymentText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={paymentText3}
                        onChange={(e) => {
                          setpaymentText3(e.target.value);
                        }}
                      />
                    ) : payment === "Payment in Milestones with Advance" ? (
                      <textarea
                        rows={5}
                        className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                          data.paymentText,
                          fieldEmpty,
                          printClicked
                        )}`}
                        value={paymentText4}
                        onChange={(e) => {
                          setpaymentText4(e.target.value);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <h2 className="w-full border-b-[1px] border-color  text-[13px] md:text-[16px] xl:text-[20px] font-[500] px-3 md:px-2  py-1 md:py-2 xl:py-2  mt-7 mb-7 xl:px-3 flex items-center justify-start text-white bg-main-blue">
                Footer
              </h2>
              <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center relative">
                <label className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[500] flex items-start justify-start gap-[5px]">
                  <FaAsterisk
                    className={`text-[8px] mt-[4px] w-fit ${redColor(
                      data.writtenBy,
                      fieldEmpty,
                      printClicked
                    )}`}
                  />
                  Written By
                </label>{" "}
                <select
                  className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border-2  ${redBorder(
                    data.writtenBy,
                    fieldEmpty,
                    printClicked
                  )}`}
                  onChange={(e) => {
                    setwrittenBy(e.target.value);
                    setwrittenByText(
                      writtenBy === "CEO"
                        ? writtenByText1
                        : writtenBy === "CTO"
                        ? writtenByText2
                        : writtenBy === "PM"
                        ? writtenByText3
                        : null
                    );
                  }}
                  value={writtenBy}
                >
                  <option value="">Select</option>
                  <option value="CEO">CEO</option>
                  <option value="CTO">CTO</option>
                  <option value="PM">PM</option>
                </select>
                <SelectChevron />
              </div>
              <div className="w-[100%] md:w-[50%]  h-fit flex justify-end  items-center relative bg-yellow-30 pt-3">
                {writtenBy === "CEO" ? (
                  <textarea
                    className={`w-[60%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.writtenByText,
                      fieldEmpty,
                      printClicked
                    )}`}
                    rows={3}
                    value={writtenByText1}
                    onChange={(e) => {
                      setwrittenByText1(e.target.value);
                    }}
                  />
                ) : writtenBy === "CTO" ? (
                  <textarea
                    className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.writtenByText,
                      fieldEmpty,
                      printClicked
                    )}`}
                    rows={3}
                    value={writtenByText2}
                    onChange={(e) => {
                      setwrittenByText2(e.target.value);
                    }}
                  />
                ) : writtenBy === "PM" ? (
                  <textarea
                    className={`w-[100%] md:w-[100%] min-h-[45px] rounded-[10px] px-3 py-2 border-2 text-[12px] md:text-[14px] xl:text-[18px]  ${redBorder(
                      data.writtenByText,
                      fieldEmpty,
                      printClicked
                    )}`}
                    rows={3}
                    value={writtenByText3}
                    onChange={(e) => {
                      setwrittenByText3(e.target.value);
                    }}
                  />
                ) : null}
              </div>
            </div>
            <div className="w-full h-fit md:h-[100px] flex justify-end items-start px-5 md:px-20 pb-7 md:pb-10 gap-[25px]">
              <button
                className={`text-center px-[20px] py-[7px] text-[12px] md:text-[14px] xl:text-[18px] font-[600] bg-[#27416b] text-white rounded-[10px] hover:opacity-[0.8]`}
                onClick={() =>
                  hasEmptyFieldContract(
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
          <RecentRecordContract
            letterType={"Contract"}
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
            onClick={() => {
              let a = false;
              window.scrollTo({
                top: 0,
                behavior: "instant",
              });
              a = true;
              if (a === true) {
                window.print();
              }
            }}
            title="Make Print"
          >
            <FaPrint className="w-[60%] h-[60%] text-[#27416b]" />
          </button>
          <div className="w-full h-full overflow-auto">
            <ContractPrint />
          </div>
        </div>
      )}
    </>
  );
};

export default Contract;
