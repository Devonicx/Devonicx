"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function CardDetail() {
  const { id, type } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getDetail() {
      const { data } = await axios.get(`/api/detail/${id}`);
      setData(JSON.parse(data.result));
    }
    getDetail();
  }, []);

  console.log(data);
  const nameArray =
    type === "Sale"
      ? [
          "company Name",
          "agent Name",
          "business Phone",
          "owner Name",
          "personal Phone",
          "business Email",
          "personal Email",
          "website Link",
          "yelp Link",
          "services Offered",
          "services",
          "areas",
          "keyword",
          "payment Method",
          "sales Amount",
          "notes",
        ]
      : [
          "company Name",
          "agent Name",
          "business Phone",
          "owner Name",
          "personal Phone",
          "business Email",
          "personal Email",
          "website Link",
          "yelp Link",
          "services Offered",
          "services",
          "areas",
          "keyword",
          "payment Method",
          "notes",
          "price Pitched",
          "scheduled Date",
          "scheduled Time",
        ];
  return (
    <div className="w-full h-fit flex flex-col justify-between items-start gap-[40px] py-[50px] hideOnPrint relative">
      <div className="flex flex-col bg-[rgb(250,250,250)] justify-between items-start w-[95%] 2xl:w-[87%] h-fit mx-auto rounded-[15px] border-[1px] border-color overflow-hidden ">
        <h2 className="w-full h-[70px] border-b-[1px] border-color  text-[16px] md:text-[20px] xl:text-[25px] font-[600] flex items-center justify-start text-main-blue px-3 md:px-10 xl:px-20">
          {type} Detail
        </h2>
        <div className="w-full h-fit flex justify-between flex-wrap items-start py-8 px-3 md:px-10 xl:px-20">
          {Object.entries(data).map(([key, value]: any, index) => (
            <div className="w-[100%] md:w-[45%]  h-[70px] flex justify-between  items-center">
              <span className="w-[30%] text-[12px] md:text-[14px] xl:text-[18px]  font-[600] flex items-start justify-start gap-[5px] capitalize">
                {nameArray[index]}
              </span>
              <div
                className={`w-[60%] text-[12px] md:text-[14px] xl:text-[18px]  h-[45px] rounded-[10px] px-3 border- flex justify-start items-center`}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CardDetail;
