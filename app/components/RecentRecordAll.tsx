"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import Deleter from "./Deleter";
import {
  setInternData,
  setPrintShowR as setInternsetPrintShowR,
} from "../store/OfferLetterIntern";
import {
  setProbData,
  setPrintShowR as setProbsetPrintShowR,
} from "../store/OfferLetterProbation";
import {
  setAppointData,
  setPrintShowR as setAppointsetPrintShowR,
} from "../store/AppointmentLetter";
import {
  setNdaData,
  setPrintShowR as setndasetPrintShowR,
} from "../store/NonDisclosureAgreement";
import {
  setSocialData,
  setPrintShowR as setSocialsetPrintShowR,
} from "../store/SocialMediaConsent";
import {
  setSalaryData,
  setPrintShowR as setSalarysetPrintShowR,
} from "../store/SalaryIncrementLetter";
import {
  setStipendData,
  setPrintShowR as setStipendsetPrintShowR,
} from "../store/StipendIncrementLetter";
import {
  setExperienceData,
  setPrintShowR as setExpsetPrintShowR,
} from "../store/ExperienceLetter";
import {
  setTerminationData,
  setPrintShowR as setTermisetPrintShowR,
} from "../store/TerminationLetter";
import {
  setClearanceData,
  setPrintShowR as setClearsetPrintShowR,
} from "../store/ClearanceLetter";
import {
  setSalarySlipData,
  setPrintShowR as setSalarySlipsetPrintShowR,
} from "../store/SalarySlip";
import {
  setContractData,
  setPrintShowR as setContractsetPrintShowR,
} from "../store/Contract";
import { setParentAdminR } from "../store/Global";
import {
  setInternshipExtensionData,
  setPrintShowR as setInternshipExtensionPrintShowR,
} from "../store/InternshipExtensionLetter";
import {
  setProbationExtensionData,
  setPrintShowR as setProbationExtensionPrintShowR,
 } from "../store/ProbationExtensionLetter";

interface propType {
  letterType: String;
}

