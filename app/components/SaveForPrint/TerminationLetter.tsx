"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatUperFirst,
  formatUpperCase,
} from "@/app/functions/formats";
import { useEffect } from "react";

const TerminationLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.TerminationLetter);
  useEffect(() => {
    const title = `Termination Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center">
          <div className="w-[80%] h-[90%] absolute top-[160px] flex flex-col justify-start items-start">
            <div className="w-[100%] h-fit flex flex-col justify-between items-start pb-2">
              <div className="w-full flex justify-end items-start">
                <span className="text-[15px] font-[500] text-slate-600">
                  Page <b>1</b> of <b>1</b>
                </span>
              </div>
              <div className="flex flex-col justify-betwenn items-start py-3">
                <h2 className="text-[16px] font-[400]">
                  {data.currentDate.replaceAll("-", "/")}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  {formatUpperCase(data.name)}
                </h2>
                <h2 className="text-[16px] font-[400]">
                  {formatUpperCase(data.address)}
                </h2>
              </div>
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline">
                  TERMINATION NOTICE
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] w-full leading-[23px]">
                  <b>
                    Dear {data.gender === "Male" ? "Mr." : "Ms."}{" "}
                    {formatUperFirst(data.name)},
                  </b>
                  <p className="py-1"></p>
                  It is with regret that I must inform you that your employment
                  with Devonicx is being terminated as per section{" "}
                  {data.section} of Employee Handbook effective{" "}
                  {formatDate(data.startingDate)}. We appreciate your
                  contribution during your time with Devonicx, and we
                  wish you the best in your future endeavors!
                  <p className="py-1"></p>
                  {data.comments?.trim() !== "" ? (
                    <>
                      {data.comments?.trim()}
                      <p className="py-1"></p>
                    </>
                  ) : null}
                  You are requested to come to office by{" "}
                  {formatDate(data.endingDate)} for your clearance and bring any
                  assets, project materials, etc that you have.
                  <p className="py-1"></p>
                  Warm Regards,
                  <br />
                  Human Resource
                  <br />
                  Devonicx
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminationLetterPrint;
