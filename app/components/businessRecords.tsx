"use client";
import axios from "axios";
import { useEffect, useState, type ComponentType } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface propType {
  letterType: String;
  setShowForm: any;
  showForm: boolean;
  setId: any;
}

const BusinessRecords: React.FC<propType> = ({
  letterType,
  setShowForm,
  setId,
}) => {
  let [data, setData] = useState<any>();
  let [tableData, setTableData] = useState<any>();
  let [searchText, setSearchText] = useState<any>();
  let [recentLoading, setRecentLoading] = useState<boolean>(true);
  let global = useSelector((state: RootState) => state.Global);
  let [multiplier, setMultiplier] = useState(0);
  const [TableView, setTableView] = useState<any>(null);

  useEffect(() => {
    const loadActions = async () => {
      const TableView = await import(
        `@/app/components/BusinessTables/${letterType}`
      );
      setTableView(() => TableView.default);
    };
    loadActions();
  }, []);

  useEffect(() => {
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
        {TableView ? (
          <TableView
            tableData={tableData}
            recentLoading={recentLoading}
            multiplier={multiplier}
            letterType={letterType}
            setShowForm={setShowForm}
            setId={setId}
            setMultiplier={setMultiplier}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BusinessRecords;