const RecentRecordAll: React.FC<propType> = ({ letterType }) => {
  let dispatch = useDispatch();
  let router = useRouter();
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchText, setSearchText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  let [regenerateLoading, setRegenerateLoading] = useState<any>(null);
  let [makingPdfLoading, setMakingPdfLoading] = useState<any>(null);
  let global = useSelector((state: RootState) => state.Global);
  let [multiplier, setMultiplier] = useState(0);
  let [limit, setLimit] = useState<number>(10);
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setRecentLoading(true);
        let response = await axios.get(
          `/api/recentRecordAll/${JSON.stringify(global.forms)}`
        );
        if (response) {
          var parseData = response.data.result;
          parseData?.forEach((element: any) => {
            element.data = JSON.parse(element.data);
          });
          parseData.reverse();
          if (!global.admin) {
            setData(
              parseData?.filter((item: any) =>
                item?.time.includes(global.username)
              )
            );
            setTableData(
              parseData?.filter((item: any) =>
                item?.time.includes(global.username)
              )
            );
          } else {
            setData(parseData);
            setTableData(parseData);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setRecentLoading(false);
        setSearchText("");
      }
    }
    if (global.forms?.length > 0) {
      getData();
    }
  }, [global.recentReloader, global.forms]);
  // console.log(tableData?.filter((item: any) => item?.time.includes(global.username)));

  function search(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item.data?.name?.toLowerCase().includes(e.toLowerCase()) ||
          item.type?.toLowerCase().includes(e.toLowerCase()) ||
          item.data?.currentDate?.includes(e)
      );
      setTableData(tempData);
      setMultiplier(0);
    } else {
      setTableData(data);
    }
  }

  function regeneratePush(path: string, dataObject: any) {
    if (path === "Internship-Extension-Letter") {
      dispatch(setInternshipExtensionData(dataObject));
    } else if (path === "Probation-Extension-Letter") {
      dispatch(setProbationExtensionData(dataObject));
    } else if (path === "Offer-Letter-Intern") {
      dispatch(setInternData(dataObject));
    } else if (path === "Offer-Letter-Probation") {
      dispatch(setProbData(dataObject));
    } else if (path === "Appointment-Letter") {
      dispatch(setAppointData(dataObject));
    } else if (path === "Non-Disclosure-Agreement") {
      dispatch(setNdaData(dataObject));
    } else if (path === "Social-Media-Consent") {
      dispatch(setSocialData(dataObject));
    } else if (path === "Salary-Increment-Letter") {
      dispatch(setSalaryData(dataObject));
    } else if (path === "Stipend-Increment-Letter") {
      dispatch(setStipendData(dataObject));
    } else if (path === "Experience-Letter") {
      dispatch(setExperienceData(dataObject));
    } else if (path === "Termination-Letter") {
      dispatch(setTerminationData(dataObject));
    } else if (path === "Clearance-Letter") {
      dispatch(setClearanceData(dataObject));
    } else if (path === "Salary-Slip") {
      dispatch(setSalarySlipData(dataObject));
    } else if (path === "Contract") {
      dispatch(setContractData(dataObject));
    }
    router.push(`/forms/${path}`);
  }

  function makePrintTrue(path: string) {
    if (path === "Offer-Letter-Intern") {
      dispatch(setInternsetPrintShowR(true));
    } else if (path === "Internship-Extension-Letter") {
      dispatch(setInternshipExtensionPrintShowR(true));
    } else if (path === "Probation-Extension-Letter") {
      dispatch(setProbationExtensionPrintShowR(true));
    } else if (path === "Offer-Letter-Probation") {
      dispatch(setProbsetPrintShowR(true));
    } else if (path === "Appointment-Letter") {
      dispatch(setAppointsetPrintShowR(true));
    } else if (path === "Non-Disclosure-Agreement") {
      dispatch(setndasetPrintShowR(true));
    } else if (path === "Social-Media-Consent") {
      dispatch(setSocialsetPrintShowR(true));
    } else if (path === "Salary-Increment-Letter") {
      dispatch(setSalarysetPrintShowR(true));
    } else if (path === "Stipend-Increment-Letter") {
      dispatch(setStipendsetPrintShowR(true));
    } else if (path === "Experience-Letter") {
      dispatch(setExpsetPrintShowR(true));
    } else if (path === "Termination-Letter") {
      dispatch(setTermisetPrintShowR(true));
    } else if (path === "Clearance-Letter") {
      dispatch(setClearsetPrintShowR(true));
    } else if (path === "Salary-Slip") {
      dispatch(setSalarySlipsetPrintShowR(true));
    } else if (path === "Contract") {
      dispatch(setContractsetPrintShowR(true));
    }
  }

  useEffect(() => {
    async function getUserData() {
      try {
        let { data } = await axios.get("/api/userData");
        setUserData(data.admin);
        dispatch(setParentAdminR(data.admin));
      } catch (er) {
        console.log(er);
      } finally {
      }
    }
    getUserData();
  }, []);

  return (
    <div className="w-[100%] h-fit hideOnPrint bg-red-20 flex justify-center items-center">
      <div className="flex flex-col bg-[rgb(250,250,250)] justify-center items-center w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden gap-3 md:gap-10 pb-5 md:pb-10">
        <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-between text-main-blue">
          <span>{global.admin ? "All Records" : "Recent Records"}</span>
          <span>Total: {tableData?.length}</span>
        </h2>
        <div className="w-full h-fit flex justify-between flex-wrap items-start py-3 md:py-8 px-3 md:px-10 xl:px-20 bg-pink-90">
          <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center text-[12px] md:text-[16px]">
            <input
              placeholder="Search by name, type and date"
              className="w-full h-full rounded-[10px] px-5 border-2 focus:outline-none border-color absolute left-0 z-0 hover:border-black"
              onChange={(e) => {
                search(e.target.value.trim()), setSearchText(e.target.value);
              }}
              value={searchText}
            />
            <div className="z-[50]">
              <FaSearch className="w-[20px] h-[20px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-fit pb-5 px-3 md:px-10 xl:px-20">
          <div className="h-fit flex flex-col justify-between overflow-auto">
            <table className="h-fit table-border mx-auto w-[900px] md:w-[1100px] xl:w-full relative">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                    No.
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[15%]">
                    Name
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Letter Type
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Issue Date
                  </th>
                  {global.admin ? (
                    <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[10%]">
                      Created By
                    </th>
                  ) : null}
                  <th className="last-th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[30%]">
                    Action
                  </th>
                </tr>
              </thead>

              {recentLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center relative left-[38vw] translate-x-[-50%">
                  <Loader />
                </div>
              ) : tableData?.length > 0 ? (
                tableData.map((item: any, key: number) => (
                  <tbody className="w-full">
                    {key >= multiplier * limit &&
                    key < limit * (multiplier + 1) &&
                    tableData[key] ? (
                      <>
                        <tr
                          key={key}
                          className="tr-border w-full bg-[rgb(240,240,240)]"
                        >
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[5%] ">
                            {key + 1}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[15%] ">
                            {item.data.name}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[20%] ">
                            {item.type?.replaceAll("-", " ")}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[20%] ">
                            {item.data.currentDate} {item?.time.split("by:")[0]}
                          </td>
                          {global.admin ? (
                            <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[10%] ">
                              {item?.time.split("by:")[1]}
                            </td>
                          ) : null}
                          <td className="text-center text-[12px] md:text-[16px] px-0 h-full w-[30%]">
                            <div className="flex justify-evenly items-center h-full">
                              {userData ? <Deleter id={item.id} /> : null}
                              <button
                                onClick={() => {
                                  regeneratePush(item.type, item.data),
                                    setRegenerateLoading(item.id);
                                }}
                                className={`${
                                  regenerateLoading === item.id
                                    ? "text-gray-500"
                                    : "text-main-blue"
                                } leading-3 underline hover:no-underline border-e-2 border-color h-full w-full px-5 text-center`}
                                disabled={
                                  regenerateLoading === item.id ? true : false
                                }
                              >
                                {/* {regenerateLoading === item.id
                                  ? "Regenerating..."
                                  : "Regenerate"} */}
                                Regenerate
                              </button>

                              <button
                                onClick={() => {
                                  regeneratePush(item.type, item.data),
                                    setMakingPdfLoading(item.id),
                                    makePrintTrue(item.type);
                                }}
                                className={`${
                                  makingPdfLoading === item.id
                                    ? "text-gray-500"
                                    : "text-main-blue"
                                } leading-3 underline hover:no-underline h-full w-full px-`}
                                disabled={
                                  makingPdfLoading === item.id ? true : false
                                }
                              >
                                Make PDF
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    ) : null}
                  </tbody>
                ))
              ) : (
                <div className="w-full flex justify-center items-center absolute py-1 text-[14px] md:text-[20px] font-[600]">
                  No Data Found
                </div>
              )}
            </table>
          </div>

          {tableData ? (
            <div className="w-full h-[50px] flex flex-row-reverse justify-between items-center relative">
              <div className="ms-10 md:ms-5 flex gap-2 items-center text-[10px] md:text-[16px] ">
                <button
                  className={`text-[16px] md:text-[25px] ${
                    multiplier <= 0 ? "text-gray-400" : "text-main-blue"
                  }`}
                  onClick={() => {
                    setMultiplier(0);
                  }}
                  disabled={multiplier <= 0 ? true : false}
                >
                  <FaAngleDoubleLeft />
                </button>

                <button
                  className={`text-[16px] md:text-[25px] ${
                    multiplier <= 0 ? "text-gray-400" : "text-main-blue"
                  }`}
                  onClick={() => {
                    setMultiplier(multiplier - 1);
                  }}
                  disabled={multiplier <= 0 ? true : false}
                >
                  <FaAngleLeft />
                </button>

                <div className="flex-between gap-2">
                  <span>
                    {multiplier * limit + 1 <= 9 ? "0" : null}
                    <span>
                      {tableData.length > 0 ? multiplier * limit + 1 : 0}
                    </span>
                    -
                    <span>
                      {multiplier * limit + limit <= 9 ? "0" : null}
                      {multiplier * limit + limit >= tableData.length
                        ? tableData.length
                        : multiplier * limit + limit}
                    </span>
                  </span>
                  <span> of </span>
                  <span>
                    {tableData.length <= 9
                      ? "0" + tableData.length
                      : tableData.length}
                  </span>
                </div>

                <button
                  className={`text-[16px] md:text-[25px] ${
                    multiplier * limit + limit >= tableData.length
                      ? "text-gray-400"
                      : "text-main-blue"
                  }`}
                  onClick={() => {
                    setMultiplier(multiplier + 1);
                  }}
                  disabled={
                    multiplier * limit + limit >= tableData.length
                      ? true
                      : false
                  }
                >
                  <FaAngleRight />
                </button>
                <button
                  className={`text-[16px] md:text-[25px] ${
                    multiplier * limit + limit >= tableData.length
                      ? "text-gray-400"
                      : "text-main-blue"
                  }`}
                  onClick={() => {
                    setMultiplier(Math.ceil(tableData.length / limit - 1));
                  }}
                  disabled={
                    multiplier * limit + limit >= tableData.length
                      ? true
                      : false
                  }
                >
                  <FaAngleDoubleRight />
                </button>
              </div>

              <div className="flex gap-2 items-end">
                {limit !== 50 ? (
                  <button
                    onClick={(e) => {
                      setLimit(50);
                      setMultiplier(0);
                    }}
                    className="bg-main-blue px-4 py-1 text-white rounded-lg hover:opacity-[0.8] text-[10px] md:text-[16px]"
                  >
                    Show more
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setLimit(10);
                      setMultiplier(0);
                    }}
                    className="bg-main-blue px-4 py-1 text-white rounded-lg hover:opacity-[0.8] text-[10px] md:text-[16px]"
                  >
                    Show less
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecentRecordAll;
