"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatUperFirst,
} from "@/app/functions/formats";
import { useEffect } from "react";

const ExperienceLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.ExperienceLetter);

  useEffect(() => {
    const title = `Experience Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);

  return (
    <div className="mx-auto w-fit h-fit flex justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
      <div className="w-[215.9mm] h-[279.4mm] bg-image">
        <div className="w-[100%] h-[100%] absolute top-[0%] z-[50] flex justify-center items-center bg-red-30">
          <div className="w-[80%] h-[90%] absolute top-[220px] flex flex-col justify-start items-start bg-blue-30">
            <div className="w-[100%] h-fit bg-purple-30 flex flex-col justify-between items-start pb-2">
              <div className="flex flex-col justify-betwenn items-start pt-[50px] pb-[15px] w-full ">
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-[16px] font-[400]">
                    {data.currentDate.replaceAll("-", "/")}
                  </h2>
                  <h2 className="text-[16px] font-[400]">Ref: {data.refNo}</h2>
                </div>
              </div>
              <p className="py-1"></p>
              <div className="w-full flex justify-center items-start">
                <h1 className="text-[19px] font-[700] underline">
                  TO WHOM IT MAY CONCERN
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-yellow-30 flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  <p className="pt-4"></p>
                  <p className="py-1"></p>
                  This is to certify that {" "}
                  {data.gender === "Male" ? "Mr." : "Ms."}{" "}
                  {formatUperFirst(data.name)} worked as a{" "}
                  {formatUperFirst(data.designation)} with Devonicx from{" "}
                  {formatDate(data.startingDate)} to{" "}
                  {formatDate(data.endingDate)}.<p className="py-1"></p>
                  <p className="py-1"></p>
                  During {data.gender === "Male" ? "his" : "her"} employment, we
                  have found {data.gender === "Male" ? "him" : "her"} an honest,
                  sincere, hardworking and dedicated candidate with a
                  professional attitude and very good technical aptitude.
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  We wish {data.gender === "Male" ? "him" : "her"} all the best
                  for {data.gender === "Male" ? "his" : "her"} future endeavors!
                  <br />
                  Regards,
                  <p className="pt-24"></p>
                  <p className="pt-6"></p>
                  <b>Rehan Arshad</b>
                  <br />
                  Chief Executive Officer
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

export default ExperienceLetterPrint;
