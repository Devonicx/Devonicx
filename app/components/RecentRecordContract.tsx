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
import Deleter from "./Deleter";
import { setLastRefNoR } from "../store/ExperienceLetter";
interface propType {
  letterType: String;
  regenerate: any;
  setShowPrint: any;
}

const RecentRecordContract: React.FC<propType> = ({
  letterType,
  regenerate,
  setShowPrint,
}) => {
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchText, setSearchText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  let global = useSelector((state: RootState) => state.Global);
  let [multiplier, setMultiplier] = useState(0);
  let [userData, setUserData] = useState();
  let [inFormId, setInFormId] = useState<number>();
  let [limit, setLimit] = useState<number>(10);
  let [forIndividual, setForIndividual] = useState<boolean>(true);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setRecentLoading(true);
        let response = await axios.get(`/api/recentRecord/${letterType}`);
        if (response) {
          var parseData = response.data.result;
          parseData?.forEach((element: any) => {
            element.data = JSON.parse(element.data);
          });
          parseData.reverse();
          if (!global.admin) {
            setData(
              parseData?.filter(
                (item: any) =>
                  item?.time.includes(global.username) &&
                  item?.data.forIndividual === forIndividual
              )
            );
            setTableData(
              parseData?.filter(
                (item: any) =>
                  item?.time.includes(global.username) &&
                  item?.data.forIndividual === forIndividual
              )
            );
          } else {
            // setData(parseData);
            // setTableData(parseData);
            setData(
              parseData?.filter(
                (obj: any) => obj.data.forIndividual === forIndividual
              )
            );
            setTableData(
              parseData?.filter(
                (obj: any) => obj.data.forIndividual === forIndividual
              )
            );
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setRecentLoading(false);
        setSearchText("");
      }
    }
    getData();
  }, [global.recentReloader, forIndividual]);
  console.log(tableData);

  function search(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item.data?.name?.toLowerCase().includes(e.toLowerCase()) ||
          item.data?.currentDate?.includes(e)
      );
      setTableData(tempData);
      setMultiplier(0);
    } else {
      setTableData(data);
    }
  }
  useEffect(() => {
    async function getUserData() {
      try {
        let { data } = await axios.get("/api/userData");
        setUserData(data.admin);
      } catch (er) {
        console.log(er);
      } finally {
      }
    }
    getUserData();
  }, []);

  return (
    <div className="w-[100%] h-fit hideOnPrint bg-red-20 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden">
        <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-between text-main-blue">
          <span>Recent Records</span>
          <span>Total: {tableData?.length}</span>
        </h2>
        <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 bg-pink-90">
          <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center">
            <input
              placeholder="Search by name and date"
              className="w-full h-full rounded-[10px] px-5 border-2 focus:outline-none border-color absolute left-0 z-0 text-[12px] md:text-[16px] hover:border-black"
              onChange={(e) => {
                search(e.target.value.trim()), setSearchText(e.target.value);
              }}
              value={searchText}
            />
            <div className="z-[50]">
              <FaSearch className="w-[20px] h-[20px]" />
            </div>
          </div>
          <div className="bg-red-20 w-[100%] md:w-[40%] h-[45px rounded-[10px] bg-blue-30 relative flex flex-col justify-between items-between overflow-hidden   pt-3 md:pt-0 xl:pt-0">
            <div className="w-[100%]  h-[45px] rounded-[10px] bg-blue-30 relative flex justify-between items-center overflow-hidden">
              <button
                className={`text-[12px] md:text-[14px] xl:text-[16px] font-[700] h-full py-1 md:py-2 xl:py-2 px-3 md:px-2 xl:px-3 text-center w-[50%] z-[10]  ${
                  !forIndividual
                    ? "text-black bg-[rgb(254,213,0)]"
                    : "text-white bg-main-blue"
                }`}
                onClick={() => {
                  setForIndividual(true);
                }}
              >
                For Individuals
              </button>
              <button
                className={`text-[12px] md:text-[14px] xl:text-[16px] font-[700] h-full py-1 md:py-2 xl:py-2 px-3 md:px-2 xl:px-3 text-center w-[50%] z-[10] ${
                  forIndividual
                    ? "text-black bg-[rgb(254,213,0)]"
                    : "text-white bg-main-blue"
                }`}
                onClick={() => {
                  setForIndividual(false);
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
                  <div className="w-[15px] md:w-[20px] xl:w-[30px] h-[15px] md:h-[20px] xl:h-[30px]  bg-main-blue rotate-45 relative top-[-10px] md:top-[-15px] xl:top-[-20px]"></div>
                </div>
              ) : (
                <div className="w-[50%]  float-left text-[13px] md:text-[16px] xl:text-[20px] font-[700]   px-3 md:px-2 xl:px-3  text-center flex justify-center items-center z-[0]">
                  <div className="w-[15px] md:w-[20px] xl:w-[30px] h-[15px] md:h-[20px] xl:h-[30px]  bg-main-blue rotate-45 relative top-[-10px] md:top-[-15px] xl:top-[-20px]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-yellow-20 pb-5 px-3 md:px-10 xl:px-20">
          <div className="h-fit bg-pink-60 flex flex-col justify-between overflow-auto">
            <table className="h-fit table-border mx-auto w-[900px] md:w-[1100px] xl:w-full relative">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                    No.
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[30%]">
                    Name
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Issue Date
                  </th>
                  {global.admin ? (
                    <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[15%]">
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
                          className={`bg-[rgb(240,240,240)] w-full tr-border`}
                        >
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[5%]">
                            {key + 1}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[30%]">
                            {item.data.name}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[20%]">
                            {item.data.currentDate} {item?.time.split("by:")[0]}
                          </td>
                          {global.admin ? (
                            <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[15%]">
                              {item?.time.split("by:")[1]}
                            </td>
                          ) : null}
                          <td className="text-center  text-[12px] md:text-[16px] px-0 h-full w-[30%]">
                            <div className="flex justify-evenly items-center h-full">
                              {userData ? <Deleter id={item.id} /> : null}
                              <button
                                className={`${
                                  inFormId === item.id
                                    ? "regenerate-effect"
                                    : ""
                                } text-main-blue underline hover:no-underline border-e-2 border-color h-full w-full px-5 `}
                                onClick={() => {
                                  regenerate(item.data);
                                  setInFormId(item.id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                Regenerate
                              </button>
                              <button
                                className={`text-main-blue underline hover:no-underline h-full w-full px-`}
                                onClick={() => {
                                  regenerate(item.data);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  setShowPrint(true);
                                }}
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
                <div className="w-full flex justify-center items-center absolute py-8 text-[20px] font-[600]">
                  No Data Found
                </div>
              )}
            </table>
          </div>

          {tableData ? (
            <div className="w-full h-[50px] bg-red-40 flex flex-row-reverse justify-between items-center relative">
              <div className="ms-5 flex gap-2 items-center text-[10px] md:text-[16px]">
                <button
                  className={`text-[16px] md:text-[25px]  ${
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
                  className={`text-[16px] md:text-[25px]  ${
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
                  className={`text-[16px] md:text-[25px]  ${
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
                  className={`text-[16px] md:text-[25px]  ${
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

export default RecentRecordContract;
