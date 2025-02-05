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
import { setLastRefNoR } from "../store/ExperienceLetter";
import { setLastEmployeeIdR } from "../store/SocialMediaConsent";
import BusinessDeleter from "./BusinessDeleter";

interface propType {
  letterType: String;
  setShowForm: any;
  showForm: boolean;
  setId:any;
}

const BusinessRecords: React.FC<propType> = ({
  letterType,
  setShowForm,
  showForm,
  setId,
}) => {
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchText, setSearchText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  const [updateAllValues, setUpdateAllValues] = useState<any>(null);
  let global = useSelector((state: RootState) => state.Global);
  const formData = useSelector((state: RootState) => state[letterType]);
  let [multiplier, setMultiplier] = useState(0);
  let [limit, setLimit] = useState<number>(10);
  let dispatch = useDispatch();

  useEffect(() => {
    const loadActions = async () => {
      const { updateAllValues } = await import(`@/app/store/${letterType}`);
      setUpdateAllValues(() => updateAllValues);
    };

    loadActions();
    async function getData() {
      try {
        setRecentLoading(true);
        let response = await axios.get(`/api/businessRecords/${letterType}`);
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
    getData();
  }, [global.recentReloader]);

  function search(e: any) {
    if (e !== "") {
      let tempData = data.filter(
        (item: any) =>
          item.data?.companyName?.toLowerCase().includes(e.toLowerCase()) ||
          item.data?.agentName?.toLowerCase().includes(e.toLowerCase()) ||
          item.createdBy?.toLowerCase().includes(e.toLowerCase())
      );
      setTableData(tempData);
      setMultiplier(0);
    } else {
      setTableData(data);
    }
  }

  useEffect(() => {
    if (tableData) {
      dispatch(setLastRefNoR(tableData[0]?.data.refNo));
      dispatch(setLastEmployeeIdR(tableData[0]?.data.employeeId));
    }
  }, [tableData]);

  return (
    <div className="py-[50px] w-[100%] h-fit hideOnPrint flex justify-center items-center">
      <div className="flex flex-col bg-[rgb(250,250,250)] justify-center items-center w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden">
        <h2 className="w-full h-[70px] border-b-[1px] border-color text-[16px] md:text-[25px] font-[600] px-3 md:px-10 xl:px-20 flex items-center justify-between text-main-blue">
          <span>{letterType} Details Records</span>
          <span>Total: {tableData?.length}</span>
        </h2>
        <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20 bg-pink-90">
          <div className="w-[100%] md:w-[50%] h-[45px] rounded-[10px] px-5 bg-blue-30 relative flex justify-end items-center">
            <input
              placeholder="Search by company, agent or closure"
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
        </div>
        <div className="w-full h-fit bg-yellow-20 pb-5 px-3 md:px-10 xl:px-20">
          <div className="h-fit bg-pink-60 flex flex-col justify-between overflow-auto">
            <table className="h-fit table-border mx-auto w-[1500px] md:w-[2000px] relative">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[1.5%]">
                    No.
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[8%]">
                    agent Name
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[8%]">
                    company Name
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[7%]">
                    card Number
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[7%]">
                    name On Card
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[8%]">
                    billing Address
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                    expiration Date
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[3%]">
                    cvv
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[6%]">
                    closure Name
                  </th>
                  <th className="th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[5%]">
                    created at
                  </th>
                  <th className="last-th-border text-center capitalize text-[12px] md:text-[16px] py-1 md:py-2 w-[6%]">
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
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[1.5%]">
                            {key + 1}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[8%]">
                            {item.data.agentName}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[8%]">
                            {item.data.companyName}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[7%]">
                            {item.data.cardNumber}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[7%]">
                            {item.data.nameOnCard}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[8%]">
                            {item.data.billingAddress}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[5%]">
                            {item.data.expirationDate}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[3%]">
                            {item.data.cvv}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[6%]">
                            {item?.createdBy}
                          </td>
                          <td className="td-border text-center py-1 md:py-[14px] text-[12px] md:text-[16px] w-[5%]">
                            {item?.time}
                          </td>
                          <td className="text-center  text-[12px] md:text-[16px] px-0 h-full w-[6%]">
                            <div className="flex justify-evenly items-center h-full">
                              <BusinessDeleter id={item.id} />{" "}
                              <button
                                className={` text-main-blue underline hover:no-underline border-e-2 border-color h-full px-3 w-[50%] text-center `}
                                onClick={() => {
                                  setShowForm(true);
                                  setId(item.id);
                                  dispatch(updateAllValues(item.data));
                                }}
                              >
                                Edit
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

export default BusinessRecords;
