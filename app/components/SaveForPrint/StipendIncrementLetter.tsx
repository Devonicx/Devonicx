"use client";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatUperFirst,
  formatUpperCase,
  numberToWords,
} from "@/app/functions/formats";
import { useEffect } from "react";

const StipendIncrementLetterPrint: React.FC = () => {
  let data = useSelector((state: RootState) => state.StipendIncrementLetter);
  useEffect(() => {
    const title = `Stipend Increment Letter - ${data.name}`;
    document.title = title;
  }, [data.name]);
// console.log(numberToWords(Number(data.newStipend.replaceAll(",", ""))));
// console.log(Number(data.newStipend.replaceAll(",", "")));

  return (
    <div className="mx-auto w-fit h-fit  flex justify-center items-center relative overflow-hidden showOnPrintOnly leading-[23px] text-justify shadow-2xl zooming">
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
                  STIPEND INCREMENT LETTER
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-between items-start py-1">
              <div className="w-full flex justify-center items-start">
                <div className="text-[16px] font-[400] leading-[23px]">
                  <b>
                    Dear {data.gender === "Male" ? "Mr." : "Ms."}{" "}
                    {formatUperFirst(data.name)},
                  </b>
                  <p className="py-1"></p>
                  Based on your responsibilities and learning, Management is
                  pleased to increase your monthly stipend effective from{" "}
                  {formatDate(data.effectiveDate)} to onward.
                  <p className="py-1"></p>
                  Your new monthly stipend will be{" "}
                  <b>
                    Rs. {data.newStipend}/- (
                    {Number(data.newStipend.replaceAll(",", "")) !== 10000
                      ? numberToWords(
                          Number(data.newStipend.replaceAll(",", ""))
                        )
                      : "Ten Thousand"}{" "}
                    Rupees Only).
                  </b>
                  <p className="py-1"></p>
                  Devonicx always appreciate their employees on hard
                  work. We believe that this increment in your stipend motivates
                  you to fulfill your responsibilities in appropriate way.
                  {data.addLine ? (
                    <>
                      <p className="py-1"></p>
                      The increment can be lift off if we feel your
                      responsibilities are compromised in future.
                    </>
                  ) : null}
                  <p className="py-1"></p>
                  <p className="py-1"></p>
                  Regards,
                  <br />
                  Human Resource
                  <br />
                  Devonicx{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StipendIncrementLetterPrint;
