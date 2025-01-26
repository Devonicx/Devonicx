import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import UserDeleter from "./UserDeleter";
import Loader from "./Loader";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";

export default function RecentRecordUsers() {
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchText, setSearchText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  let global = useSelector((state: RootState) => state.Global);
  let [multiplier, setMultiplier] = useState(0);
  let [userData, setUserData] = useState();
  let [inFormId, setInFormId] = useState<number>();
  let [limit, setLimit] = useState<number>(10);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setRecentLoading(true);
        let response = await axios.get(`/api/recentRecordUsers/alll`);
        if (response) {
          var parseData = response.data.result;
          parseData.reverse();
          setData(parseData);
          setTableData(parseData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setRecentLoading(false);
        setSearchText("");
      }
    }
    getData();
  }, [global.recentReloader]);
  function search(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item?.username?.toLowerCase().includes(e.toLowerCase()) ||
          JSON.stringify(item.forms)?.toLowerCase().includes(e.toLowerCase()) ||
          JSON.stringify(item.forms)
            ?.split("time:-")[1]
            ?.replaceAll(`"]`, "")
            .toLowerCase()
            .includes(e.toLowerCase())
      );
      setTableData(tempData);
      setMultiplier(0);
    } else {
      setTableData(data);
    }
  }

  return (
    <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
      <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-between text-main-blue">
        <span>All Users</span>
        <span>Total: {tableData?.length}</span>
      </h2>
      <div className="w-full h-fit flex justify-between flex-wrap items-start py-3 md:py-8 px-3 md:px-10 xl:px-20 bg-pink-90">
        <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center text-[12px] md:text-[16px]">
          <input
            placeholder="Search by name, forms and date"
            className="w-full h-full rounded-[10px] px-5 border-2 focus:outline-none border-color absolute left-0 z-0 hover:border-black"
            onChange={(e) => {
              search(e.target.value.trim()), setSearchText(e.target.value);
            }}
            value={searchText}
            type="text"
            autoComplete="new-password"
          />
          <div className="z-[50]">
            <FaSearch className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
      <div className="w-full h-fit pb-5 px-3 md:px-10 xl:px-20">
        <div className="w-full h-fit flex justify-between flex-col items-start  gap-x-[20%]  overflow-auto">
          {tableData ? (
            <table className="h-fit table-border mx-auto w-[900px] md:w-[1100px] xl:w-full relative bg-neutral-100">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="bg-white th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                    No.
                  </th>
                  <th className="bg-white th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[19%]">
                    Username
                  </th>
                  <th className="bg-white th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[19%]">
                    Password
                  </th>
                  <th className="bg-white th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[27%]">
                    Forms
                  </th>
                  <th className="bg-white th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[10%]">
                    Created At
                  </th>
                  <th className="bg-white last-th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[20%]">
                    Action
                  </th>
                </tr>
              </thead>

              {tableData?.length > 0
                ? tableData.map((item: any, key: number) => (
                    <tbody className="w-full">
                      {key >= multiplier * limit &&
                      key < limit * (multiplier + 1) &&
                      tableData[key] ? (
                        <>
                          <tr className="w-full">
                            <td className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                              {key + 1}
                            </td>
                            <td className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[19%]">
                              {item.username}
                            </td>
                            <td className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[19%]">
                              {item.password}
                            </td>
                            <td className="th-border text-center text-[12px] md:text-[16px] py-1 ps-[2%] md:py-2 w-[25%] bg-yellow-0">
                              {item.forms.map((item2: any, key: number) => (
                                <div
                                  key={key}
                                  className="text-start flex justify-start items-center w-[80%] bg-red-00 ms-[20px]"
                                >
                                  <ol className="list-disc list-inside mx-au text-start flex justify-start items-center bg-green-00">
                                    {!item2.includes("time:-") ? (
                                      <li>{item2?.replaceAll("-", " ")}</li>
                                    ) : null}
                                  </ol>
                                </div>
                              ))}
                            </td>
                            <td className="th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[15%]">
                              <div className="flex justify-evenly items-center h-full">
                                {item.forms.map((item2: any, key: number) => (
                                  <>
                                    {item2.includes("time:-") ? (
                                      <>{item2?.replaceAll("time:-", "")}</>
                                    ) : null}
                                  </>
                                ))}
                              </div>
                            </td>
                            <td className="last-th-border text-center text-[12px] md:text-[16px] py-1 md:py-2 w-[35%]">
                              <div className="flex justify-evenly items-center h-full">
                                <UserDeleter id={item.id} />
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : null}
                    </tbody>
                  ))
                : null}
            </table>
          ) : (
            <Loader />
          )}
        </div>

        {tableData ? (
          <div className="w-[100%] mx-auto h-[50px] flex flex-row-reverse justify-between items-center relative">
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
                  multiplier * limit + limit >= tableData.length ? true : false
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
                  multiplier * limit + limit >= tableData.length ? true : false
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
  );
}
