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

const AttendanceRecord = () => {
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchByNameText, setSearchByNameText] = useState<any>();
  let [searchByDateText, setSearchByDateText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  let global = useSelector((state: RootState) => state.Global);
  let [multiplier, setMultiplier] = useState(0);
  let [userData, setUserData] = useState();
  let [limit, setLimit] = useState<number>(10);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setRecentLoading(true);
        let response = await axios.get(`/api/attendanceRecord`);
        if (response) {
          var parseData = response.data.result;
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
        setSearchByNameText("");
      }
    }
    getData();
  }, [global.recentReloader]);

  function searchByName(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item?.name?.toLowerCase().includes(e.toLowerCase())
      );
      setTableData(tempData);
      setMultiplier(0);
    } else {
      setTableData(data);
    }
  }

  function searchByDate(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item?.date?.toLowerCase().includes(e.toLowerCase())
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

  console.log(tableData);

  return (
    <div className="w-[100%] h-fit hideOnPrint flex justify-center items-center mt-[50px]">
      <div className="flex flex-col bg-[rgb(250,250,250)] justify-center items-center w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden">
        <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-between text-main-blue">
          <span>Attendance Records</span>
        </h2>
        <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 bg-pink-90">
          <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center">
            <input
              placeholder="Search by name"
              className="w-full h-full rounded-l-[10px] px-5 border-r border-2 focus:outline-none border-color absolute left-0 z-0 text-[12px] md:text-[16px] hover:border-black"
              onChange={(e) => {
                searchByName(e.target.value.trim()),
                  setSearchByNameText(e.target.value);
              }}
              value={searchByNameText}
            />
            <div className="z-[50]">
              {/* <FaSearch className="w-[20px] h-[20px]" /> */}
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center">
            <input
              placeholder="Search by date"
              className="w-full h-full rounded-r-[10px] px-5 border-l border-2 focus:outline-none border-color absolute left-0 z-0 text-[12px] md:text-[16px] hover:border-black"
              onChange={(e) => {
                searchByDate(e.target.value.trim()),
                  setSearchByDateText(e.target.value);
              }}
              value={searchByDateText}
            />
            <div className="z-[50]">
              {/* <FaSearch className="w-[20px] h-[20px]" /> */}
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
                    Employee Name
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Check In Time
                  </th>
                  <th className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Check Out Time
                  </th>
                  <th className="last-th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Date
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
                            {item.name}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[20%]">
                            {item.checkInTime}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[20%]">
                            {item.checkOutTime}
                          </td>
                          <td className="last-th-border text-center  text-[12px] md:text-[16px] px-0 h-full w-[20%]">
                            {item.date}
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
            <div className="w-full h-[50px] flex flex-row-reverse justify-between items-center relative">
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

export default AttendanceRecord;
