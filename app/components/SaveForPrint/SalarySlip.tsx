"use client";

import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatAmount,
  formatDate,
  formatDateToMonthYear,
  formatUperFirst,
  numberToWords,
} from "@/app/functions/formats";

const SalarySlipPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.SalarySlip);
  let [net, setNet] = useState("0");
  let [totalDeduction, setTotalDeduction] = useState("0");

  interface DeductionType {
    name: string;
    amount: string;
  }
  useEffect(() => {
    const title = `Salary Slip - ${data.name}`;
    document.title = title;
  }, [data.name]);

  useEffect(() => {
    let tempNet = 0;
    data.deduction.map((item: DeductionType) => {
      tempNet = tempNet + Number(item.amount.replaceAll(",", ""));
    });
    setTotalDeduction(formatAmount(tempNet.toString()));
    setNet(
      formatAmount(
        (Number(data.basicSalary.replaceAll(",", "")) - tempNet).toString()
      )
    );
  }, [data.deduction, data.basicSalary]);

  return (
    <div className="mx-auto w-fit h-fit flex flex-col justify-center items-center relative overflow-hidden showOnPrintOnl leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] h-fi bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[180px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start">
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline">
                  SALARY SLIP
                </h1>
              </div>
              <div className="flex flex-col item-start pt-5 pb-[15px] w-full gap-0 bg-red-40">
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-bold text-main-blu bg-blue-30">
                    Employee Details:
                  </h2>
                  <h2 className="text-[18px] font-bold text-main-blu bg-blue-30">
                    Issue Date:{" "}
                    <span className=" text-[16px] font-[500]">
                      {formatDate(data.currentDate)}
                    </span>
                  </h2>
                </div>
                <h2 className="text-[16px] font-[400]">
                  <span className="font-[600">Employee Name: </span>
                  {formatUperFirst(data.name)}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  <span className="font-[600">CNIC: </span>
                  {data.cnic}
                </h2>
                {/* <h2 className="text-[16px] font-[400]">
                  <span className="font-[600">Month: </span>
                  {formatDateToMonthYear(data.month)}
                </h2> */}
                <h2 className="text-[16px] font-[400]">
                  <span className="font-[600">Designation: </span>
                  {formatUperFirst(data.designation)}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-betwenn items-start mt-8 w-full text-[16px] font-[400] relative bg-red-80">
              <div className="w-full h-fit bg-gray-200 flex justify-start border-[0.5px] border-color py-1 text-[16px] font-bold relative">
                <div className="h-[100%] absolute left-[25%] bg-black top-0 border-e-2 border-color"></div>
                <div className="h-[100%] absolute left-[47%] bg-black top-0 border-e-2 border-color"></div>

                <h2 className="w-[25%] h-fit text-center px-2 text-whit"></h2>
                <h2 className="w-[22%] h-fit text-center px-2 text-whit">
                  Amount (PKR)
                </h2>
                <h2 className="w-[53%] h-fit text-center px-2 text-whit">
                  Amount In Words
                </h2>
              </div>{" "}
              <div className="w-full h-fit bg-gray-200 flex justify-start border-[0.5px] border-color py-1 relative">
                <h2 className="w-[25%] h-fit text-center px-2 text-whit text-[18px] font-bold">
                  Gross Salary
                </h2>
              </div>
              <div className="w-full h-fit flex justify-start border-[0.5px] border-color py-1 relative">
                <div className="h-[100%] absolute left-[25%] bg-black top-0 border-e-2 border-color"></div>
                <div className="h-[100%] absolute left-[47%] bg-black top-0 border-e-2 border-color"></div>

                <h2 className="w-[25%] h-fit text-center px-2">Salary</h2>
                <h2 className="w-[22%] h-fit text-center px-2">
                  {data.basicSalary}
                </h2>
                <h2 className="w-[53%] h-fit text-center px-2 pe-1 text-[12px]">
                  ({numberToWords(Number(data.basicSalary.replaceAll(",", "")))}{" "}
                  Rupees Only)
                </h2>
              </div>
              {data.deduction?.length < 1 ||
              !data.deduction[0]?.amount ? null : (
                <>
                  <div className="w-full h-fit bg-gray-200 flex justify-start border-[0.5px] border-color py-1 ">
                    <h2 className="w-[25%] h-fit text-center px-2 text-whit  text-[18px] font-bold">
                      Deductions
                    </h2>
                  </div>
                  {data.deduction.map((item: any) => (
                    <div className="w-full h-fit flex justify-start border-[0.5px] border-color py-1 relative">
                      <div className="h-[100%] absolute left-[25%] bg-black top-0 border-e-2 border-color"></div>
                      <div className="h-[100%] absolute left-[47%] bg-black top-0 border-e-2 border-color"></div>

                      <h2 className="w-[25%] h-fit text-center px-2">
                        {item.name}
                      </h2>
                      <h2 className="w-[22%] h-fit text-center px-2">
                        {item.amount}
                      </h2>
                      <h2 className="w-[53%] h-fit text-center px-2 pe-1 text-[12px]">
                        (
                        {numberToWords(Number(item.amount.replaceAll(",", "")))}{" "}
                        Rupees Only)
                      </h2>
                    </div>
                  ))}
                </>
              )}{" "}
              <div className="w-full h-fit flex justify-start border-[0.5px] border-color py-1  bg-[rgb(102,203,255)]* text-transparent">
                <h2 className="w-[25%] h-fit text-center px-2">
                  Total Net Salary
                </h2>
                <h2 className="w-[22%] h-fit text-center px-2">{net}</h2>
                <h2 className="w-[53%] h-fit text-center px-2 pe-1 text-[12px]">
                  {/* ({numberToWords(Number(net.replaceAll(",", "")))} Rupees Only) */}
                </h2>
              </div>
              <div className="w-full h-fit flex justify-start border-[0.5px] border-color py-1  bg-[rgb(102,203,255)]* bg-green-300 relative">
                <div className="h-[100%] absolute left-[25%] bg-black top-0 border-e-2 border-color"></div>
                <div className="h-[100%] absolute left-[47%] bg-black top-0 border-e-2 border-color"></div>
                <h2 className="w-[25%] h-fit text-center px-2  text-[18px] font-bold">
                  Net Salary
                </h2>
                <h2 className="w-[22%] h-fit text-center px-2">{net}</h2>
                <h2 className="w-[53%] h-fit text-center px-2 text-[12px]">
                  ({numberToWords(Number(net.replaceAll(",", "")))} Rupees Only)
                </h2>
              </div>
              {/* <div className="w-full h-fit flex justify-start border-[0.5px] border-color py-1  bg-[rgb(102,203,255)]* text-transparent">
                <h2 className="w-[25%] h-fit text-center px-2">
                  Total Net Salary
                </h2>
                <h2 className="w-[22%] h-fit text-center px-2">{net}</h2>
                <h2 className="w-[53%] h-fit text-center px-2 pe-1 text-[12px]"></h2>
              </div> */}
              <div className="w-full flex-co h-fit flex justify-start py-1 relative mt-5">
                <h2 className="w-[25% h-fit text-start px-  text-[15px] font-[700]">
                  Note:
                </h2>
                <h2 className="w-[75% h-fit text-start text-[15px] px-1">
                  This document is valid for the next ten days from the issued
                  date.
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-betwenn items-start py-24 mt- w-full text-[16px] font-[400] ">
              <h2 className="w-[50%] h-fit text-start ">
                Muhammad Rehan Arshad
              </h2>
              <h2 className="w-[50%] h-fit text-start ">
                Chief Executive Officer
              </h2>
              <h2 className="w-[50%] h-fit text-start ">Devonicx</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipPrint;
